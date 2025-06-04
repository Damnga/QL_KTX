import express from 'express';
import upload from '../middleware/multer.js';
import {create,getTuongTac,getTuongTacId,update,remove} from "../controller/TuongtacControler.js";
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/create', create);
router.get('/select', getTuongTac);
router.get('/:id', getTuongTacId);
router.put('/:id',  update);
router.delete('/:id',  remove);

export default router;
