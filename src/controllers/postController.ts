import * as express from 'express';
import { Conflict, NotFound } from 'http-errors';
import postValidation from '../helpers/validation/postValidation';
import { ValidationError } from '../helpers/validation/ValidationError';
import { model } from '../helpers/db/repository';
import { Post } from '../models/Post';
import { Like } from '../models/Likes';
import { Comment } from '../models/Comment';
import { CommentLike } from '../models/CommentLike';
import { User } from '../models/User';

async function createPost(req: express.Request, res: express.Response) {
  const { error } = postValidation.checkPostInput(req.body);
  if (error) {
    throw new ValidationError(error.details);
  }

  const user = await model(User).findOne(req.user.id);

  await model(Post).save({
    title: req.body.title,
    content: req.body.content,
    user,
  });

  return res.status(200).json({
    title: req.body.title,
    content: req.body.content,
  });
}

async function deletePost(req: express.Request, res: express.Response) {
  const { error } = postValidation.checkPostId(req.body);
  if (error) {
    throw new ValidationError(error.details);
  }

  if (!req.user.isAdmin) {
    const user = await model(User).findOne(req.user.id);
    const post: Post = await model(Post).findOne({ id: req.body.postId, user });
    if (!post) throw new Conflict('You can`t delete posts of other users');
  }

  await model(Post).delete(req.body.postId);

  return res.status(200).json({
    msg: 'Post successful deleted',
  });
}

async function updatePost(req: express.Request, res: express.Response) {
  const { error } = postValidation.updatePost(req.body);
  if (error) {
    throw new ValidationError(error.details);
  }

  if (!req.user.isAdmin) {
    const user = await model(User).findOne(req.user.id);
    const post: Post = await model(Post).findOne({ id: req.body.postId, user });
    if (!post) throw new Conflict('You can`t update posts of other users');
  }

  await model(Post).update(req.body.postId, req.body.update);

  return res.status(200).json({
    msg: 'Successful updated',
  });
}

async function likePost(req: express.Request, res: express.Response) {
  const { error } = postValidation.checkPostId(req.body);
  if (error) {
    throw new ValidationError(error.details);
  }

  if (await model(Like).findOne({
    post: req.body.postId,
    user: req.user.id,
  })) throw new Conflict('You have already liked this post');

  const post = await model(Post).findOne({ id: req.body.postId });
  const user = await model(User).findOne({ id: req.user.id });

  await model(Like).save({ post, user });

  return res.status(200).json({
    msg: 'Successful liked',
  });
}

async function getPost(req: express.Request, res: express.Response) {
  const { error } = postValidation.checkPostId(req.query);
  if (error) {
    throw new ValidationError(error.details);
  }

  const post: Post = await model(Post).findOne(req.query.postId as string, { loadRelationIds: true });
  if (!post) {
    throw new NotFound('Such post does not exist');
  }

  return res.status(200).json(post);
}

async function getComments(req: express.Request, res: express.Response) {
  const { error } = postValidation.checkPostId(req.query);
  if (error) {
    throw new ValidationError(error.details);
  }

  const comments = await model(Comment).find({ postID: +req.query.postID, loadRelationIds: true });

  return res.status(200).send(comments);
}

async function getPosts(req: express.Request, res: express.Response) {
  const { error } = postValidation.getPosts(req.query);
  if (error) {
    throw new ValidationError(error.details);
  }

  const posts: Post[] = await model(Post).find({
    skip: +req.query.skip * +req.query.page,
    take: +req.query.take,
  });
  if (!posts) {
    throw new NotFound('Posts not found');
  }

  return res.status(200).send(posts);
}

async function createComment(req: express.Request, res: express.Response) {
  const { error } = postValidation.checkCommentInput(req.body);
  if (error) {
    throw new ValidationError(error.details);
  }

  const user = await model(User).findOne({ id: req.user.id });
  const post = await model(Post).findOne({ id: req.body.postId });

  await model(Comment).save({
    content: req.body.content,
    post,
    user,
  });

  return res.status(200).json({ content: req.body.content });
}

async function deleteComment(req: express.Request, res: express.Response) {
  const { error } = postValidation.checkCommentId(req.body);
  if (error) {
    throw new ValidationError(error.details);
  }

  if (!req.user.isAdmin) {
    const comment: Comment = await model(Comment).findOne({ id: req.body.commentId, user: req.user.id });
    if (!comment) throw new Conflict('You can`t delete comments of other users');
  }

  await model(Comment).delete(req.body.commentId);

  return res.status(200).json({
    msg: 'Comment successful deleted',
  });
}

async function updateComment(req: express.Request, res: express.Response) {
  const { error } = postValidation.updateComment(req.body);
  if (error) {
    throw new ValidationError(error.details);
  }

  if (!req.user.isAdmin) {
    const comment: Comment = await model(Comment).findOne({ id: req.body.commentId, user: req.user.id });
    if (!comment) throw new Conflict('You can`t update comments of other users');
  }

  await model(Comment).update(req.body.commentId, req.body.update);

  return res.status(200).json({
    msg: 'Successful updated',
  });
}

async function likeComment(req: express.Request, res: express.Response) {
  const { error } = postValidation.checkCommentId(req.body);
  if (error) {
    throw new ValidationError(error.details);
  }

  const like = await model(CommentLike).findOne({
    comment: req.body.commentId,
    user: req.user.id,
  });
  if (like) {
    throw new Conflict('You have already liked this comment');
  }

  const comment = await model(Comment).findOne({ id: req.body.commentId });
  const user = await model(User).findOne({ id: req.user.id });

  await model(CommentLike).save({ comment, user });

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
