const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const scheduleValidation = require('../../validations/schedule.validation');
const userController = require('../../controllers/schedule.controller');

const router = express.Router();

router
.route('/')
.post(auth(), validate(scheduleValidation.createSchedule), userController.createSchedule)
.get(auth(), validate(scheduleValidation.getSchedules), userController.getSchedules);

// todo
// router
// .route('/:scheduleId')
// .get(auth(), validate(scheduleValidation.getSchedule), userController.getSchedule)
// .patch(auth(), validate(scheduleValidation.updateSchedule), userController.updateSchedule)
// .delete(auth(), validate(scheduleValidation.deleteSchedule), userController.deleteSchedule);

module.exports = router;
