'use strict';
//load modules
const mongoose = require('mongoose');
const auth = require('basic-auth');
const userSchema = require('../schemas/userSchema');
const courseSchema = require('../schemas/courseSchema');
const reviewSchema = require('../schemas/reviewSchema');

const user = mongoose.model('User', userSchema);
const course = mongoose.model('Course', courseSchema);
const review = mongoose.model('Review', reviewSchema);

const { signInError, userAlreadyExist, noCourseFound } = require('../functions/errors');

//authorize middleware
const authorize = (req, res, next) => {
  let credentials = auth(req);
  if (!credentials) return next(signInError());
  user.authenticate(credentials.name, credentials.pass, (err, user) => {
    if (err) next(err);
    req.user = user;
    next();
  });
}

//is unique
const postUser = (req, res, next) => {
  user.findOne({ emailAddress: req.body.emailAddress })
    .exec((err, modelInstance) => {
      if (err) return next(err);
      if (modelInstance) return next(userAlreadyExist());
      user.create(req.body, err => err ? next(err) : next());
    })
}

const postCourse = (req, res, next) => {
  course.create(req.body, err => err ? next(err) : next());
}

const getCourses = (req,res,next) => {
  course.find({})
    .select('_id title')
    .exec((err, models) => {
      if (err) return next(err);
      req.courses = models;
      next();
    })
}

const getCourse = (req, res, next) => {
  let userPop = { path: 'user', model: 'User', select: '_id fullName' };
  course.findOne({ _id: req.params.courseId })
    .populate([userPop, { path: 'reviews', model: 'Review', populate: userPop }])
    .exec((err, instance) => {
      if (err) return next(err);
      if (!instance) return next(noCourseFound());
      req.course = instance;
      next();
    });
}

const updateCourse = (req, res, next) => {
  req.body._id = req.params.courseId;
  for (let prop in req.body) { req.course[prop] = req.body[prop]; }
  req.course.save((err, course) => err ? next(err) : next());
}

const updateReview = (req, res, next) => {
  req.body.user = req.user._id;
  review.create(req.body, (err, review) => {
    if (err) next(err);
    req.course.reviews.push(review._id);
    req.course.save((err, course) => err ? next(err) : next())
  })
}


//export authorization middleware
module.exports.authorize = authorize;
module.exports.postUser = postUser;
module.exports.postCourse = postCourse;
module.exports.updateCourse = updateCourse;
module.exports.updateReview = updateReview;
module.exports.getCourses = getCourses;
module.exports.getCourse = getCourse;