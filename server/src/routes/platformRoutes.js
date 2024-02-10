import {Router} from 'express';
import {addPlatform} from '../controllers/platformController.js';

const platformRouter = Router();

platformRouter.post('/addPlatform', addPlatform);

export default platformRouter;
