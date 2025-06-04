import express from 'express';
import upload from '../middleware/multer.js';
import {create,getBinhLuan,getBinhLuanId,getBinhLuanIdData,update,remove} from "../controller/BinhluanControler.js";
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/create', create);
router.get('/select', getBinhLuan);
router.get('/:id', getBinhLuanId);
router.get('select/:id', getBinhLuanIdData);
router.put('/:id',  update);
router.delete('/:id',  remove);

export default router;
