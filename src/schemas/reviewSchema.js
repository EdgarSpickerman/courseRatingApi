'use strict'
//load modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//declare review schema
const reviewSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  postedOn: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    min: [1, 'The lowest rating that can be given is 1'],
    max: [5, 'The highest rating that can be given is 5']
  },
  review: String
})

//export Schema
module.exports = reviewSchema;