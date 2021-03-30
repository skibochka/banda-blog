const jwtConfig = {
  secret: 'superSecurity',
  accessExpirationTime: { expiresIn: '50m' },
  refreshExpirationTime: { expiresIn: '7d' },
};
export default jwtConfig;
