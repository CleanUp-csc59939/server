const db = require('../database');

const createProfile = async (userID, email) => {
  const profile = await db.Profile.create({ userID, email });
  return profile;
};

const getProfile = async (userID) => {
  const profile = await db.Profile.findOne({ where: { userID } });
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
  return profile;
};

module.exports = {
  createProfile,
  getProfile,
  editProfile,
  deleteProfileImage,
};
