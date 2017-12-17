'use strict'
//load modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { noUserFound, invalidPass } = require('../functions/errors');

//declare review schema
const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, 'Full Name is Required']
  },
  emailAddress: {
    type: String,
    unique:true,
    required: [true, 'Email Address is Required']
  },
  password: {
    type: String,
    required: [true, 'Password is Required']
  },
})

//hasing passwords before saving individual docs
userSchema.pre('save', function (next) {
  let user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) next(err);
    user.password = hash;
    next();
  });
});

//authentication method of each model instance
userSchema.statics.authenticate = function (email, pass, callback) {
  this.findOne({ emailAddress: email })
    .exec((err, instance) => {
      if (err) return callback(err);
      if (!instance) return callback(noUserFound());
      bcrypt.compare(pass, instance.password, (err, res) => {
        if (err) return callback(err);
        if (!res) return callback(invalidPass());
        callback(null, instance);
      })
    })
}


//export Schema
module.exports = userSchema;