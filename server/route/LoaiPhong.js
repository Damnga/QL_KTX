import express from 'express';
import upload from '../middleware/multer.js';
import {create,getLoaiPhong,getLoaiPhongId,update,remove} from "../controller/LoaiPhongControler.js";
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/create', create);
router.get('/select', getLoaiPhong);
router.get('/:MaLoai', getLoaiPhongId);
router.put('/:MaLoai',  update);
router.delete('/:MaLoai',  remove);

export default router;
