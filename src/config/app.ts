export const appConfiguration = {
  port: process.env.APP_PORT,
  skipAuthentication: ['/sign-up', '/sign-in', '/', '/get', '/comments'],
};
