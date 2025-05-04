const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const upload = require('../middlewares/upload');

router.get('/products', productController.getProducts);
router.get('/productsize', productController.getProductSize);
router.post('/products', upload.single('photo'), productController.createProduct);
router.post('/productssize', productController.createProductSize);
router.put('/products/:id', upload.single('photo'), productController.updateProduct);
router.put('/productssize/:id', productController.updateProductSize);
router.delete('/products/:id', productController.deleteProduct);
router.delete('/productssize/:id', productController.deleteProductSize);

module.exports = router;