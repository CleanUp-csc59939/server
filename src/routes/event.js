const express = require('express');
const eventController = require('../controllers/event.js');
const validatorErrors = require('../middleware/validatorErrors');

const router = new express.Router();

/**
 * @module api/event
 */
router.post('/', [validatorErrors], eventController.addEvent);

module.exports = router;
