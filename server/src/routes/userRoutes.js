import {Router} from 'express';
import {
  login,
  register,
  getUserTimeSpentInSimilarCategoryPlatforms,
  addPlatformTime,
  enrolledPlatforms,
} from '../controllers/userController.js';

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post(
  '/getUserTimeSpent',
  getUserTimeSpentInSimilarCategoryPlatforms,
);
userRouter.post('/addPlatformTimeSpent', addPlatformTime);
userRouter.post('/enrollePlatform', enrolledPlatforms);
export default userRouter;
