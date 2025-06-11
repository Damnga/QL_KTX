import express from 'express';
import upload from '../middleware/multer.js';
import {create,getGopY,getGopYId,getGopYIdSinhVien,update,remove} from "../controller/GopyControler.js";
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/create', create);
router.get('/select', getGopY);
router.get('/select/sinhvien/:id', getGopYIdSinhVien);
router.get('/:id', getGopYId);
router.put('/:id',  update);
router.delete('/:id',  remove);

export default router;
