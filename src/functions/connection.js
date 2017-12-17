'use strict';
//load modules
const mongoose = require('mongoose');
const seeder = require('mongoose-seeder');
const data = require('../data/data.json');

//overwriting deprecated mongoose promise
mongoose.Promise = require('bluebird');

//Schemas
const reviewSchema = require('../schemas/reviewSchema');
const stepsSchema = require('../schemas/stepsSchema');
const courseSchema = require('../schemas/courseSchema');
const userSchema = require('../schemas/userSchema');

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
    const review = mongoose.model('Review', reviewSchema);
    const step = mongoose.model('Step', stepsSchema);
    const course = mongoose.model('Course', courseSchema);
    const user = mongoose.model('User', userSchema);
    seeder.seed(data)
      .then(dbData=>resolve('Database Seed Success'))
      .catch(err => reject('Database Seed Error' + err))
  });
}

//export
module.exports.connectDatabase = connectDatabase;
module.exports.seedDB = seedDB;
