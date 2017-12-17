'use strict';
//load modules

const pageNotFound = () => {
  let err = new Error();
  err.name = 'Page Not Found';
  err.message = 'Sorry, you reached a Page that does not exist';
  err.status = 404;
  return err;
}

//Error exports
module.exports.pageNotFound = pageNotFound;