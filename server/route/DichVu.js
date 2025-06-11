import express from 'express';
import upload from '../middleware/multer.js';
import {create,getDichVu,getDichVuId,update,remove} from "../controller/DichvuControler.js";
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/create', create);
router.get('/select', getDichVu);
router.get('/:id', getDichVuId);
router.put('/:id',  update);
router.delete('/:id',  remove);

export default router;
