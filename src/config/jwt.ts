const jwtConfig = {
  secret: 'superSecurity',
  accessExpirationTime: { expiresIn: '7d' },
  refreshExpirationTime: { expiresIn: '2m' },
};
export default jwtConfig;
