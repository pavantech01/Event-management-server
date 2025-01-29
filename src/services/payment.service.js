const razorpay = require('../config/razorpay.config');
const { Payment } = require('../models/payment.model');
const crypto = require('crypto');
const { ApiError } = require('../utils/apiError');

const paymentService = {
    async createOrder(eventId, amount, userId, address) { // Add address parameter
        const order = await razorpay.orders.create({
            amount: amount * 100, // Amount in paisa
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            notes: { address }, // Store address in notes if needed
        });

        return order;
    },

    async verifyPayment(orderId, paymentId, signature) {
        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${orderId}|${paymentId}`)
            .digest('hex');

        if (generatedSignature !== signature) {
            throw new ApiError(400, 'Invalid payment signature');
        }

        const payment = await Payment.create({
            orderId,
            paymentId,
            signature,
            status: 'completed',
        });

        return payment;
    },

    async getPaymentHistory(userId) {
        return Payment.find({ user: userId })
            .populate('event', 'title date')
            .sort({ createdAt: -1 });
    },
};

module.exports = paymentService;
