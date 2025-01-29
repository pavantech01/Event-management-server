const express = require('express');
const router = express.Router();
const { productController } = require('../controllers/product.controller');
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const upload = require('../middleware/upload.middleware');

// Routes for product operations
router.post('/',
    auth,
    upload.single('image'),
    productController.createProduct);

router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProductById);

router.put('/:id',
    auth,
    role.checkAdmin,
    productController.updateProduct
);

router.delete('/:id',
    auth,
    role.checkAdmin,
    productController.deleteProduct
);

module.exports = router;
