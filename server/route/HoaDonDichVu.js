import express from 'express';
import upload from '../middleware/multer.js';
import {create,getHoaDonDichVu,getHoaDonDichVuId,update,remove} from "../controller/HoadondichvuControler.js";
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/create', create);
router.get('/select', getHoaDonDichVu);
router.get('/:id', getHoaDonDichVuId);
router.put('/:id',  update);
router.delete('/:id',  remove);

export default router;
