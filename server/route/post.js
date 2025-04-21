import express from 'express';
import multer from 'multer';
import path from 'path'; 
import { register, login, logout, getUsers, update, remove, getUserId } from '../controller/post.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); 
    cb(null, Date.now() + ext); 
  },
});
const upload = multer({ storage });
router.post('/register', upload.single('anh'), register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/', verifyToken, getUsers);
router.get('/:id', verifyToken, getUserId);
router.put('/:id', upload.single('image'), verifyToken, update);
router.delete('/:id', verifyToken, remove);

export default router;
