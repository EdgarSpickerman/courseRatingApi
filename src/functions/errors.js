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

//Error exports
module.exports.pageNotFound = pageNotFound;
module.exports.noUserFound = noUserFound;
module.exports.invalidPass = invalidPass;