const jwtConfig = {
  secret: 'superSecurity',
  accessExpirationTime: { expiresIn: '10m' },
  refreshExpirationTime: { expiresIn: '7d' },
};
export default jwtConfig;
