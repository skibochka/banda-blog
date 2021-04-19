import Redis, { Redis as RedisClient } from 'ioredis';
import { redisConfiguration } from '../config/redis';

let redis: RedisClient | null = null;

export default function redisConnection(): RedisClient {
  if (!redis) {
    redis = new Redis(`redis://${redisConfiguration.redisUrl}:${redisConfiguration.redisPort}`);
    return redis;
  }
  return redis;
}
