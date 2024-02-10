import {Router} from 'express';
import {
  login,
  register,
  getUserTimeSpentInSimilarCategoryPlatforms,
  addPlatformTime,
  enrolledPlatforms,
  addinterestedPlatforms,
  getUserInterestedPlatforms,
  percentageTimeSpentByCategory
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
userRouter.post('/addIntrestedplatform', addinterestedPlatforms);
userRouter.get('/userIntrestedplatform', getUserInterestedPlatforms);
userRouter.get('/percentageRoutebyCategory',percentageTimeSpentByCategory);
export default userRouter;
