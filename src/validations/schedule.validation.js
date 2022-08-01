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
const scheduleWeek = Joi.array().items(scheduleDay); // length(6)

const createSchedule = {
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    week: scheduleWeek,
  }),
};

const getSchedules = {
  params: Joi.object().keys({
    limit: Joi.number(),
    page: Joi.number(),
  }),
};

const getSchedule = {
  body: Joi.object().keys({}),
};

const updateSchedule = {
  body: Joi.object().keys({}),
};

const deleteSchedule = {
  body: Joi.object().keys({}),
};

module.exports = {
  createSchedule,
  getSchedules,
  getSchedule,
  updateSchedule,
  deleteSchedule,
};
