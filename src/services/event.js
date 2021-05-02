const db = require('../database');

const addEvent = async (data) => {
  const event = await db.Event.create({
    ...data,
  });
  return event;
};

const allEvents = async () => {
  const events = await db.Event.findAll();
  console.log(events);
  return events;
};

const getEventByPk = async (id) => {
  const event = await db.Event.findByPk(id);
  return event;
};

module.exports = {
  addEvent,
  allEvents,
  getEventByPk,
};
