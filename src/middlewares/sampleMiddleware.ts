import { Unauthorized } from 'http-errors';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { model } from '../helpers/db/repository';
import { BlackList } from '../models/BlackList';
import jwtConfig from '../config/jwt';
import { appConfiguration } from '../config/app';

export async function sampleMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (appConfiguration.skipAuthentication.includes(req.path)) return next();
  const token = req.headers['x-auth-token'];
  if (!token) throw new Unauthorized('Please login');


  const existInBlackList = await model(BlackList).findOne({ token: token as string });
  if (existInBlackList) throw new Unauthorized('Invalid token');

  const userPayload = jwt.verify(token, jwtConfig.secret);
  req.body.userId = userPayload.id;
  req.body.isAdmin = userPayload.isAdmin;

  return next();
}
