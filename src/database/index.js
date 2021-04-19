const Sequelize = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize(config.URI);

const User = require('../models/User')(sequelize, Sequelize);
const Profile = require('../models/Profile')(sequelize, Sequelize);

const db = { User, Profile };

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

Object.keys(db).forEach((name) => {
  if (db[name].associate) {
    db[name].associate(db);
    console.log(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
