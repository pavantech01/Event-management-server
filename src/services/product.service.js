const { Product } = require('../models/product.model');
const cloudinary = require('../config/cloudinary.config');
const { ApiError } = require('../utils/apiError');

const productService = {
    async createProduct(productData, image) {
        let imageDetails;

        if (image) {
            try {
                const base64Image = image.buffer.toString('base64');
                const result = await cloudinary.uploader.upload(
                    `data:${image.mimetype};base64,${base64Image}`,
                    {
                        folder: 'products',
                        resource_type: 'auto'
                    }
                );

                imageDetails = {
                    public_id: result.public_id,
                    url: result.secure_url
                };
            } catch (error) {
                console.error('Error uploading image to Cloudinary:', error);
                throw new ApiError(500, 'Image upload failed');
            }
        }

        try {
            const product = await Product.create({
                ...productData,
                image: imageDetails, // Save the image URL in the database
            });
            return product;
        } catch (error) {
            console.error('Error creating product:', error);
            throw new ApiError(500, 'Product creation failed');
        }
    },

    async getAllProducts(page, limit, category, search) {
        const query = {};
        if (category) query.category = category;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        try {
            const products = await Product.find(query)
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit);

            const total = await Product.countDocuments(query);

            return {
                products,
                total,
                pages: Math.ceil(total / limit)
            };
        } catch (error) {
            console.error('Error retrieving products:', error);
            throw new ApiError(500, 'Failed to retrieve products');
        }
    },

    async getProductById(productId) {
        const product = await Product.findById(productId);

        if (!product) {
            throw new ApiError(404, 'Product not found');
        }

        return product;
    },

    async updateProduct(productId, updateData) {
        const product = await Product.findById(productId);
        if (!product) {
            throw new ApiError(404, 'Product not found');
        }

        Object.assign(product, updateData);
        await product.save();
        return product;
    },

    async deleteProduct(productId) {
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            throw new ApiError(404, 'Product not found');
        }
    }
};

module.exports = productService;
