import express from 'express';
import upload from '../middleware/multer.js';
import {register, login, logout,  getTaiKhoan,  getTaiKhoanId, update, remove} from '../controller/taikhoan.js';
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/register', upload.single('anh'), register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/',authenticateToken, authorizeRoles(1), getTaiKhoan);
router.get('/:id', authenticateToken, authorizeRoles(1), getTaiKhoanId);
router.put('/:id', authenticateToken, authorizeRoles(1), upload.single('anh'), update);
router.delete('/:id', authenticateToken, authorizeRoles(1), remove);

export default router;
