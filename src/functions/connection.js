'use strict';
//load modules
const mongoose = require('mongoose');
const seeder = require('mongoose-seeder');
const data = require('../data/data.json');

//functions
const connectDatabase = (port, dbName, opts) => {

  if (!opts) opts = { options: { useMongoClient: true } };

  return new Promise((resolve, reject) => {
    let conn;
    if (!opts.create) {
      conn = mongoose.connect(`mongodb://localhost:${port}/${dbName}`, opts.options);
      conn.then(db => resolve('Database Connection Success'))
        .catch(err => reject('Database Connection Error' + err))
    } else {
      conn = mongoose.createConnection(`mongodb://localhost:${port}/${dbName}`, opts.options);
      conn.then(db => resolve('Database Connection Success'))
        .catch(err => reject('Database Connection Error' + err))
    }
  });
}

const seedDB = () => {
  return new Promise((resolve, reject) => {
    seeder.seed(data)
      .then(dbData=>resolve('Database Seed Success'))
      .catch(err => reject('Database Seed Error' + err))
  });
}
//export
module.exports.connectDatabase = connectDatabase;
module.exports.seedDB = seedDB;
