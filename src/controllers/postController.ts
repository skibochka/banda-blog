import * as express from 'express';
import { Conflict, NotFound } from 'http-errors';
import { model } from '../helpers/db/repository';
import { Post } from '../models/Post';
import { Like } from '../models/Likes';
import { Comment } from '../models/Comment';
import { User } from '../models/User';
import { IPost } from '../interfaces/IPost';
import { redisConfiguration } from '../config/redis';
import CacheStorage from '../helpers/db/cacheStorage';

async function createPost(req: express.Request, res: express.Response) {
  const user = await model(User).findOne(req.user.id);

  const post = await model(Post).save({
    title: req.body.title,
    content: req.body.content,
    user,
  });

  return res.status(200).json({
    id: post.id,
    title: req.body.title,
    content: req.body.content,
  });
}

async function deletePost(req: express.Request, res: express.Response) {
  if (!req.user.isAdmin) {
    const user = await model(User).findOne(req.user.id);
    const post = await model(Post).findOne({ id: req.body.postId, user });
    if (!post) {
      throw new Conflict('You can`t delete posts of other users');
    }
  }

  await model(Post).delete({ id: req.body.postId });

  return res.status(200).json({
    msg: 'Post successful deleted',
  });
}

async function updatePost(req: express.Request, res: express.Response) {
  if (!req.user.isAdmin) {
    const user = await model(User).findOne(req.user.id);
    const post = await model(Post).findOne({ id: req.body.postId, user });
    if (!post) {
      throw new Conflict('You can`t update posts of other users');
    }
  }

  await model(Post).update(req.body.postId, req.body.update);

  return res.status(200).json({
    msg: 'Successful updated',
  });
}

async function likePost(req: express.Request, res: express.Response) {
  const post = await model(Post).findOne({ id: req.body.postId });
  if (!post) {
    throw new NotFound('Such post does not exist');
  }

  const user = await model(User).findOne({ id: req.user.id });

  await model(Like).save({
    user,
    entityType: 'post',
    entityId: post.id,
  });

  return res.status(200).json({
    msg: 'Successful liked',
  });
}

async function getPost(req: express.Request, res: express.Response) {
  const post: IPost = await model(Post).findOne(req.query.postId as string) as Post;
  if (!post) {
    throw new NotFound('Such post does not exist');
  }
  post.likes = await model(Like).count({
    where: {
      entityType: 'post',
      entityId: post.id,
    },
  });

  const cacheStorage = await CacheStorage;
  await cacheStorage.set(req.url, JSON.stringify(post), 'EX', redisConfiguration.cacheExpirationTime);

  return res.status(200).json(post);
}

async function getComments(req: express.Request, res: express.Response) {
  const comments = await model(Comment).find({
    where: { post: +(req.query.postId || '0') },
    loadRelationIds: true,
  });

  return res.status(200).send(comments);
}

async function getPosts(req: express.Request, res: express.Response) {
  const posts: Post[] = await model(Post).find({
    skip: +(req.query.skip || '0') * +(req.query.page || '0'),
    take: +(req.query.take || '25'),
  });
  if (!posts) {
    throw new NotFound('Posts not found');
  }

  return res.status(200).send(posts);
}

async function createComment(req: express.Request, res: express.Response) {
  const user = await model(User).findOne({ where: { id: req.user.id } });
  const post = await model(Post).findOne({ where: { id: req.body.postId } });

  const comment = await model(Comment).save({
    content: req.body.content,
    post,
    user,
  });

  return res.status(200).json({
    id: comment.id,
    content: req.body.content,
  });
}

async function deleteComment(req: express.Request, res: express.Response) {
  if (!req.user.isAdmin) {
    const comment = await model(Comment).findOne({ where: { id: req.body.commentId, user: req.user.id } });
    if (!comment) throw new Conflict('You can`t delete comments of other users');
  }

  await model(Comment).delete({ id: req.body.commentId });

  return res.status(200).json({
    msg: 'Comment successful deleted',
  });
}

async function updateComment(req: express.Request, res: express.Response) {
  if (!req.user.isAdmin) {
    const comment = await model(Comment).findOne({ where: { id: req.body.commentId, user: req.user.id } });
    if (!comment) throw new Conflict('You can`t update comments of other users');
  }

  await model(Comment).update(req.body.commentId, req.body.update);

  return res.status(200).json({
    msg: 'Successful updated',
  });
}

async function likeComment(req: express.Request, res: express.Response) {
  const comment = await model(Comment).findOne({ id: req.body.commentId });
  if (!comment) {
    throw new NotFound('Such post does not exist');
  }
  const user = await model(User).findOne({ id: req.user.id });

  await model(Like).save({
    user,
    entityType: 'comment',
    entityId: comment.id,
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
