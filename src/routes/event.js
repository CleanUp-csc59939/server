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

module.exports = router;
