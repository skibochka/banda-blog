import * as express from 'express';
import redisConnection from '../redis/redisConnection';

export default async function cacheMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const redis = redisConnection();
  const cachedPost = await redis.get(req.url);

  if (cachedPost) {
    const post = JSON.parse(cachedPost);
    return res.status(200).json(post);
  }

  return next();
}
