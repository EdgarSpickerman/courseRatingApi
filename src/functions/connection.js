'use strict';
//load modules
const mongoose = require('mongoose');

//overwriting deprecated mongoose promise
mongoose.Promise = require('bluebird');

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

//export
module.exports.connectDatabase = connectDatabase;
