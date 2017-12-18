'use strict'
//load modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//declare review schema
const stepsSchema = new Schema({
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

//export Schema
module.exports = stepsSchema;