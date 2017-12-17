'use strict';
//load modules
const mongoose = require('mongoose');
const { connectDatabase, seedDB } = require('./functions/connection');

//overwriting depreciated mongooose promise
mongoose.Promise = require('bluebird');

/*
connects to a database named `dbName`
  if there is an error it will log err to console
  if success it logs a success message
    after the success msg it then attempts to seed the database
      if there is an error it will log seed error and then close the db connection
      if there is no error then it will log seed success then close the db connection
*/
let dbName = 'courseRating';

connectDatabase(27017, dbName)
  .then(success => console.log(success))
  .then(() => {
    seedDB()
      .then(success => console.log(success))
      .then(() => mongoose.connection.close())
      .catch(err => {
        console.error(err);
        mongoose.connection.close();
      })
  }).catch(err => console.error(err))