const productService = require('../services/product.service');
const { ApiError } = require('../utils/apiError');
const catchAsync = require('../utils/catchAsync');

const productController = {
    createProduct: catchAsync(async (req, res) => {
        const productData = {
            ...req.body,
        };

        const image = req.file;

        try {
            const product = await productService.createProduct(productData, image);
            res.status(201).json({
                success: true,
                data: product
            });
        } catch (error) {
            console.error('Error creating product:', error);
            throw new ApiError(500, 'Internal Server Error');
        }
    }),

    getAllProducts: catchAsync(async (req, res) => {
        const { page = 1, limit = 10, category, search } = req.query;
        const products = await productService.getAllProducts(page, limit, category, search);
        res.status(200).json(products);
    }),

    getProductById: catchAsync(async (req, res) => {
        const product = await productService.getProductById(req.params.id);
        res.status(200).json(product);
    }),

    updateProduct: catchAsync(async (req, res) => {
        const { id } = req.params;

        const product = await productService.updateProduct(id, req.body);
        
        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: product
        });
    }),

    deleteProduct: catchAsync(async (req, res) => {
        await productService.deleteProduct(req.params.id);
        res.status(204).send();
    })
};

module.exports = { productController };
