import redisConnection from '../../redis/redisConnection';
import State from '../tests/state';
import { Redis as RedisClient } from 'ioredis';

class CacheStorage {
  private redis: RedisClient;

  private state: typeof State;

  constructor(state: typeof State, redis: RedisClient) {
    this.redis = redis;
    this.state = state;
  }

  static async init() {
    const redis = await redisConnection();
    const state = State;

    return new this(state, redis);
  }

  async set(key: string, value: any, expiryMode?: string, time?: string | number) {
    if (process.env.CURRENT_CONNECTION_NAME === 'test') {
      return this.state.set(key, value);
    }
    return this.redis.set(key, value, expiryMode, time);
  }

  async get(key: string) {
    if (process.env.CURRENT_CONNECTION_NAME === 'test') {
      return this.state.get(key);
    }
    return this.redis.get(key);
  }
}
export default CacheStorage.init();
