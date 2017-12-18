'use strict';
//load modules
const request = require('supertest');
const { expect } = require('chai');
const mongoose = require('mongoose');
const app = require('../src/');
const userSchema = require('../src/schemas/userSchema');

//functions and variables
let incompleteBody = { opt: true }

let validBody = { "fullName": "John Smith", "emailAddress": "john@smith.com", "password": "password", "confirmPassword": "password" };

let invalidBody = { "fullName": "Joe Smith", "emailAddress": "joe@smith.com", "password": "password", "confirmPassword": "password" };

let invalidEmail = { "fullName": "Joe Smith", "emailAddress": "joe@smith", "password": "password", "confirmPassword": "password" };

const getPostRes = (body, callback) => {
  request(app)
    .post('/api/users')
    .send(body)
    .end((err, res) => {
      if (res.statusCode === 201) {
        expect(res.statusCode).to.equal(201);
        expect(res.header.location).to.equal('/');
        expect(res.body).to.equal('');
      } else {
        expect(res.statusCode).to.equal(400);
        if (res.body.errors) expect(res.body.name).to.equal('ValidationError')
        else expect(res.body.name).to.equal('User Already Exist');
      }
      callback();
    })
}


//tests
describe('POST /api/users', function () {
  after(done => {
    mongoose.model('User', userSchema).remove({ emailAddress: validBody.emailAddress }, err => err ? next(err) : done())
  });

  it('should return nothing,201 status,and location header of "/" with successful post', done => getPostRes(validBody, done));

  it('should return 400 status with existing user(userAlreadyExistError) with existing user', done => getPostRes(invalidBody, done));

  it('should return 400 status with errors(validationErrors) with missing form fields', done => getPostRes(incompleteBody, done));

  it('should return 400 status with errors(validationErrors) with invalid email', done => getPostRes(invalidEmail, done));

})