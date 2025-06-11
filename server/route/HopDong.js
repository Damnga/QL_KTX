import express from 'express';
import upload from '../middleware/multer.js';
import {create,getHopDong,getHopDongMaSV,getHopDongIdTaiKhoan,updateData,getHopDongId,update,remove} from "../controller/HopdongControler.js";
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/create', create);
router.get('/select', getHopDong);
router.get('/select/:id', getHopDongMaSV);
router.get('/taikhoan/:id', getHopDongIdTaiKhoan);
router.get('/:id', getHopDongId);
router.put('/:id',  update);
router.put('/data/:IDHopDong', updateData);
router.delete('/:id',  remove);

export default router;
