import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Conflict, NotFound, Unauthorized } from 'http-errors';
import jwtConfig from '../config/jwt';
import { model } from '../helpers/db/repository';
import { User } from '../models/User';
import { BlackList } from '../models/BlackList';
import userValidation from '../helpers/validation/userValidation';
import { ValidationError } from '../helpers/validation/ValidationError';

async function signUp(req: express.Request, res: express.Response, next: express.NextFunction) {
  const { error } = userValidation.checkUser(req.body);
  if (error) throw new ValidationError(error.details);

  // @ts-ignore
  const userExist: User = await model(User).findOne({ login: req.body.login });
  if (userExist) throw new Conflict('Sorry such user is already exist');

  req.body.password = await bcrypt.hash(req.body.password, 10);

  const user: User = await model(User).save(req.body);
  return res.json({
    id: user.id,
    login: user.login,
  });
}

async function signIn(req: express.Request, res: express.Response, next: express.NextFunction) {
  const { error } = userValidation.checkUser(req.body);
  if (error) throw new ValidationError(error.details);

  // @ts-ignore
  const userExist: User = await model(User).findOne({ login: req.body.login });
  if (!userExist) throw new NotFound('Sorry such user does not exist');

  const passwordCompare = await bcrypt.compare(req.body.password, userExist.password);
  if (!passwordCompare) throw new Unauthorized('Wrong password!');

  const access = jwt.sign({ id: userExist.id, login: userExist.login }, jwtConfig.secret, jwtConfig.accessExpirationTime);
  const refresh = jwt.sign({ id: userExist.id, login: userExist.login }, jwtConfig.secret, jwtConfig.refreshExpirationTime);

  return res.json({
    access,
    refresh,
  });
}

async function signOut(req: express.Request, res: express.Response, next: express.NextFunction) {
  const { error } = userValidation.logout(req.body);
  if (error) throw new ValidationError(error.details);

  if (req.body.access) {
    // @ts-ignore
    await model(BlackList).save({ token: req.body.access });
  }
  // @ts-ignore
  await model(BlackList).save({ token: req.body.refresh });

  res.status(200).json({
    msg: 'Logged out',
  });
}

async function authenticate(req: express.Request, res: express.Response, next: express.NextFunction) {
  const token = req.headers['x-auth-token'];
  if (!token) throw new Unauthorized('Please login');

  // @ts-ignore
  const existInBlackList = await model(BlackList).findOne({ token });
  if (existInBlackList) throw new Unauthorized('Invalid token');

  jwt.verify(token, jwtConfig.secret);

  return next();
}

export {
  signUp,
  signIn,
  signOut,
  authenticate,
};
