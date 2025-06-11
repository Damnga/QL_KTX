import express from 'express';
import upload from '../middleware/multer.js';
import {create,getHoSo,getHoSoId,update,remove} from "../controller/HosoControler.js";
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/create', upload.fields([ 
    { name: 'DonXin', maxCount: 1 }, 
    { name: 'GiayXacNhanSinhVien', maxCount: 1 },
    { name: 'CCCDPhoTo', maxCount: 1 }
     ]), create);
router.get('/select', getHoSo);
router.get('/:MaHD', getHoSoId);
router.put('/:MaHD',upload.fields([ 
    { name: 'DonXin', maxCount: 1 }, 
    { name: 'GiayXacNhanSinhVien', maxCount: 1 },
    { name: 'CCCDPhoTo', maxCount: 1 }, 
    { name: 'HopDong', maxCount: 1 } ]), update);
router.delete('/:MaHD',  remove);

export default router;
