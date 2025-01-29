
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyDFAzevrqO4mMCSTGUKHn0NpNZjwOHR3gY",
//     authDomain: "event-management-145.firebaseapp.com",
//     projectId: "event-management-145",
//     storageBucket: "event-management-145.firebasestorage.app",
//     messagingSenderId: "987630137437",
//     appId: "1:987630137437:web:b97d46f8cd006bba225db4",
//     measurementId: "G-KL8M256K0L"
//   };

require('dotenv').config(); // Load environment variables
const app = require('./src/app'); // Import the app instance
const connectDB = require('./src/config/db.config'); // Database connection setup
const initializeFirebase = require('./src/config/firebase.config'); // Firebase setup

// Initialize Firebase Admin
initializeFirebase();

// Connect to MongoDB
connectDB().then(() => {
    console.log('Connected to MongoDB successfully.');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process if DB connection fails
});

// Start the Server
const PORT = process.env.PORT || 5000 || process.env.REACT_APP_API_URL;
const server = app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});

// Graceful Shutdown for Process Termination
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});
