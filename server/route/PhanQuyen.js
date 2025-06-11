import express from 'express';
import upload from '../middleware/multer.js';
import {create,getPhanQuyen,getPhanQuyenId,update,remove} from "../controller/PhanquyenControler.js";
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/create', create);
router.get('/select', getPhanQuyen);
router.get('/:id', getPhanQuyenId);
router.put('/:id',  update);
router.delete('/:id',  remove);

export default router;
