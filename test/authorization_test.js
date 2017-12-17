'use strict';
//load modules
const request = require('supertest');
const app = require('../src/');
const { expect } = require('chai');

//functions and variables
let link = '/api/users';

const resProps = ['fullName','name','name','name'];

const resPropsVal = ['Joe Smith', 'Invalid/incorrect Password', 'No User Found', 'Not sign/logged in'];

const resStatus = [200, 401, 401, 401];

const authCodes = ['Basic am9lQHNtaXRoLmNvbTpwYXNzd29yZA==', 'Basic am9lQHNtaXRoLmNvbTo=', 'Basic am9lQHNtaXRoOnBhc3N3b3Jk'];

const handleGetRes = (err, res, i, callback) => {
  expect(res.body[resProps[i]]).to.equal(resPropsVal[i]);
  expect(res.statusCode).to.equal(resStatus[i]);
  callback();
}

const getAuthRes = (link, i, auth, cb) => {
  if (!auth) request(app).get(link).end((err, res) => handleGetRes(err, res, i, cb));
  else if (auth) request(app).get(link).set('Authorization', auth).end((err, res) => handleGetRes(err, res, i, cb));
}


//tests
describe('authorization middleware', function () {
  it('should return authorized user and 200 status with authorized user', done => getAuthRes(link, 0, authCodes[0], done));

  it('should return 401 status with invalid password(invalidPasswordError)', done => getAuthRes(link, 1, authCodes[1], done));

  it('should return 401 status with invalid username(userfoundError)', done => getAuthRes(link, 2, authCodes[2], done));

  it('should return 401 status without authorization(signinError)', done => getAuthRes(link, 3, '', done));
})