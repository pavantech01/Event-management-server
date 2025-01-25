require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const { Event } = require('../models/event.model');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

describe('Event Management', () => {
    let testEventId;
    let adminToken;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI);
        
        // Create admin token
        const adminUser = {
            id: new mongoose.Types.ObjectId(),
            role: 'admin'
        };
        adminToken = jwt.sign(adminUser, process.env.JWT_SECRET || 'JWT_SECRET_KEY');
    });

    beforeEach(async () => {
        // Create a test event before each test
        const testEvent = await Event.create({
            title: 'Test Event',
            description: 'Test Description',
            date: new Date(),
            location: 'Test Location',
            capacity: 100,
            price: 50,
            category: 'Test Category',
            organizer: new mongoose.Types.ObjectId(),
            status: 'published'
        });
        testEventId = testEvent._id;
    });

    afterEach(async () => {
        await Event.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create a new event (admin)', async () => {
        const response = await request(app)
            .post('/api/events')  // Updated path
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                title: 'Test Event',
                description: 'This is a test event.',
                date: new Date(),
                location: 'Test Location',
                capacity: 100,
                price: 50,
                category: 'Test Category'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('title', 'Test Event');
    });

    it('should get all events (guest)', async () => {
        const response = await request(app)
            .get('/api/events');  // Updated path
        
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.events)).toBe(true);
    });

    it('should get a specific event by ID', async () => {
        const response = await request(app)
            .get(`/api/events/${testEventId}`);  // Updated path

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title');
    });

    it('should update an event (admin)', async () => {
        const response = await request(app)
            .put(`/api/events/${testEventId}`)  // Updated path
            .set('Authorization', `Bearer ${adminToken}`)
            .send({ title: 'Updated Event Title' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title', 'Updated Event Title');
    });

    it('should delete an event (admin)', async () => {
        const response = await request(app)
            .delete(`/api/events/${testEventId}`)  // Updated path
            .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(204);
    });
});