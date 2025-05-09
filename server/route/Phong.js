import express from 'express';
import upload from '../middleware/multer.js';
import {create,getPhong,getPhongId,update,remove} from "../controller/Phong.js";
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/create', upload.single('anh'), create);
router.get('/select', getPhong);
router.get('/:id', getPhongId);
router.put('/:id',upload.single('anh'),  update);
router.delete('/:id',  remove);

export default router;
