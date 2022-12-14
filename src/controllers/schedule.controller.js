const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { scheduleService } = require('../services');

const createSchedule = catchAsync(async (req, res) => {
  const { user, body } = req;
  try {
    const schedule = await scheduleService.createSchedule(body, user);
    res.status(httpStatus.CREATED).send(schedule);
  } catch (e) {
    console.log(e);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
  }
});

const getSchedules = catchAsync(async (req, res) => {
  try {
    const filter = pick(req.query, ['filer']); //todo add filters
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    filter.isPrivate = false; //find only not private schdeules
    filter.owner = { $nin: req.user._id }; //except users items
    const schedules = await scheduleService.getSchedules(filter, options);
    res.status(httpStatus.OK).send(schedules);
  } catch (e) {
    console.log(e);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
  }
});

const getUsersSchedules = catchAsync(async (req, res) => {
  try {
    const { user } = req;
    const filter = pick(req.query, ['filer']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    filter.owner = user._id;
    const schedules = await scheduleService.getSchedules(filter, options);
    res.status(httpStatus.OK).send(schedules);
  } catch (e) {
    console.log(e);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
  }
});

const getSchedule = catchAsync(async (req, res) => {

});

const updateSchedule = catchAsync(async (req, res) => {
  try {
    const { scheduleId } = req.params;
    const updatedSchedule = await scheduleService.updateSchedule(scheduleId, req.body);
    res.send(updatedSchedule);
  } catch (e) {
    console.log(e);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
  }
});

const deleteSchedule = catchAsync(async (req, res) => {
  try {
    const { scheduleId } = req.params;
    await scheduleService.deleteSchedule(scheduleId);
    res.status(httpStatus.OK).send();
  } catch (e) {
    console.log(e);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
  }
});

module.exports = {
  createSchedule,
  getSchedules,
  getSchedule,
  updateSchedule,
  deleteSchedule,
  getUsersSchedules,
};
