import express from 'express';
import upload from '../middleware/multer.js';
import {create,getNguoiDung,getNguoiDungId,update,remove} from "../controller/NguoidungControler.js";
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/create', create);
router.get('/select', getNguoiDung);
router.get('/:id', getNguoiDungId);
router.put('/:id',  update);
router.delete('/:id',  remove);

export default router;
