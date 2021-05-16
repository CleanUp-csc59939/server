const profileServices = require('../services/profile.js');
const eventServices = require('../services/event.js');
const userServices = require('../services/user.js');

const getProfile = async (req, res, next) => {
  const { id } = req.params;
  try {
    const profile = await profileServices.getProfile(id);

    let data = {
      ...profile.dataValues,
    };

    let events = [];

    for (let i = 0; i < profile.events.length; i++) {
      const event = await eventServices.getEventByPk(profile.events[i]);
      events.push(event);
    }

    data.events = events;

    return res.json(data);
  } catch (error) {
    return next(error);
  }
};

const editProfile = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    if (data.email) {
      const emailTaken = await userServices.emailTaken(data.email);
      if (emailTaken) {
        delete data.email;
        const profile = await profileServices.editProfile(data, id);
        return res.json(profile);
      }
      await userServices.updateEmail(data.email, id);
    }
    const profile = await profileServices.editProfile(data, id);
    return res.json(profile);
  } catch (error) {
    return next(error);
  }
};

const editImage = async (req, res, next) => {
  const { file } = req;
  const { id } = req.params;

  try {
    const image = Buffer.from(file.buffer).toString('base64');
    const profile = await profileServices.uploadImage(`data:image/png;base64,${image}`, id);
    return res.json(profile);
  } catch (error) {
    return next(error);
  }
};

const deleteImage = async (req, res, next) => {
  const { id } = req.params;

  try {
    const profile = await profileServices.deleteProfileImage(id);
    return res.json(profile);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getProfile,
  editProfile,
  editImage,
  deleteImage,
};
