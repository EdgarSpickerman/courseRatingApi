'use strict';
//load modules
const request = require('supertest');
const { expect } = require('chai');
const mongoose = require('mongoose');
const app = require('../src/');
const courseSchema = require('../src/schemas/courseSchema');
const { noCourseFound } = require('../src/functions/errors');
const course = mongoose.model('Course', courseSchema);

//functions and variables
let auth = 'Basic am9lQHNtaXRoLmNvbTpwYXNzd29yZA==';

let courseId = '57029ed4795118be119cc43d';

const putBodies =   { org: { title: 'Build a Basic Bookcase' }, new: { title: 'a' } }

//tests
describe('PUT /api/courses/:courseId', function () {
  //Will not define what happens with no auth since that function is tested with authorization tests

  beforeEach(function (done) {
    request(app).put(`/api/courses/${courseId}`).set('Authorization', auth).send(putBodies.new)
      .end((err, res) => {
        if (err) throw err;
        expect(res.statusCode).to.equal(204);
        expect(res.body).to.deep.equal({});
        done();
      });
  })

  afterEach(function (done) {
    request(app).put(`/api/courses/${courseId}`).set('Authorization', auth).send(putBodies.org).end((err, res) => err ? done(err) : done());
  })

  it('should return no content,have a status of 204, and update the course title to "a"', function (done) {
    course.findById(courseId)
      .exec((err, course) => {
        if (err) throw err;
        if (!course) throw noCourseFound();
        expect(course.title).to.equal(putBodies.new.title);
        done();
      });
  })

})