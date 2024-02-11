import {Router} from 'express';
import {
  addPlatform,
  addPlatfromInterest,
} from '../controllers/platformController.js';

const platformRouter = Router();

platformRouter.post('/addPlatform', addPlatform);
platformRouter.post('/addPlatformInterest', addPlatfromInterest);

export default platformRouter;
