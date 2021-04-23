import * as jwt from 'jsonwebtoken';
import jwtConfig from '../../config/jwt';
import redisConnection from '../../redis/redisConnection';

const redis = redisConnection();

export async function getDefaultAccessToken() {
  const defaultUserId = await redis.get('testDefaultUser');
  return jwt.sign({ id: defaultUserId, login: 'test', isAdmin: false }, jwtConfig.secret, jwtConfig.accessExpirationTime);
}

export async function getAdminAccessToken() {
  const adminUserId = await redis.get('testAdminUser');
  return jwt.sign({ id: adminUserId, login: 'testAdmin', isAdmin: true }, jwtConfig.secret, jwtConfig.accessExpirationTime);
}
