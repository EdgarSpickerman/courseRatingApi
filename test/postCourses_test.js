'use strict';
//load modules
const request = require('supertest');
const { expect } = require('chai');
const mongoose = require('mongoose');
const app = require('../src/');
const courseSchema = require('../src/schemas/courseSchema');

//functions and variables
let auth = 'Basic am9lQHNtaXRoLmNvbTpwYXNzd29yZA==';

let emptyBody = {}

let emptySteps = { title: 'a', description: 'a', steps: [{}] };

let validBody = { title: 'a', description: 'a', steps: [{ title: 'a', description: 'a' }] };

let resCodes = [400, 400, 201];

let errLen = [3, 2, 0];

const getPostRes = (i, body, callback) => {
  let errors = 0;
  request(app).post('/api/courses').set('Authorization', auth).send(body)
    .end((err, res) => {
      expect(res.statusCode).to.equal(resCodes[i]);
      if (res.body.errors) {
        for (let prop in res.body.errors) {
          errors += 1;
        }
      } else {
        expect(res.body).to.equal('');
        expect(res.header.location).to.equal('/');
      }
      expect(errors).to.equal(errLen[i]);
      callback();
    });
}


//tests
describe('POST /api/courses', function () {
  //Will not define what happens with no auth since that function is tested with authorization tests

  after(done => {
    mongoose.model('Course', courseSchema).remove({ title: 'a' }, err => err ? next(err) : done())
  });

  it('should return 400 status and course title, course description, course steps validation erors with a `empty body req` ', function (done) {
    getPostRes(0, emptyBody, done);
  });

  it('should return 400 status and steps title, and steps description validation erors with a `emptySteps body req` ', function (done) {
    getPostRes(1, emptySteps, done);
  });

  it('should return 201 status, location header set to "/" and no content with a `valid body req` ', function (done) {
    getPostRes(2, validBody, done);
  });

})