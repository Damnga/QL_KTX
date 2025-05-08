import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import userRoutes from './route/post.js';
import ToaNhaRoutes from './route/toanha.js';
import cors from 'cors';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(session({
  secret: 'secret-session',
  resave: false,
  saveUninitialized: true,
}));
app.use('/', userRoutes);
app.use('/toa_nha',ToaNhaRoutes);
const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));