'use strict'
//load modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//declare review schema
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Steps',
    required: true
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Steps'
  }]
})

//export Schema
module.exports = courseSchema;