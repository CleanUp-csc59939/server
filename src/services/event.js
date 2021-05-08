const db = require('../database');
const profileServices = require('./profile.js');

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

const deleteEvent = async (id) => {
  const event = await db.Event.findByPk(id);
  await event.destroy();
};

const editEvent = async (data, id) => {
  const event = await db.Event.update(
    {
      ...data,
    },

    { returning: true, where: { id } },
  );

  return event[1][0];
};

const registerUserForEvent = async (userID, eventID) => {
  const profile = profileServices.getProfile(userID);
  console.log(profile, eventID);
};

module.exports = {
  addEvent,
  allEvents,
  getEventByPk,
  deleteEvent,
  editEvent,
  registerUserForEvent,
};
