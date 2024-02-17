var mongoose = require('mongoose');
const config = require('config');
const dbConfig = config.get('dbConfig');

function init() {
  const databaseUrl = `mongodb+srv://${dbConfig.name}:${dbConfig.password}@${dbConfig.host}/${dbConfig.dbname}?retryWrites=true&w=majority`;
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
