const { Schedule } = require('../models');

const createSchedule = async (scheduleBody, user) => {
  const scheduleObj = {
    ownerId: user._id,
    ...scheduleBody,
  };
  return Schedule.create(scheduleObj);
};

const getSchedules = async (filter, options) => {
  return Schedule.paginate(filter, options);
};

module.exports = {
  createSchedule,
  getSchedules,
};
