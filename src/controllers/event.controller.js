const eventService = require('../services/event.service');
const notificationService = require('../services/notification.service');
const catchAsync = require('../utils/catchAsync');
const { ApiError } = require('../utils/apiError');

const eventController = {
    createEvent: catchAsync(async (req, res) => {
        if (req.user.role !== 'admin') {
            throw new ApiError(403, 'Access denied. Admins only.');
        }
        const eventData = {
            ...req.body,
            organizer: req.user.id
        };

        const image = req.file;

        try {
            const event = await eventService.createEvent(eventData, image);
            res.status(201).json({
                success: true,
                data: event
            });
        } catch (error) {
            console.error('Error creating event:', error);
            throw new ApiError(500, 'Internal Server Error');
        }   
    }),

    getAllEvents: catchAsync(async (req, res) => {
        const { page = 1, limit = 10, category, search } = req.query;
        const events = await eventService.getAllEvents(page, limit, category, search);
        res.status(200).json(events);
    }),

    getEventById: catchAsync(async (req, res) => {
        const event = await eventService.getEventById(req.params.id);
        res.status(200).json(event);
    }),

    updateEvent: catchAsync(async (req, res) => {
        if (req.user.role !== 'admin') {
            throw new ApiError(403, 'Access denied. Admins only.');
        }
        const event = await eventService.updateEvent(req.params.id, req.body, req.user.id);
        res.status(200).json(event);
    }),

    deleteEvent: catchAsync(async (req, res) => {
        if (req.user.role !== 'admin') {
            throw new ApiError(403, 'Access denied. Admins only.');
        }
        await eventService.deleteEvent(req.params.id, req.user.id);
        res.status(204).send();
    })
};

module.exports = { eventController };
