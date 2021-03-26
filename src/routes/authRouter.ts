import * as express from 'express';
import * as eah from 'express-async-handler';
import { sampleMiddleware } from '../middlewares/sampleMiddleware';
import { signUp, signIn, signOut } from '../controllers/authController';

const authRouter = express.Router();

authRouter.use(eah(sampleMiddleware));

authRouter.post('/sign-up', eah(signUp));

authRouter.post('/sign-in', eah(signIn));

authRouter.post('/sign-out', eah(signOut));

export default authRouter;
