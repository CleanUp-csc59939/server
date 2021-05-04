const Sequelize = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(`${config.db_name}`, `${config.username}`, `${config.password}`, {
  dialect: 'postgres',
  // e.g. host: '/cloudsql/my-awesome-project:us-central1:my-cloud-sql-instance'
  host: `/cloudsql/${config.SQLinstance}`,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    // e.g. socketPath: '/cloudsql/my-awesome-project:us-central1:my-cloud-sql-instance'
    // same as host string above
    socketPath: `/cloudsql/${config.SQLinstance}`,
  },
  logging: false,
  operatorsAliases: false,
});

const User = require('../models/User')(sequelize, Sequelize);
const Profile = require('../models/Profile')(sequelize, Sequelize);
const Event = require('../models/Event')(sequelize, Sequelize);

const db = { User, Profile, Event };

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
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
