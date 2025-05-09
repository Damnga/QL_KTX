import express from 'express';
import upload from '../middleware/multer.js';
import {create,getKyLuat,getKyLuatId,update,remove} from "../controller/KyluatControler.js";
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/create', create);
router.get('/select', getKyLuat);
router.get('/:id', getKyLuatId);
router.put('/:id',  update);
router.delete('/:id',  remove);

export default router;
