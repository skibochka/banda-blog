import * as express from 'express';
import * as eah from 'express-async-handler';
import { authMiddleware } from '../middlewares/authMiddleware';
import { signUp, signIn, signOut } from '../controllers/authController';

const authRouter = express.Router();


authRouter.post('/sign-up', eah(signUp));

authRouter.post('/sign-in', eah(signIn));

authRouter.use(eah(authMiddleware));

authRouter.post('/sign-out', eah(signOut));

export default authRouter;
