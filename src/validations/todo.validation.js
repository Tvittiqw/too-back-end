const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTodo = {
  body: Joi.object().keys({
    text: Joi.string().required(),
  }),
};

const updateTodo = {
  body: Joi.object().keys({
    text: Joi.string().required(),
    checked: Joi.boolean(),
  }),
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const getTodos = {

};

const getTodo = {

}

module.exports = {
  createTodo,
  updateTodo,
  getTodos,
  getTodo,
};
