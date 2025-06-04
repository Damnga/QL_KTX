import express from 'express';
import upload from '../middleware/multer.js';
import {create,getThongBao,getThongBaoData,getThongBaoId,update,remove} from "../controller/ThongbaoControler.js";
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/create',create);
router.get('/select', getThongBao);
router.get('/select_data', getThongBaoData);
router.get('/:id', getThongBaoId);
router.put('/:id',update);
router.delete('/:id',  remove);

export default router;
