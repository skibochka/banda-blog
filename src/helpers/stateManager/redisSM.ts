import { IStateManager } from '../../interfaces/IStateManager';
import { Redis as RedisClient } from 'ioredis';
import redisConnection from '../../redis/redisConnection';

export class RedisSM implements IStateManager {
  private redisClient: RedisClient;

  async init() {
    this.redisClient = await redisConnection();
  }

  async get(key: string) {
    return this.redisClient.get(key);
  }

  set(key: string, value: any, expiryMode?: string, time?: string | number): Promise<string | null> {
    return this.redisClient.set(key, value, expiryMode, time);
  }
}
