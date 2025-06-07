import express from 'express';
import upload from '../middleware/multer.js';
import {create,getDangKy,getDangKyId,update} from "../controller/DangkyControler.js";
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/create', upload.fields([ 
    { name: 'anh', maxCount: 1 },
    { name: 'DonXin', maxCount: 1 }, 
    { name: 'GiayXacNhanSinhVien', maxCount: 1 },
    { name: 'CCCDPhoTo', maxCount: 1 }
    ]), create);
router.get('/select', getDangKy);
router.get('/:id', getDangKyId);
router.put('/:id',upload.fields([ 
    { name: 'anh', maxCount: 1 },
    { name: 'DonXin', maxCount: 1 }, 
    { name: 'GiayXacNhanSinhVien', maxCount: 1 },
    { name: 'CCCDPhoTo', maxCount: 1 }, 
    { name: 'HopDong', maxCount: 1 } ]), update);

export default router;
