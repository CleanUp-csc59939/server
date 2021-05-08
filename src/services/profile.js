const cloudinary = require('cloudinary').v2;

const db = require('../database');

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

module.exports = {
  createProfile,
  getProfile,
  editProfile,
  deleteProfileImage,
  uploadImage,
};
