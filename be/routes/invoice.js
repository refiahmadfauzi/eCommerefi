const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoice');

router.post('/invoice', invoiceController.createInvoice);
router.get('/invoice', invoiceController.getInvoice);
router.get('/invoice/:id', invoiceController.getInvoiceById);
router.put('/invoice/:id', invoiceController.updateInvoice);
router.delete('/invoice/:id', invoiceController.deleteInvoice);


module.exports = router;