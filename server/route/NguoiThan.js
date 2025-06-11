import express from 'express';
import upload from '../middleware/multer.js';
import {create,getNguoiThan,getNguoiThanIdSinhVien,getNguoiThanId,update,remove} from "../controller/NguoithanControler.js";
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/create', create);
router.get('/select', getNguoiThan);
router.get('/select/sinhvien/:MaSV', getNguoiThanIdSinhVien);
router.get('/:id', getNguoiThanId);
router.put('/:id',  update);
router.delete('/:id',  remove);

export default router;
