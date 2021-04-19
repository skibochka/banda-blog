import express from 'express';
import { createConnection } from 'typeorm';
import 'dotenv/config';
import postRouter from './routes/postRouter';
import authRouter from './routes/authRouter';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';

export const appPromise = (async (): Promise<express.Application> => {
  const app = express();

  await createConnection();

  app.use(helmet());
  app.use(cors());
  app.use(bodyParser.json({
    inflate: true,
  }));
  app.use(morgan('combined'));

  // app.get('/test', (req, res, next) => {
  //   return res.status(200).json({
  //     msg: 'Test completed',
  //   });
  // });
  app.use('/auth', authRouter);
  app.use('/post', postRouter);


  app.use((req: express.Request, res: express.Response, _next: express.NextFunction) => {
    return res.status(404).send({
      message: `Route ${req.url} not found`,
    });
  });
  app.use((err: express.ErrorRequestHandler, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    return res.status(500).send({ error: err });
  });

  return app;
});
