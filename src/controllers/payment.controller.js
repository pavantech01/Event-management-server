const paymentService = require('../services/payment.service');
const catchAsync = require('../utils/catchAsync');

const paymentController = {
    createOrder: catchAsync(async (req, res) => {
        const { eventId, amount } = req.body;
        const userId = req.user.id;
        const order = await paymentService.createOrder(eventId, amount, userId);
        res.status(201).json(order);
    }),

    verifyPayment: catchAsync(async (req, res) => {
        const { orderId, paymentId, signature } = req.body;
        const payment = await paymentService.verifyPayment(orderId, paymentId, signature);
        res.status(200).json(payment);
    }),

    getPaymentHistory: catchAsync(async (req, res) => {
        const userId = req.user.id;
        const payments = await paymentService.getPaymentHistory(userId);
        res.status(200).json(payments);
    })
};

module.exports = {paymentController};