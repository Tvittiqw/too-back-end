const httpStatus = require('http-status');
const { Schedule, User, Activity } = require('../models');
const ApiError = require('../utils/ApiError');

const createSchedule = async (scheduleBody, user) => {
  const owner = await User.findById(user._id);

  const scheduleObj = {
    owner,
    ...scheduleBody,
  };
  return Schedule.create(scheduleObj);
};

const getSchedules = async (filter, options) => {
  return Schedule.paginate(filter, options);
};

const updateSchedule = async (scheduleId, scheduleBody) => {
  const updatedSchedule = await Schedule.findOneAndUpdate(
    { _id: scheduleId }, { ...scheduleBody }, { new: true, useFindAndModify: true },
  );
  if (!updatedSchedule) {
    throw new ApiError(httpStatus.NOT_FOUND, 'schedule does not exist');
  }
  return updatedSchedule;
};

const addActivity = async (scheduleId, activity) => {
  const schedule = await Schedule.findById(scheduleId);

  schedule.scheduleParts.push(activity);
  return schedule.save();
};

const deleteSchedule = async (scheduleId) => {
  const schedule = await Schedule.findById(scheduleId);
  if (!schedule) {
    throw new ApiError(httpStatus.NOT_FOUND, 'schedule does not exist');
  }
  await Activity.deleteMany({ _id: { $in: schedule.scheduleParts } });
  return schedule.remove();
};

module.exports = {
  createSchedule,
  getSchedules,
  updateSchedule,
  deleteSchedule,
  addActivity,
};
