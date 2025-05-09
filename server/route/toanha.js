import express from 'express';
import upload from '../middleware/multer.js';
import {create,getToaNha,getToaNhaId,update,remove} from "../controller/ToanhaControler.js";
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/create',create);
router.get('/select', getToaNha);
router.get('/:MaTN', getToaNhaId);
router.put('/:MaTN',  update);
router.delete('/:MaTN',  remove);

export default router;
