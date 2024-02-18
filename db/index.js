var mongoose = require('mongoose');
const config = require('config');
const dbConfig = config.get('dbConfig');

function init() {
  const databaseUrl = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
  mongoose.connect(databaseUrl, { });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Connection error:'));
  db.once('open', () => {
    console.log("Connected to the database");
  });
}

function close() {
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Database connection closed');
      process.exit(0);
    });
  });
}

module.exports= {
  init: init,
  close: close
};
