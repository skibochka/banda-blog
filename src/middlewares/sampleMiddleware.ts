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

  // @ts-ignore
  const existInBlackList = await model(BlackList).findOne({ token });
  if (existInBlackList) throw new Unauthorized('Invalid token');

  jwt.verify(token, jwtConfig.secret);

  return next();
}
