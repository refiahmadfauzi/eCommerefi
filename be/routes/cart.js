const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');

router.post('/carts', cartController.createCart);
router.get('/carts', cartController.getCart);
router.get('/carts/:id', cartController.getCartById);
router.put('/carts/:id', cartController.updateCart);
router.delete('/carts/:id', cartController.deleteCart);


module.exports = router;