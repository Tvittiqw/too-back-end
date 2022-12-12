const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const activityValidation = require('../../validations/activity.validation');
const activityController = require('../../controllers/activity.controller');

const router = express.Router();

router
.route('/')
.post(auth(), validate(activityValidation.createActivity), activityController.createActivity);

module.exports = router;
