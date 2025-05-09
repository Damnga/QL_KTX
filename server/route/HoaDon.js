import express from 'express';
import upload from '../middleware/multer.js';
import {create,getHoaDon,getHoaDonId,update,remove} from "../controller/HoadonControler.js";
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/create', create);
router.get('/select', getHoaDon);
router.get('/:id', getHoaDonId);
router.put('/:id',  update);
router.delete('/:id',  remove);

export default router;
