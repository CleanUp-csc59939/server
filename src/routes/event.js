const express = require('express');
const eventController = require('../controllers/event.js');
const validatorErrors = require('../middleware/validatorErrors');
const imageMiddleware = require('../middleware/image.js');

const router = new express.Router();

/**
 * @module api/event
 */
router.post('/', [validatorErrors], eventController.addEvent);

router.get('/', [validatorErrors], eventController.allEvents);

router.get('/:eventID', [validatorErrors], eventController.getEvent);

router.delete('/:eventID', [validatorErrors], eventController.deleteEvent);

router.patch('/:eventID', [validatorErrors], eventController.editEvent);

router.patch('/:eventID/register', [validatorErrors], eventController.registerUser);

router.patch('/:eventID/unregister', [validatorErrors], eventController.unregisterUser);

router.patch(
  '/:eventID/addimage',
  [imageMiddleware.upload.single('file'), validatorErrors],
  eventController.uploadImage,
);

module.exports = router;
