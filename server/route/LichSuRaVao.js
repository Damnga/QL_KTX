import express from 'express';
import upload from '../middleware/multer.js';
import {create,getLichSuRaVao,getLichSuRaVaoId,getLichSuRaVaoIdSinhVien} from "../controller/LichsuravaoControler.js";
import {handleRfidScan} from "../service/Scan.js";
import {authenticateToken,authorizeRoles} from "../middleware/auth.js"
const router = express.Router();
router.post('/create', handleRfidScan);
router.get('/select', getLichSuRaVao);
router.get('/select/sinhvien/:id', getLichSuRaVaoIdSinhVien);
router.get('/:id', getLichSuRaVaoId);

export default router;
    