const express = require('express');

const profileController = require('../controllers/profile.js');
const imageMiddleware = require('../middleware/image.js');
const validatorErrors = require('../middleware/validatorErrors');

const router = new express.Router();

/**
 * @module api/profile
 */

router.get('/:id', [validatorErrors], profileController.getProfile);

router.patch('/:id', [validatorErrors], profileController.editProfile);

router.patch('/:id/img', [imageMiddleware.upload.single('file'), validatorErrors], profileController.editImage);

router.delete('/:id/img', [validatorErrors], profileController.deleteImage);

module.exports = router;
