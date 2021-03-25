import { Unauthorized } from 'http-errors';
import * as express from 'express';

export async function sampleMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  throw new Unauthorized('You can get here yet, buddy.');

  return next();
}
