import dotenv from 'dotenv';
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import platformRoutes from './routes/platformRoutes.js';
import cors from 'cors';
import buddyRouter from './routes/buddyRoutes.js';
import postRouter from './routes/postRoutes.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World');
});

//user routes
app.use('/api/users', userRoutes);
//platform routes
app.use('/api/platforms', platformRoutes);
//buddy routes
app.use('/api/buddy', buddyRouter);
//post routes
app.use('/api/posts', postRouter);

export default app;
