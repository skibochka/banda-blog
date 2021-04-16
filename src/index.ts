import { appPromise } from './app';
import { appConfiguration } from './config/app';

appPromise().then((app) => {
  app.listen(appConfiguration.port || 80, () => {
    console.log(`server is up and running on port ${appConfiguration.port}`);
  });
});
