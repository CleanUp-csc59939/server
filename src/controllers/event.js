const eventServices = require('../services/event.js');

const addEvent = async (req, res, next) => {
  const data = req.body;

  try {
    const event = await eventServices.addEvent(data);
    return res.json(event);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  addEvent,
};
