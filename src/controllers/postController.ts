import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { Conflict, NotFound } from 'http-errors';
import jwtConfig from '../config/jwt';
import postValidation from '../helpers/validation/postValidation';
import { ValidationError } from '../helpers/validation/ValidationError';
import { model } from '../helpers/db/repository';
import { Post } from '../models/Post';
import { Like } from '../models/Likes';

async function createPost(req: express.Request, res: express.Response, next: express.NextFunction) {
  const { error } = postValidation.checkPost(req.body);
  if (error) throw new ValidationError(error.details);

  const { id } = jwt.verify(req.headers['x-auth-token'], jwtConfig.secret);
  const newPost = {
    title: req.body.title,
    content: req.body.content,
    userID: id,
  };

  const createdPost: Post = await model(Post).save(newPost);

  return res.status(200).json(createdPost);
}

async function deletePost(req: express.Request, res: express.Response, next: express.NextFunction) {
  const { error } = postValidation.checkPostID(req.body);
  if (error) throw new ValidationError(error.details);

  const user = jwt.verify(req.headers['x-auth-token'], jwtConfig.secret);
  const post = await model(Post).findOne({ id: req.body.postID });

  if (post.userID !== user.id || user.isAdmin) throw new Conflict('You can`t delete posts of other users');

  await model(Post).delete(post.id);

  return res.status(200).json({
    msg: 'Post successful deleted',
  });
}

async function updatePost(req: express.Request, res: express.Response, next: express.NextFunction) {
  const { error } = postValidation.updatePost(req.body);
  if (error) throw new ValidationError(error.details);

  const user = jwt.verify(req.headers['x-auth-token'], jwtConfig.secret);
  const post = await model(Post).findOne({ id: req.body.postID });
  if (!post) throw new NotFound('Such post does not exist');

  if (post.userID !== user.id || user.isAdmin) throw new Conflict('You can`t update posts of other users');

  await model(Post).update(post.id, req.body.update);

  return res.status(200).json({
    msg: 'Successful updated',
  });
}

async function likePost(req: express.Request, res: express.Response, next: express.NextFunction) {
  const { error } = postValidation.checkPostID(req.body);
  if (error) throw new ValidationError(error.details);

  const user = jwt.verify(req.headers['x-auth-token'], jwtConfig.secret);
  if (await model(Like).findOne(user.id)) throw new Conflict('You have already liked this post');

  await model(Like).save({
    postID: req.body.postID,
    userID: user.id,
  });

  return res.status(200).json({
    msg: 'Successful liked',
  });
}

async function getPost(req: express.Request, res: express.Response, next: express.NextFunction) {
  const { error } = postValidation.checkPostID(req.body);
  if (error) throw new ValidationError(error.details);

  const post = await model(Post).findOne(req.body.postID);
  if (!post) throw new NotFound('Such post does not exist');

  return res.status(200).json(post);
}

export {
  createPost,
  deletePost,
  updatePost,
  likePost,
  getPost,
};
