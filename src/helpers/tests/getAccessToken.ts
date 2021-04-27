import * as jwt from 'jsonwebtoken';
import jwtConfig from '../../config/jwt';
import CacheStorage from '../db/cacheStorage';

export async function getDefaultAccessToken() {
  const cacheStorage = await CacheStorage;
  const defaultUserId = await cacheStorage.get('testDefaultUserId');
  return jwt.sign({ id: defaultUserId, login: 'test', isAdmin: false }, jwtConfig.secret, jwtConfig.accessExpirationTime);
}

export async function getAdminAccessToken() {
  const cacheStorage = await CacheStorage;
  const adminUserId = cacheStorage.get('testAdminUser');
  return jwt.sign({ id: adminUserId, login: 'testAdmin', isAdmin: true }, jwtConfig.secret, jwtConfig.accessExpirationTime);
}
