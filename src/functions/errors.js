'use strict';
//load modules

//404 Errors
const pageNotFound = () => {
  let err = new Error();
  err.name = 'Page Not Found';
  err.message = 'Sorry, you reached a Page that does not exist';
  err.status = 404;
  return err;
}

//401 Errors
const noUserFound = () => {
  let err = new Error();
  err.name = 'No User Found';
  err.message = 'Sorry, no user was found with that username';
  err.status = 401;
  return err;
}

const invalidPass = () => {
  let err = new Error();
  err.name = 'Invalid/incorrect Password';
  err.message = 'Sorry, you entered an incorrect password';
  err.status = 401;
  return err;
}

const signInError = () => {
  let err = new Error();
  err.name = 'Not sign/logged in';
  err.message = 'Sorry, you must be logged in to use this service';
  err.status = 401;
  return err;
}

//400 Errors
const userAlreadyExist = () => {
  let err = new Error();
  err.name = 'User Already Exist';
  err.message = 'Sorry, looks like that user already exist';
  err.status = 400;
  return err;
}

//Error exports
module.exports.pageNotFound = pageNotFound;
module.exports.noUserFound = noUserFound;
module.exports.invalidPass = invalidPass;
module.exports.signInError = signInError;
module.exports.userAlreadyExist = userAlreadyExist;