// const express = require('express');
// const router = express.Router();
// const { eventController } = require('../controllers/event.controller');
// const auth = require('../middleware/auth.middleware');
// const role = require('../middleware/role.middleware'); // Import role middleware
// const upload = require('../middleware/upload.middleware');

// router.post('/', auth, role.checkAdmin, upload.single('image'), eventController.createEvent);
// router.get('/', auth, eventController.getAllEvents);
// // router.get('/', eventController.getAllEvents);
// // router.get('/:id', eventController.getEventById);
// router.get('/:id', auth, eventController.getEventById);

// router.put('/:id', auth, role.checkAdmin, eventController.updateEvent);
// router.delete('/:id', auth, role.checkAdmin, eventController.deleteEvent);

// module.exports = router;



const express = require('express');
const router = express.Router();
const { eventController } = require('../controllers/event.controller');
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const upload = require('../middleware/upload.middleware');

// Modified routes to match /api/events prefix
// router.post('/',
//     auth,  // Keep auth middleware
//     role.checkAdmin,
//     upload.single('image'),
//     eventController.createEvent
// );

router.post('/',
    auth,
    upload.single('image'),
    eventController.createEvent);


// Make this public as per test requirements
router.get('/', eventController.getAllEvents);

// Make this public as per test requirements
router.get('/:id', eventController.getEventById);

router.put('/:id',
    auth,  // Keep auth middleware
    role.checkAdmin,
    eventController.updateEvent
);

router.delete('/:id',
    auth,  // Keep auth middleware
    role.checkAdmin,
    eventController.deleteEvent
);

module.exports = router;