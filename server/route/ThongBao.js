import express from 'express';
import upload from '../middleware/multer.js';
import {create,getThongBao,getThongBaoId,update,remove} from "../controller/ThongbaoControler.js";
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/create', upload.single('anh'), create);
router.get('/select', getThongBao);
router.get('/:id', getThongBaoId);
router.put('/:id',upload.single('anh'),  update);
router.delete('/:id',  remove);

export default router;
