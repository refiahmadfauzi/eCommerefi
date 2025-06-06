const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment');

router.post('/payments', paymentController.createPayment);
router.get('/payments', paymentController.getPayment);
router.get('/payments/user/:id', paymentController.getPaymentByUserId);
router.put('/payments/:id', paymentController.updatePayment);
router.delete('/payments/:id', paymentController.deletePayment);


module.exports = router;