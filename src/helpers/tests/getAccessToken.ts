import * as jwt from 'jsonwebtoken';
import jwtConfig from '../../config/jwt';
import State from './state';

export async function getDefaultAccessToken() {
  const defaultUserId = State.get('testDefaultUser');
  return jwt.sign({ id: defaultUserId, login: 'test', isAdmin: false }, jwtConfig.secret, jwtConfig.accessExpirationTime);
}

export async function getAdminAccessToken() {
  const adminUserId = State.get('testAdminUser');
  return jwt.sign({ id: adminUserId, login: 'testAdmin', isAdmin: true }, jwtConfig.secret, jwtConfig.accessExpirationTime);
}
