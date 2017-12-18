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
const courseSchema = require('./schemas/courseSchema');
const userSchema = require('./schemas/userSchema');
const review = mongoose.model('Review', reviewSchema);
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