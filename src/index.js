const mongoose = require('mongoose');
const { Server } = require('socket.io');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const { todoController } = require('./controllers');

const server = require('http').createServer(app);

const io = new Server(server);

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
  server.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

// socket.io connection
io.on('connection', (socket) => {
  console.log('Connected to Socket!!' + socket.id);
  // Receiving Todos from client
  socket.on('addTodo', (todo) => {
    console.log('socketData: ' + JSON.stringify(todo));
    todoController.createTodo(io, todo);
  });
// Receiving Updated Todo from client
  socket.on('updateTodo', (todo) => {
    console.log('socketData: ' + JSON.stringify(todo));
    todoController.updateTodo(io, todo);
  });
// Receiving Todo to Delete
  socket.on('deleteTodo', (todo) => {
    console.log('socketData: ' + JSON.stringify(todo));
    todoController.deleteTodo(io, todo);
  });
});

// handle errors and rejections
// prevent server stop if error
process.on('uncaughtException', (error, origin) => {
  console.log('----- Uncaught exception -----');
  console.log(error);
  console.log('----- Exception origin -----');
  console.log(origin);
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('----- Unhandled Rejection at -----');
  console.log(promise);
  console.log('----- Reason -----');
  console.log(reason);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
