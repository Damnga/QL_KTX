import express from 'express';
import {create,getData,getDataId,update,remove } from '../controller/toanha.js';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();
router.post('/create', verifyToken,create);
router.get('/', verifyToken, getData);
router.get('/:id', verifyToken, getDataId);
router.put('/:id',verifyToken, update);
router.delete('/:id', verifyToken, remove);

export default router;
