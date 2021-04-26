import * as express from 'express';
import eah from 'express-async-handler';
import { authValidation } from '../validation/authSchemas';
// import { authMiddleware } from '../middlewares/authMiddleware';
import { signUp, signIn, signOut } from '../controllers/authController';
import { validatorMiddleware } from '../middlewares/validatorMiddleware';

const authRouter = express.Router();


authRouter.post('/sign-up', validatorMiddleware(authValidation.checkUser), eah(signUp));

authRouter.post('/sign-in', validatorMiddleware(authValidation.checkUser), eah(signIn));

// authRouter.use(eah(authMiddleware));

authRouter.post('/sign-out', validatorMiddleware(authValidation.logoutUser), eah(signOut));

export default authRouter;
