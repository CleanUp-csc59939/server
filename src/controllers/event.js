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

const editEvent = async (req, res, next) => {
  const { eventID } = req.params;
  const data = req.body;

  try {
    const event = await eventServices.editEvent(data, eventID);
    return res.json(event);
  } catch (error) {
    return next(error);
  }
};

const registerUser = async (req, res, next) => {
  const { eventID } = req.params;
  const { userID } = req.body;

  try {
    const added = await eventServices.registerUserForEvent(userID, eventID);
    if (added) {
      return res.json({
        success: true,
      });
    }
    return res.json({
      success: false,
    });
  } catch (error) {
    return next(error);
  }
};

const unregisterUser = async (req, res, next) => {
  const { eventID } = req.params;
  const { userID } = req.body;

  try {
    const removed = await eventServices.unregisterUserFromEvent(userID, eventID);
    if (removed) {
      return res.json({
        success: true,
      });
    }
    return res.json({
      success: false,
    });
  } catch (error) {
    return next(error);
  }
};

const uploadImage = async (req, res, next) => {
  const { eventID } = req.params;
  const { file } = req;

  try {
    const image = Buffer.from(file.buffer).toString('base64');
    const result = await eventServices.addImage(eventID, `data:image/png;base64,${image}`);
    console.log(result);
    return res.json({
      success: result,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  addEvent,
  allEvents,
  getEvent,
  deleteEvent,
  editEvent,
  registerUser,
  unregisterUser,
  uploadImage,
};
