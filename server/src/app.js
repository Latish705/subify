import dotenv from 'dotenv';
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import platformRoutes from './routes/platformRoutes.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('Hello World');
});

//user routes
app.use('/api/users', userRoutes);
//platform routes
app.use('/api/platforms', platformRoutes);

export default app;
