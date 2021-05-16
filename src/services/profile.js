const cloudinary = require('cloudinary').v2;

const db = require('../database');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const createProfile = async (userID, email) => {
  const profile = await db.Profile.create({ userID, email });
  return profile;
};

const getProfile = async (userID) => {
  const profile = await db.Profile.findByPk(userID);
  return profile;
};

const editProfile = async (data, userID) => {
  const profile = await db.Profile.update(
    {
      ...data,
    },

    { returning: true, where: { userID } },
  );

  return profile[1][0];
};

const deleteProfileImage = async (userID) => {
  const profile = await db.Profile.update(
    {
      img: null,
    },
    { returning: true, where: { userID } },
  );
  return profile[1][0];
};

const uploadImage = async (img, userID) => {
  cloudinary.uploader
    .upload(img)
    .then(async (result) => {
      const profile = await db.Profile.update(
        {
          img: result.url,
        },
        { returning: true, where: { userID } },
      );

      return profile;
    })
    .catch((error) => error);
};

const addEvent = async (userID, eventID) => {
  const profile = await getProfile(userID);
  await db.Profile.update(
    {
      events: [...profile.events, eventID],
    },
    { where: { userID } },
  );

  return profile;
};

const removeEvent = async (userID, eventID) => {
  const profile = await getProfile(userID);

  let updated_events = [];

  for (let i = 0; i < profile.events.length; i++) {
    if (profile.events[i] !== eventID) {
      updated_events.push(profile.events[i]);
    }
  }

  await db.Profile.update(
    {
      events: updated_events,
    },
    { where: { userID } },
  );

  return profile;
};

module.exports = {
  createProfile,
  getProfile,
  editProfile,
  deleteProfileImage,
  uploadImage,
  addEvent,
  removeEvent,
};
