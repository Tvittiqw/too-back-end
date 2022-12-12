const Joi = require('joi');

const createActivity = {
  body: Joi.object().keys({
    scheduleId: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    color: Joi.string().required(),
    daysIds: Joi.array().items(Joi.number()),
  }),
};

module.exports = {
  createActivity,
};
