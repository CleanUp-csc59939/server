const express = require('express');
const eventController = require('../controllers/event.js');
const validatorErrors = require('../middleware/validatorErrors');

const router = new express.Router();

/**
 * @module api/event
 */
router.post('/', [validatorErrors], eventController.addEvent);

router.get('/', [validatorErrors], eventController.allEvents);

router.get('/:eventID', [validatorErrors], eventController.getEvent);

router.delete('/:eventID', [validatorErrors], eventController.deleteEvent);

router.patch('/:eventID', [validatorErrors], eventController.editEvent);

module.exports = router;
