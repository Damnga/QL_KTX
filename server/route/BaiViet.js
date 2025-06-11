import express from 'express';
import upload from '../middleware/multer.js';
import {create,getBaiViet,getBaiVietData,getBaiVietId,update,remove} from "../controller/BaivietControler.js";
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/create', upload.single('anh'), create);
router.get('/select', getBaiViet);
router.get('/select_data', getBaiVietData);
router.get('/:id', getBaiVietId);
router.put('/:id',upload.single('anh'),  update);
router.delete('/:id',  remove);

export default router;
