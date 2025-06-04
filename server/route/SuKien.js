import express from 'express';
import upload from '../middleware/multer.js';
import {create,getSuKien,getSuKienData,getSuKienId,update,remove} from "../controller/SukienControler.js";
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/create', upload.single('anh'), create);
router.get('/select', getSuKien);
router.get('/select_data', getSuKienData);
router.get('/:id', getSuKienId);
router.put('/:id',upload.single('anh'),  update);
router.delete('/:id',  remove);

export default router;
