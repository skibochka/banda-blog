import * as express from 'express';
import { createConnection } from 'typeorm';
import 'dotenv/config';
import authRouter from './routes/authRouter';
import postRouter from './routes/postRouter';
import bodyParser = require('body-parser');

export const appPromise = (async (): Promise<express.Application> => {
  const app = express();

  await createConnection();

  app.use(bodyParser.json({
    inflate: true,
  }));

  app.use('/auth', authRouter);
  app.use('/', postRouter);

  // Define 404 and 500 handlers below

  return app;
});
