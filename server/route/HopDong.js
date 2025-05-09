import express from 'express';
import upload from '../middleware/multer.js';
import {create,getHopDong,getHopDongId,update,remove} from "../controller/HopdongControler.js";
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/create', create);
router.get('/select', getHopDong);
router.get('/:id', getHopDongId);
router.put('/:id',  update);
router.delete('/:id',  remove);

export default router;
