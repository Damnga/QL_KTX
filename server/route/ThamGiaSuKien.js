import express from 'express';
import upload from '../middleware/multer.js';
import {create,getThamGiaSuKien,getThamGiSuKienId,update,remove,getThamGiSuKienIdSinhVien} from "../controller/ThamgiasukienControler.js";
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/create', create);
router.get('/select', getThamGiaSuKien);
router.get('/select/:MaSV', getThamGiSuKienIdSinhVien);
router.get('/:id', getThamGiSuKienId);
router.put('/:id', update);
router.delete('/:id',  remove);

export default router;
