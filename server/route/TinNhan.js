import express from 'express';
import upload from '../middleware/multer.js';
import {create,getTinNhan,getTinNhanId,update,remove} from "../controller/TinnhanControler.js";
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/create',authenticateToken, create);
router.get('/select',authenticateToken, getTinNhan);
router.get('/:id',authenticateToken, getTinNhanId);
router.put('/:id',authenticateToken,  update);
router.delete('/:id',authenticateToken,  remove);

export default router;
