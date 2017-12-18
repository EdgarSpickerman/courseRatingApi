'use strict'
//load modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//declare stepSchema
const stepSchema = new Schema({
  stepNumber: Number,
  title: {
    type: String,
    required: [true,'Step Title is required']
  },
  description: {
    type: String,
    required: [true, 'Step description is required']
  }
})

//declare course schema
const courseSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: [true, 'Course Title is Required']
  },
  description: {
    type: String,
    required: [true, 'Course Description is Required']
  },
  estimatedTime: String,
  materialsNeeded: String,
  steps: [{
    type: stepSchema,
    required: true
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Steps'
  }]
})

//export Schema
module.exports = courseSchema;