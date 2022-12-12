const { Activity } = require('../models');

const createActivity = async (activityBody, user) => {
  const activityObj = {
    ownerId: user._id,
    ...activityBody,
  };
  return Activity.create(activityObj);
};

module.exports = {
  createActivity,
};
