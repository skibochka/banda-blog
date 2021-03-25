import bodyParser = require('body-parser');
import * as express from 'express';
import { createConnection } from 'typeorm';
import 'dotenv/config';
import sampleRouter from './routes/sampleRouter';

export const appPromise = (async (): Promise<express.Application> => {
    const app = express();

    await createConnection();

    // Global middleware goes below
    app.use(bodyParser.json({
        inflate: true,
    }));

    // Router registration goes here
    app.use('/', sampleRouter);
    // app.use('/otherRoute', otherRouter);

    // Define 404 and 500 handlers below

    return app;
});
