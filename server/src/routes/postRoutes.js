import {Router} from 'express';
import {addPost, getAllPost} from '../controllers/postController.js';

const postRouter = Router();

postRouter.post('/addPost', addPost);

postRouter.get('/getAllPosts', getAllPost);

export default postRouter;
