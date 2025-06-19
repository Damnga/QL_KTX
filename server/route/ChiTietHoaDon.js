import express from 'express';
import upload from '../middleware/multer.js';
import {create,getChiTietHoaDon,getChiTietHoaDonData,getChiTietHoaDonId,update,remove} from "../controller/ChitiethoadonControler.js";
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/create', create);
router.get('/select', getChiTietHoaDon);
router.get('/select/:MaHD', getChiTietHoaDonData);
router.get('/:id', getChiTietHoaDonId);
router.put('/:id',  update);
router.delete('/:id',  remove);

export default router;
