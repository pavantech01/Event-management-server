// const mongoose = require('mongoose');
// const { Event } = require('./src/models/event.model'); // Adjust the path if necessary
// require('dotenv').config();

// const seedEvents = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI);

//         const events = [
//             {
//                 title: 'Music Fest 2025',
//                 description: 'An exciting music festival featuring popular bands.',
//                 date: new Date('2025-06-15'),
//                 location: 'City Stadium',
//                 capacity: 5000,
//                 price: 150,
//                 category: 'Music',
//                 organizer: new mongoose.Types.ObjectId(),
//                 status: 'published'
//             },
//             {
//                 title: 'Tech Conference',
//                 description: 'A gathering of tech enthusiasts and innovators.',
//                 date: new Date('2025-05-20'),
//                 location: 'Tech Park Auditorium',
//                 capacity: 1000,
//                 price: 200,
//                 category: 'Technology',
//                 organizer: new mongoose.Types.ObjectId(),
//                 status: 'published'
//             },
//             {
//                 title: 'Art Exhibition',
//                 description: 'A showcase of contemporary art and sculptures.',
//                 date: new Date('2025-03-10'),
//                 location: 'City Art Gallery',
//                 capacity: 300,
//                 price: 30,
//                 category: 'Art',
//                 organizer: new mongoose.Types.ObjectId(),
//                 status: 'published'
//             }
//         ];

//         await Event.insertMany(events);
//         console.log('Hardcoded events added successfully.');
//         process.exit(0);
//     } catch (err) {
//         console.error('Error seeding events:', err);
//         process.exit(1);
//     }
// };

// seedEvents();
