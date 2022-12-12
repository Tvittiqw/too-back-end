const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const scheduleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    iconLink: {
      type: String,
      trim: true,
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    scheduleParts: [{
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Activity',
    }],
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
