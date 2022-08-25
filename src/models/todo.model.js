const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const todoSchema = mongoose.Schema(
  {
    text: {
      type: String,
      trim: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    ownerId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
todoSchema.plugin(toJSON);
todoSchema.plugin(paginate);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
