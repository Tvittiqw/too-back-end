const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const colorValidator = (v) => (/^#([0-9a-f]{3}){1,2}$/i).test(v); //todo refactot

const timeSchema = mongoose.Schema({
  from: {
    type: String,
  },
  to: {
    type: String,
  },
});

const activitySchema = mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  timeRange: { timeSchema },
  color: {
    type: String,
    validator: [colorValidator, 'Invalid color'],
  },
  daysIds: [{ type: Number }],

  // todo for future maybe
  // type: {
  //   type: String,
  // },
  // activityType: {},
  // breaks: {
  //   type: Boolean,
  // },
  // breakDuration: Number,
  // breakPeriodicity: Number,
});

activitySchema.plugin(toJSON);
activitySchema.plugin(paginate);

const Schedule = mongoose.model('Activity', activitySchema);

module.exports = Schedule;
