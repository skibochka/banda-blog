import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Conflict, NotFound, Unauthorized } from 'http-errors';
import jwtConfig from '../config/jwt';
import { model } from '../helpers/db/repository';
import { User } from '../models/User';
import { redisConfiguration } from '../config/redis';
import redisConnection from '../redis/redisConnection';

async function signUp(req: express.Request, res: express.Response) {
  const userExist: User = await model(User).findOne({ login: req.body.login });
  if (userExist) {
    throw new Conflict('Sorry such user is already exist');
  }

  req.body.password = await bcrypt.hash(req.body.password, 10);

  const user: User = await model(User).save(req.body);
  return res.json({
    id: user.id,
    login: user.login,
  });
}

async function signIn(req: express.Request, res: express.Response) {
  const user: User = await model(User).findOne({ login: req.body.login });
  if (!user) {
    throw new NotFound('Sorry such user does not exist');
  }

  const passwordCompare = await bcrypt.compare(req.body.password, user.password);
  if (!passwordCompare) {
    throw new Unauthorized('Wrong password!');
  }

  const access = jwt.sign({ id: user.id, login: user.login, isAdmin: user.isAdmin }, jwtConfig.secret, jwtConfig.accessExpirationTime);
  const refresh = jwt.sign({ id: user.id, login: user.login }, jwtConfig.secret, jwtConfig.refreshExpirationTime);

  return res.json({
    access,
    refresh,
  });
}

async function signOut(req: express.Request, res: express.Response) {
  const redis = redisConnection();

  await redis.set(req.body.access, 'access', 'EX', redisConfiguration.accessExpirationTime);
  await redis.set(req.body.refresh, 'refresh', 'EX', redisConfiguration.refreshExpirationTime);

  res.status(200).json({
    msg: 'Logged out',
  });
}

export {
  signUp,
  signIn,
  signOut,
};
