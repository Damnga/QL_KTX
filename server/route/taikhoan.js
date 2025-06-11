import express from 'express';
import upload from '../middleware/multer.js';
import {register, login,updateMaPQ, logout,resetPassword,  getTaiKhoan, getTaiKhoanId, update, remove} from '../controller/taikhoan.js';
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/register', upload.single('anh'), register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/',getTaiKhoan);
router.post('/reset-password', resetPassword);
router.get('/:id', getTaiKhoanId);
router.put('/:id',  upload.single('anh'), update);
router.put('/data/:IDTaiKhoan', updateMaPQ);
router.delete('/:id',     remove);

export default router;
