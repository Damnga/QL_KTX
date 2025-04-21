import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import userRoutes from './routes/post.js';
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));