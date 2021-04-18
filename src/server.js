const express = require('express');
const cors = require('cors');
const body = require('body-parser');

const app = express();

const server = require('http').createServer(app);
const routes = require('./routes/index');
const db = require('./database');

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(body.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  next();
});

app.use('/api', routes);

/**
 * Switch to true to drop all tables
 * Afterwards switch back to false
 */
db.sequelize.sync({ force: false });

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

module.exports = app;
