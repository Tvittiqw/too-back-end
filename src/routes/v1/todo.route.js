const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const todoValidation = require('../../validations/todo.validation');
const { todoController } = require('../../controllers');

const router = express.Router();

router
.route('/')
.post(auth(), validate(todoValidation.createTodo), todoController.createTodo)
.get(auth(), validate(todoValidation.getTodos), todoController.getTodos);

// todo
router
.route('/:todoId')
.get(auth(), validate(todoValidation.getTodo), todoController.getTodo)
.patch(auth(), validate(todoValidation.updateTodo), todoController.updateTodo)
.delete(auth(), todoController.deleteTodo);

module.exports = router;
