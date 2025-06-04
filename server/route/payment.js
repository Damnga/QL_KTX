import express from 'express';
import { createPaymentUrl ,vnpayReturn} from '../controller/paymentController.js';

const router = express.Router();

router.post('/create_payment',createPaymentUrl);

router.get('/vnpay-return', vnpayReturn);

export default router;