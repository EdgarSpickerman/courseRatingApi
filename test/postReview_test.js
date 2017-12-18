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

const postReview = { rating: 2 }

//tests
describe('POST /api/courses/:courseId/review', function () {
  //Will not define what happens with no auth since that function is tested with authorization tests

  beforeEach(function (done) {
    request(app).post(`/api/courses/${courseId}/reviews`).set('Authorization', auth).send(postReview)
      .end((err, res) => {
        if (err) throw err;
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.equal('');
        expect(res.header.location).to.equal(`/${courseId}`);
        done();
      });
  })

  afterEach(function (done) {
    course.findById(courseId)
      .exec((err, course) => {
        if (err) return done(err);
        if (!course) return done(noCourseFound());
        course.reviews.pop();
        course.save((err) => err ? done(err) : done());
      });
  })

  it('should return no content,have a status of 204, and update the course title to "a"', function (done) {
    course.findById(courseId)
      .populate({ path: 'reviews', model: 'Review' })
      .exec((err, course) => {
        if (err) throw err;
        if (!course) throw noCourseFound();
        expect(course.reviews[course.reviews.length - 1].rating).to.equal(postReview.rating);
        done();
      });
  })

})