//connects to a database named `dbName`
//if there is an error it will log err to console
//if success it logs a success message
//after the success msg it then attempts to seed the database
//if there is an error it will log seed error and then close the db connection
//if there is no error then it will log seed success then close the db connection

'use strict';
//load modules
const mongoose = require('mongoose');
const seeder = require('mongoose-seeder');
const { connectDatabase } = require('./functions/connection');
const data = require('./data/data.json');

//overwriting depreciated mongooose promise
mongoose.Promise = require('bluebird');

//Schemas and models
const reviewSchema = require('./schemas/reviewSchema');
const stepsSchema = require('./schemas/stepsSchema');
const courseSchema = require('./schemas/courseSchema');
const userSchema = require('./schemas/userSchema');
const review = mongoose.model('Review', reviewSchema);
const step = mongoose.model('Step', stepsSchema);
const course = mongoose.model('Course', courseSchema);
const user = mongoose.model('User', userSchema);

let dbName = 'courseRating';

connectDatabase(27017, dbName)
  .then(success => console.log(success))
  .then(() => {
    seeder.seed(data)
      .then(dbData => console.log('Database Seed Success'))
      .then(() => mongoose.connection.close())
      .catch(err => {
        console.error('Database Seed Error', err);
        mongoose.connection.close();
      })
  }).catch(err => console.error(err))