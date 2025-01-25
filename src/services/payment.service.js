const razorpay = require('../config/razorpay.config');
const { Payment } = require('../models/payment.model');
const { Event } = require('../models/event.model');
const { ApiError } = require('../utils/apiError');

const paymentService = {
    async createOrder(eventId, amount, userId) {
        const event = await Event.findById(eventId);
        if (!event) {
            throw new ApiError(404, 'Event not found');
        }

        const order = await razorpay.orders.create({
            amount: amount * 100, // Convert to paisa
            currency: 'INR',
            receipt: `receipt_${Date.now()}`
        });

        return order;
    },

    async verifyPayment(orderId, paymentId, signature) {
        const crypto = require('crypto');
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
            status: 'completed'
        });

        return payment;
    },

    async getPaymentHistory(userId) {
        return Payment.find({ user: userId })
            .populate('event', 'title date')
            .sort({ createdAt: -1 });
    }
};
