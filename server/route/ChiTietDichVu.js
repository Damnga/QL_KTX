import express from 'express';
import upload from '../middleware/multer.js';
import {create,getChiTietDichVu,getChiTietDichVuId,update,remove} from "../controller/ChitietdichvuControler.js";
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/create', create);
router.get('/select', getChiTietDichVu);
router.get('/:id', getChiTietDichVuId);
router.put('/:id',  update);
router.delete('/:id',  remove);

export default router;
