import * as express from 'express';
import CacheStorage from '../helpers/db/cacheStorage';

export default async function cacheMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const cacheStorage = await CacheStorage;
  const cachedPost = await cacheStorage.get(req.url);

  if (cachedPost) {
    const post = JSON.parse(cachedPost);
    return res.status(200).json(post);
  }

  return next();
}
