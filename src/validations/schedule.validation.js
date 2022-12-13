const Joi = require('joi');

const scheduleEvent = Joi.object().keys({
  name: Joi.string(),
  description: Joi.string(),
  type: Joi.string(),
  timeRange: Joi.object().keys({ from: Joi.string(), to: Joi.string() }),
  color: Joi.string().regex(/^#[A-Fa-f0-9]{6}$/),
  breaks: Joi.bool(),
  breakDuration: Joi.number(),
  breakPeriodicity: Joi.number(),
});

const scheduleDay = Joi.array().items(scheduleEvent);

const createSchedule = {
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    isPrivate: Joi.boolean().required(),
  }),
};

const getSchedules = {
  params: Joi.object().keys({
    limit: Joi.number(),
    page: Joi.number(),
  }),
};

const getUsersSchedules = {
  params: Joi.object().keys({
    limit: Joi.number(),
    page: Joi.number(),
  }),
};

const getSchedule = {
  body: Joi.object().keys({}),
};

const updateSchedule = {
  params: Joi.object().keys({
    scheduleId: Joi.string(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
  }),
};

const deleteSchedule = {
  params: Joi.object().keys({
    scheduleId: Joi.string(),
  }),
};

module.exports = {
  createSchedule,
  getSchedules,
  getSchedule,
  updateSchedule,
  deleteSchedule,
  getUsersSchedules,
};
