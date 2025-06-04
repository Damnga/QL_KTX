import express from 'express';
import upload from '../middleware/multer.js';
import {create,getPhong,getPhongData,getTenPhongId,getPhongId,update,remove,getPhongIdTenPhongToaNha} from "../controller/Phong.js";
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/create',create);
router.get('/select', getPhong);
router.get('/select_data',  getPhongData);
router.get('/tenphong/:TenPhong/toanha/:TenTN',getPhongIdTenPhongToaNha);
router.get('/ten_phong/:id',getTenPhongId);
router.get('/:MaPhong',getPhongId);

router.put('/:MaPhong', update);
router.delete('/:MaPhong',remove);

export default router;
