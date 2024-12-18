const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const scheduleValidation = require('../../validations/schedule.validation');
const scheduleController = require('../../controllers/schedule.controller');

const router = express.Router({ mergeParams: true });

router
.route('/')
.post(auth(), validate(scheduleValidation.createSchedule), scheduleController.createSchedule)
.get(auth(), validate(scheduleValidation.getSchedules), scheduleController.getSchedules);

router
.route('/element/:scheduleId')
.get(auth(), validate(scheduleValidation.getSchedule), scheduleController.getSchedule)
.patch(auth(), validate(scheduleValidation.updateSchedule), scheduleController.updateSchedule)
.delete(auth(), validate(scheduleValidation.deleteSchedule), scheduleController.deleteSchedule);

router
.route('/usersSchedules')
.get(auth(), validate(scheduleValidation.getUsersSchedules), scheduleController.getUsersSchedules);

module.exports = router;
