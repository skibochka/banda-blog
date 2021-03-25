import * as express from 'express';
import * as eah from 'express-async-handler';
import {
  signUp, signIn, authenticate, signOut, test,
} from '../controllers/sampleController';
import { anotherSampleMiddleware } from '../middlewares/anotherSampleMiddleware';

const sampleRouter = express.Router();

// Register router-global middleware below
sampleRouter.use(eah(anotherSampleMiddleware));


// Register router routes with their middlewares below
// Don't forget wrap handlers in eah to handle async rejections

sampleRouter.post('/sign-up', eah(signUp));

sampleRouter.post('/sign-in', eah(signIn));

sampleRouter.post('/sign-out', eah(authenticate), eah(signOut));

sampleRouter.post('/test', eah(authenticate), eah(test));

export default sampleRouter;
