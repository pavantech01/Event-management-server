const authService = require('../services/auth.service');
const eventService = require('../services/event.service');
const paymentService = require('../services/payment.service')
const admin = require('firebase-admin');

const notificationService = {
    async notifyNewEvent(event) {
        const message = {
            notification: {
                title: 'New Event Created',
                body: `Check out the new event: ${event.title}`
            },
            topic: 'events'
        };

        try {
            await admin.messaging().send(message);
        } catch (error) {
            console.error('Error sending notification:', error);
        }
    },

    async notifyEventUpdate(event) {
        const message = {
            notification: {
                title: 'Event Updated',
                body: `Event "${event.title}" has been updated`
            },
            topic: `event_${event._id}`
        };

        try {
            await admin.messaging().send(message);
        } catch (error) {
            console.error('Error sending notification:', error);
        }
    }
};

module.exports = {notificationService};