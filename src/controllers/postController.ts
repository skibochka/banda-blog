import * as express from 'express';
import { Conflict, NotFound } from 'http-errors';
import { createQueryBuilder } from 'typeorm';
import postValidation from '../helpers/validation/postValidation';
import { ValidationError } from '../helpers/validation/ValidationError';
import { model } from '../helpers/db/repository';
import { Post } from '../models/Post';
import { Like } from '../models/Likes';
import { Comment } from '../models/Comment';
import { CommentLike } from '../models/CommentLike';

async function createPost(req: express.Request, res: express.Response) {
  const { error } = postValidation.checkPost(req.body);
  if (error) throw new ValidationError(error.details);

  const createdPost: Post = await model(Post).save({
    title: req.body.title,
    content: req.body.content,
    userID: req.body.userID,
  });

  return res.status(200).json(createdPost);
}

async function deletePost(req: express.Request, res: express.Response) {
  const { error } = postValidation.checkParams(req.body);
  if (error) throw new ValidationError(error.details);

  const post: Post = await model(Post).findOne({ id: req.body.postID });
  if (!post) throw new NotFound('Such post does not exist');

  if (post.userID !== req.body.userID || req.body.isAdmin) throw new Conflict('You can`t delete posts of other users');

  await model(Post).delete(post.id);

  return res.status(200).json({
    msg: 'Post successful deleted',
  });
}

async function updatePost(req: express.Request, res: express.Response) {
  const { error } = postValidation.updatePost(req.body);
  if (error) throw new ValidationError(error.details);

  const post: Post = await model(Post).findOne({ id: req.body.postID });
  if (!post) throw new NotFound('Such post does not exist');

  if (post.userID !== req.body.userID || req.body.isAdmin) throw new Conflict('You can`t update posts of other users');

  await model(Post).update(post.id, req.body.update);

  return res.status(200).json({
    msg: 'Successful updated',
  });
}

async function likePost(req: express.Request, res: express.Response) {
  const { error } = postValidation.checkParams(req.body);
  if (error) throw new ValidationError(error.details);

  if (await model(Like).findOne({
    postID: req.body.postID,
    userID: req.body.userID,
  })) throw new Conflict('You have already liked this post');

  await model(Like).save({
    postID: req.body.postID,
    userID: req.body.userID,
  });

  return res.status(200).json({
    msg: 'Successful liked',
  });
}

async function getPost(req: express.Request, res: express.Response) {
  const { error } = postValidation.checkID(req.query);
  if (error) throw new ValidationError(error.details);

  const post: Post = await model(Post).findOne(req.query.postID as string);
  if (!post) throw new NotFound('Such post does not exist');

  const likes: Like[] = await model(Like).find({ postID: Number.parseInt(req.query.postID as string, 10) });
  post.likes = likes.length;

  return res.status(200).json(post);
}

async function getComments(req: express.Request, res: express.Response) {
  const { error } = postValidation.checkID(req.query);
  if (error) throw new ValidationError(error.details);

  // const comments = await model(Comment).find({ postID: Number.parseInt(req.query.postID as string, 10) });
  const comments = await model(Comment).createQueryBuilder().where('comment.postID = :postID', {
    postID: +req.query.postID,
  })
    .loadRelationCountAndMap('comment.likes', 'comment.likes')
    .getOne();

  return res.status(200).send(comments);
}

async function getPosts(req: express.Request, res: express.Response) {
  const { error } = postValidation.getPosts(req.query);
  if (error) throw new ValidationError(error.details);

  const posts: Post[] = await model(Post).find({
    // @ts-ignore
    skip: req.query.skip * req.query.page,
    take: req.query.take,
  });
  if (!posts) throw new NotFound('Posts not found');

  return res.status(200).send(posts);
}

async function createComment(req: express.Request, res: express.Response) {
  const { error } = postValidation.checkComment(req.body);
  if (error) throw new ValidationError(error.details);

  const createdComment: Comment = await model(Comment)
    .save({
      content: req.body.content,
      postID: req.body.postID,
      userID: req.body.userID,
    });

  return res.status(200).json(createdComment);
}

async function deleteComment(req: express.Request, res: express.Response) {
  const { error } = postValidation.deleteComment(req.body);
  if (error) throw new ValidationError(error.details);

  const comment: Comment = await model(Comment).findOne({ id: req.body.commentID });
  if (!comment) throw new NotFound('Such comment does not exist');

  if (comment.userID !== req.body.userID || req.body.isAdmin) throw new Conflict('You can`t delete posts of other users');

  await model(Comment).delete(comment.id);

  return res.status(200).json({
    msg: 'Comment successful deleted',
  });
}

async function updateComment(req: express.Request, res: express.Response) {
  const { error } = postValidation.updateComment(req.body);
  if (error) throw new ValidationError(error.details);

  const comment: Comment = await model(Comment).findOne({ id: req.body.commentID });
  if (!comment) throw new NotFound('Such post does not exist');

  if (comment.userID !== req.body.userID || req.body.isAdmin) throw new Conflict('You can`t update comments of other users');

  await model(Comment).update(comment.id, req.body.update);

  return res.status(200).json({
    msg: 'Successful updated',
  });
}

async function likeComment(req: express.Request, res: express.Response) {
  const { error } = postValidation.checkCommentLikeParams(req.body);
  if (error) throw new ValidationError(error.details);

  if (await model(CommentLike).findOne({
    commentID: req.body.commentID,
    userID: req.body.userID,
  })) throw new Conflict('You have already liked this comment');

  await model(CommentLike).save({
    commentID: req.body.commentID,
    userID: req.body.userID,
  });

  return res.status(200).json({
    msg: 'Successful liked',
  });
}

export {
  createPost,
  deletePost,
  updatePost,
  likePost,
  getPost,
  getComments,
  getPosts,
  createComment,
  deleteComment,
  updateComment,
  likeComment,
};
