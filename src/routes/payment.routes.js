const express = require('express');
const router = express.Router();
const { paymentController } = require('../controllers/payment.controller');
const auth = require('../middleware/auth.middleware');

router.post('/create-order', auth, paymentController.createOrder);
router.post('/verify', auth, paymentController.verifyPayment);
router.get('/history', auth, paymentController.getPaymentHistory);


module.exports = router; 