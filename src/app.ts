import * as express from 'express';
import { createConnection } from 'typeorm';
import 'dotenv/config';
import authRouter from './routes/authRouter';
import postRouter from './routes/postRouter';
import morgan = require('morgan');
import bodyParser = require('body-parser');
import helmet = require('helmet');
import cors = require('cors');

export const appPromise = (async (): Promise<express.Application> => {
  const app = express();

  await createConnection();

  app.use(morgan('combined'));
  app.use(bodyParser.json({
    inflate: true,
  }));
  app.use(helmet());
  app.use(cors());

  app.use('/auth', authRouter);
  app.use('/post', postRouter);


  app.use((req: express.Request, res: express.Response, next:express.NextFunction) => {
    return res.status(404).send({
      message: `Route ${req.url} not found`,
    });
  });
  app.use((err: express.ErrorRequestHandler, req: express.Request, res: express.Response, next:express.NextFunction) => {
    return res.status(500).send({ error: err });
  });

  return app;
});
