import * as jwt from 'jsonwebtoken';
import jwtConfig from '../../config/jwt';

export function getDefaultAccessToken() {
  return jwt.sign({ id: 1, login: 'test', isAdmin: false }, jwtConfig.secret, jwtConfig.accessExpirationTime);
}

export function getAdminAccessToke() {
  return jwt.sign({ id: 2, login: 'testAdmin', isAdmin: true }, jwtConfig.secret, jwtConfig.accessExpirationTime);
}
