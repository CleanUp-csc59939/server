const Sequelize = require('sequelize');
const config = require('../config/config.json');
const User = require('../models/User');

const sequelize = new Sequelize(config.URI);
const db = {};
const models = [User];

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

models.forEach((model) => {
  model(sequelize, Sequelize);
  db[model] = model;
});

Object.keys(db).forEach((name) => {
  if (db[name].associate) {
    db[name].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
