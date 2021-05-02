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

const allEvents = async (req, res, next) => {
  try {
    const events = await eventServices.allEvents();
    return res.json(events);
  } catch (error) {
    return next(error);
  }
};

const getEvent = async (req, res, next) => {
  const { eventID } = req.params;

  try {
    const event = await eventServices.getEventByPk(eventID);
    return res.json(event);
  } catch (error) {
    return next(error);
  }
};

const deleteEvent = async (req, res, next) => {
  const { eventID } = req.params;
  try {
    await eventServices.deleteEvent(eventID);
    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  addEvent,
  allEvents,
  getEvent,
  deleteEvent,
};
