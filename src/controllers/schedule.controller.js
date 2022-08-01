const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { scheduleService } = require('../services');

const createSchedule = catchAsync(async (req, res) => {
  const { user, body } = req;
  try {
    const schedule = await scheduleService.createSchedule(body, user);
    res.status(httpStatus.CREATED).send(schedule);
  } catch (e) {
    console.log(e);
  }
});

const getSchedules = catchAsync(async (req, res) => {
  try {
    const filter = pick(req.query, ['filer']); //todo add filters
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const schedules = await scheduleService.getSchedules(filter, options);
    res.send(schedules);
  } catch (e) {
    console.log(e);
  }
});

const getSchedule = catchAsync(async (req, res) => {

});

const updateSchedule = catchAsync(async (req, res) => {

});

const deleteSchedule = catchAsync(async (req, res) => {

});

module.exports = {
  createSchedule,
  getSchedules,
  getSchedule,
  updateSchedule,
  deleteSchedule,
};
