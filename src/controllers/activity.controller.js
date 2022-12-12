const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { activityService, scheduleService } = require('../services');
const { Schedule } = require('../models');

const createActivity = catchAsync(async (req, res) => {
  const { user, body } = req;
  const { scheduleId } = body;

  try {
    const schedule = await Schedule.findById(scheduleId);

    if (!schedule) {
      res.status(httpStatus.NOT_FOUND).send('schedule is no found');
      return;
    }

    const activity = await activityService.createActivity(body, user);
    const updatedSchedule = await scheduleService.addActivity(scheduleId, activity);
    res.status(httpStatus.CREATED).send({ activity, updatedSchedule });
  } catch (e) {
    console.log(e);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
  }
});

module.exports = {
  createActivity,
};
