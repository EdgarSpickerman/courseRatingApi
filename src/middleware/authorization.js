'use strict';
//load modules
const mongoose = require('mongoose');
const auth = require('basic-auth');
const { signInError } = require('../functions/errors');

//authorize middleware
const authorize = (req, res, next) => {
  let credentials = auth(req);
  if (!credentials) return next(signInError());
  mongoose.model('User').authenticate(email, pass, (err, user) => {
    if (err) next(err);
    req.user = user;
    next();
  });
}

//export authorization middleware
module.exports.authorize = authorize;