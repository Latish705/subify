import {Router} from 'express';
import {addPlatform} from '../controllers/platformController';

const platformRouter = Router();

platformRouter.post('/addPlatform', addPlatform);
