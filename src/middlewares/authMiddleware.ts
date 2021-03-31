import { Unauthorized } from 'http-errors';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { model } from '../helpers/db/repository';
import { BlackList } from '../models/BlackList';
import jwtConfig from '../config/jwt';

export async function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    throw new Unauthorized('Please login');
  }

  const existInBlackList = await model(BlackList).findOne({ token: token as string });
  if (existInBlackList) {
    throw new Unauthorized('Invalid token');
  }

  const userPayload = jwt.verify(token, jwtConfig.secret);

  req.user = {
    id: userPayload.id,
    isAdmin: userPayload.isAdmin,
  };

  return next();
}
