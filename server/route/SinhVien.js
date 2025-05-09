import express from 'express';
import upload from '../middleware/multer.js';
import {create,getSinhVien,getSinhVienId,update,remove} from "../controller/SinhvienControler.js";
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/create', upload.single('anh'), create);
router.get('/select', getSinhVien);
router.get('/:id', getSinhVienId);
router.put('/:id',upload.single('anh'),  update);
router.delete('/:id',  remove);

export default router;
