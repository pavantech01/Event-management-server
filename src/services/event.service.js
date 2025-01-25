const { Event } = require('../models/event.model');
const cloudinary = require('../config/cloudinary.config');
const { ApiError } = require('../utils/apiError');

const eventService = {
    async createEvent(eventData, image, userId) {
        let imageUrl;

        if (image) {
            try {
                const base64Image = image.buffer.toString('base64');
                const result = await cloudinary.uploader.upload(
                    `data:${image.mimetype};base64,${base64Image}`,
                    {
                        folder: 'events',
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
            const event = await Event.create({
                ...eventData,
                image: imageDetails, // Save the image URL in the database
                organizer: userId,      // Associate the event with the user ID
            });
            return event;
        } catch (error) {
            console.error('Error creating event:', error);
            throw new ApiError(500, 'Event creation failed');
        }
    },

    async getAllEvents(page, limit, category, search) {
        const query = {};
        if (category) query.category = category;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        try {
            const events = await Event.find(query)
                .populate('organizer', 'name email')
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit);

            const total = await Event.countDocuments(query);

            return {
                events,
                total,
                pages: Math.ceil(total / limit)
            };
        } catch (error) {
            console.error('Error retrieving events:', error);
            throw new ApiError(500, 'Failed to retrieve events');
        }
    },

    async getEventById(eventId) {
        const event = await Event.findById(eventId)
            .populate('organizer', 'name email')
            .populate('attendees', 'name email');

        if (!event) {
            throw new ApiError(404, 'Event not found');
        }

        return event;
    },

    async updateEvent(eventId, updateData, userId) {
        const event = await Event.findOne({ _id: eventId, organizer: userId });
        if (!event) {
            throw new ApiError(404, 'Event not found or unauthorized');
        }

        Object.assign(event, updateData);
        await event.save();
        return event;
    },

    async deleteEvent(eventId, userId) {
        const event = await Event.findOneAndDelete({ _id: eventId, organizer: userId });
        if (!event) {
            throw new ApiError(404, 'Event not found or unauthorized');
        }
    }
};

module.exports = eventService;
