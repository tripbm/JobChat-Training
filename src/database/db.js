import mongoose from 'mongoose';
import config from '../config/index';

const obj = { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true };
const connection = mongoose.connect(`${config.database.uri}/${config.database.database_name}`, obj);

connection.then(
  db => {
    console.log('Connect DB success!');
    return db;
  },
  err => {
    if (err.message.code === 'ETIMEDOUT') {
      console.log('Attempting to re-establish database connection.');
      mongoose.connect(config.database.uri);
    } else {
      console.log('Error while attempting to connect to database:', err);
    }
  },
);

module.exports = connection;
