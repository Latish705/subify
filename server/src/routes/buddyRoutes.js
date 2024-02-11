import {Router} from 'express';
import {BuddyPaired} from '../controllers/buddyController.js';

const buddyRouter = Router();

buddyRouter.post('/addBuddy', BuddyPaired);

export default buddyRouter;
