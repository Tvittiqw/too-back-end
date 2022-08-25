const { Todo } = require('../models');

const createTodo = async (todoBody, user) => {
  const scheduleObj = {
    ownerId: user._id,
    ...todoBody,
  };
  return Todo.create(scheduleObj);
};

const getTodos = async (ownerId) => {
  return Todo.find({ ownerId });
};

const updateTodo = async (filter, update) => {
  return Todo.findOneAndUpdate(filter, update, {
    new: true,
  });
};

const deleteTodo = async (id) => {
  return Todo.findOneAndRemove({ _id: id }).exec();
};

const getTodo = async (id) => {
  return Todo.findById(id);
};

module.exports = {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
};
