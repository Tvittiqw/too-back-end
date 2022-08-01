const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const timeSchema = mongoose.Schema({
  from: {
    type: String,
  },
  to: {
    type: String,
  },
});

const eventSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
  },
  timeRange: { timeSchema },
  color: {
    type: String,
  },
  breaks: {
    type: Boolean,
  },
  breakDuration: Number,
  breakPeriodicity: Number,
});

const daySchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  events: [eventSchema],
});

const scheduleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    ownerId: {
      type: String,
    },
    week: {
      type: Array,
      value: daySchema,
    },
    // todo add flag for private schedules
    // private: {
    //   type: Boolean,
    //   default: true,
    // },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
scheduleSchema.plugin(toJSON);
scheduleSchema.plugin(paginate);

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
