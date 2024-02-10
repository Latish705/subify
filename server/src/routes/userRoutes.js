import {Router} from 'express';
import {register} from '../controllers/userController';

const userRouter = Router();

userRouter.create('/register', register);

export default userRouter;
