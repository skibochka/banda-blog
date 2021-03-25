import * as express from 'express';

export async function anotherSampleMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  console.log(`It's another simple middleware. Your ip is ${req.ip}`);

  return next();
}
