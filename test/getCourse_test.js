'use strict';
//load modules
const request = require('supertest');
const { expect } = require('chai');
const mongoose = require('mongoose');
const app = require('../src/');

//

//tests
describe('GET /api/courses/:courseId', function () {
  it('should return course title and _id and 200 status', function (done) {
    request(app)
      .get('/api/courses/57029ed4795118be119cc43d')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('user');
        expect(res.body.user).to.have.property('_id');
        expect(res.body.user).to.have.property('fullName');
        expect(res.body.user).to.not.have.property('emailAddress');
        expect(res.body.user).to.not.have.property('password');
        expect(res.body).to.have.property('title');
        expect(res.body).to.have.property('description');
        expect(res.body).to.have.property('estimatedTime');
        expect(res.body).to.have.property('materialsNeeded');
        expect(res.body).to.have.property('reviews');
        expect(res.body).to.have.property('steps');
        res.body.steps.map(element => {
          expect(element).to.have.property('_id');
          expect(element).to.have.property('stepNumber');
          expect(element).to.have.property('title');
          expect(element).to.have.property('description');
        });
        res.body.reviews.map(element => {
          expect(element).to.have.property('_id');
          expect(element.user).to.have.property('_id');
          expect(element.user).to.have.property('fullName');
          expect(element.user).to.not.have.property('emailAddress');
          expect(element.user).to.not.have.property('password');
          expect(element).to.have.property('rating');
          expect(element).to.have.property('review');
          expect(element).to.have.property('postedOn');
        });
        done();
      })
  });

})