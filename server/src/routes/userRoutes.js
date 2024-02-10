import {Router} from 'express';
import {login, register} from '../controllers/userController';

const userRouter = Router();

userRouter.route('/register', register);
userRouter.route('/login', login);

export default userRouter;
