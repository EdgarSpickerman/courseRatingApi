'use strict';
//load modules
const mongoose = require('mongoose');
const auth = require('basic-auth');
const userSchema = require('../schemas/userSchema');
const courseSchema = require('../schemas/courseSchema');
const { signInError, userAlreadyExist } = require('../functions/errors');

//authorize middleware
const authorize = (req, res, next) => {
  let credentials = auth(req);
  if (!credentials) return next(signInError());
  mongoose.model('User', userSchema).authenticate(credentials.name, credentials.pass, (err, user) => {
    if (err) next(err);
    req.user = user;
    next();
  });
}

//is unique
const postUser = (req, res, next) => {
  mongoose.model('User', userSchema).findOne({ emailAddress: req.body.emailAddress })
    .exec((err, modelInstance) => {
      if (err) return next(err);
      if (modelInstance) return next(userAlreadyExist());
      mongoose.model('User', userSchema).create(req.body, err => err ? next(err) : next());
    })
}

const getCourses = (req,res,next) => {
  mongoose.model('Course', courseSchema).find({})
    .select('_id title')
    .exec((err, models) => {
      if (err) return next(err);
      req.courses = models;
      next();
    })
}

//export authorization middleware
module.exports.authorize = authorize;
module.exports.postUser = postUser;
module.exports.getCourses = getCourses;