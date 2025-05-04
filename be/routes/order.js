const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

router.get('/orders/:users_id', orderController.getOrdersByUser);
router.get('/orders', orderController.getOrders);
router.get('/invoice/pdf/:id', orderController.downloadInvoicePDF);
router.put('/invoices/:id/shipping-status', orderController.updateShippingStatus);

module.exports = router;