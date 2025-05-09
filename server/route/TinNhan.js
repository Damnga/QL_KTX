import express from 'express';
import upload from '../middleware/multer.js';
import {create,getTinNhan,getTinNhanId,update,remove} from "../controller/TinnhanControler.js";
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/create', create);
router.get('/select', getTinNhan);
router.get('/:id', getTinNhanId);
router.put('/:id',  update);
router.delete('/:id',  remove);

export default router;
