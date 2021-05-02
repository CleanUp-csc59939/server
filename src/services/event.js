const db = require('../database');

const addEvent = async (data) => {
  const event = await db.Event.create({
    ...data,
  });
  return event;
};

module.exports = {
  addEvent,
};
