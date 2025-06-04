import express from 'express';
import upload from '../middleware/multer.js';
import {create,getDangKyTham,getDangKyThamId,update,remove,getDangKyThamIdSinhVien} from "../controller/DangkythamControler.js";
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/create', create);
router.get('/select', getDangKyTham);
router.get('/select/sinhvien/:id', getDangKyThamIdSinhVien);
router.get('/:id', getDangKyThamId);
router.put('/:id',  update);
router.delete('/:id',  remove);

export default router;
