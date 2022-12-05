const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { todoService } = require('../services');

const createTodo = catchAsync(async (io, obj) => {
  const { user, todo } = obj;
  try {
    const newTodo = await todoService.createTodo(todo, user);

    if (!newTodo) {
      return console.log('todo is not created');
    }

    io.emit('TodoAdded', newTodo);
  } catch (e) {
    console.log('Error', e);
  }
});

const updateTodo = catchAsync(async (io, todoUpdates) => {
  const filter = {
    _id: todoUpdates.id,
  };
  try {
    const updatedTodo = await todoService.updateTodo(filter, todoUpdates);

    if (!updatedTodo) {
      return console.log('todo is not updated');
    }

    io.emit('TodoUpdated', updatedTodo);
  } catch (e) {
    console.log(e);
  }
});

const getTodos = catchAsync(async (req, res) => {
  const { user } = req;
  console.log('user',user)
    const todos = await todoService.getTodos(user.id);
    res.send(todos);
});

const getTodo = catchAsync(async (req, res) => {
  const { body } = req;
  try {
    const todos = await todoService.getTodo(body.id);
    res.send(todos);
  } catch (e) {
    console.log(e);
  }
});

const deleteTodo = catchAsync(async (io, todo) => {
  try {
    await todoService.deleteTodo(todo.id);

    io.emit('TodoDeleted', { result: 'todo has deleted' });
  } catch (e) {
    console.log(e);
  }
});

module.exports = {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
};
