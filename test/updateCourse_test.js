'use strict';
//load modules
const request = require('supertest');
const { expect } = require('chai');
const mongoose = require('mongoose');
const app = require('../src/');
const courseSchema = require('../src/schemas/courseSchema');

//functions and variables

//tests
describe('PUT /api/courses/:courseId', function () {
  //Will not define what happens with no auth since that function is tested with authorization tests

  beforeEach(function (done) {
    done();
  });

  afterEach(function (done) {
    done();
  });

})