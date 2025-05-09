import express from 'express';
import upload from '../middleware/multer.js';
import {create,getBaoTri,getBaoTriId,update,remove} from "../controller/BaotriControler.js";
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/create', create);
router.get('/select', getBaoTri);
router.get('/:id', getBaoTriId);
router.put('/:id',  update);
router.delete('/:id',  remove);

export default router;
