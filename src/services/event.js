const db = require('../database');

const addEvent = async (data) => {
  const event = await db.Event.create({
    ...data,
  });
  return event;
};

const allEvents = async () => {
  const events = await db.Event.findAll();
  return events;
};

module.exports = {
  addEvent,
  allEvents,
};
