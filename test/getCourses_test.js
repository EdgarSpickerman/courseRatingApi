'use strict';
//load modules
const request = require('supertest');
const { expect } = require('chai');
const mongoose = require('mongoose');
const app = require('../src/');
const userSchema = require('../src/schemas/userSchema');

//tests
describe('GET /api/courses', function () {
  it('should return course title and _id and 200 status', function (done) {
    request(app)
      .get('/api/courses')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        res.body.map(element => {
          expect(element).to.have.property('_id');
          expect(element).to.have.property('title');
          expect(element).to.not.have.property('user');
          expect(element).to.not.have.property('description');
          expect(element).to.not.have.property('estimatedTime');
          expect(element).to.not.have.property('materialsNeeded');
          expect(element).to.not.have.property('steps');
          expect(element).to.not.have.property('reviews');
        })
        done();
      })
  });

})