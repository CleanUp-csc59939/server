const cloudinary = require('cloudinary').v2;

const db = require('../database');
const profileServices = require('./profile.js');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const addEvent = async (data) => {
  const profile = await profileServices.getProfile(data.userID);
  const event = await db.Event.create({
    ...data,
    registered: [profile],
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
  const profile = await profileServices.getProfile(userID);
  const event = await getEventByPk(eventID);
  let registered_users = event.registered;

  for (let i = 0; i < registered_users.length; i++) {
    if (registered_users[i].userID === parseInt(userID)) return false;
  }

  registered_users.push(profile);

  await db.Event.update(
    {
      amount: ++event.amount,
      registered: registered_users,
    },

    { returning: true, where: { id: eventID } },
  );

  return true;
};

const unregisterUserFromEvent = async (userID, eventID) => {
  const event = await getEventByPk(eventID);
  let registered_users = event.registered;
  let users = [];

  let found = false;

  for (let i = 0; i < registered_users.length; i++) {
    if (registered_users[i].userID !== parseInt(userID)) {
      users.push(registered_users[i]);
    } else {
      found = true;
    }
  }

  if (!found) return false;

  await db.Event.update(
    {
      amount: --event.amount,
      registered: users,
    },

    { returning: true, where: { id: eventID } },
  );

  return true;
};

const addImage = async (id, image) => {
  const event = await getEventByPk(id);
  const result = cloudinary.uploader
    .upload(image)
    .then(async (result) => {
      await db.Event.update(
        {
          img: [...event.img, result.url],
        },
        { where: { id } },
      );

      return true;
    })
    .catch(() => false);

  return result;
};

module.exports = {
  addEvent,
  allEvents,
  getEventByPk,
  deleteEvent,
  editEvent,
  registerUserForEvent,
  unregisterUserFromEvent,
  addImage,
};
