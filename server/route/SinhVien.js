import express from 'express';
import upload from '../middleware/multer.js';
import {create,getSinhVien, getSinhVienData,getSinhVienIdSinhVien,getSinhVienId,getSinhVienIdUser,update,remove} from "../controller/SinhvienControler.js";
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/create', upload.single('anh'), create);
router.get('/select', getSinhVien);
router.get('/select_data', getSinhVienData);
router.get('/select_data/:id', getSinhVienIdSinhVien);
router.get('/:id', getSinhVienId);
router.get('/data/:id', getSinhVienIdUser);
router.put('/:id',upload.single('anh'),  update);
router.delete('/:id',  remove);

export default router;
