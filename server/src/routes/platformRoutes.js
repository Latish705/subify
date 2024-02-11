import {Router} from 'express';
import {
  addPlatform,
  addPlatfromInterest,
} from '../controllers/platformController.js';

const platformRouter = Router();

platformRouter.post('/addPlatform', addPlatform);
platformRouter.get('/addPlatformInterest', addPlatfromInterest);

export default platformRouter;
