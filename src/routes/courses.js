'use strict';
//load modules
const express = require('express');
const router = express.Router();
const { authorize, getCourses, getCourse, postCourse } = require('../middleware/authorization');

router.get('/', getCourses, (req, res, next) => res.status(200).json(req.courses));

router.get('/:courseId', getCourse, (req, res, next) => res.status(200).json(req.course));

router.post('/', authorize, postCourse, (req, res, next) => res.location('/').status(201).json());

//router.post('/:courseId/reviews', authorize, (req, res, next) => res.location(`/${req.params.courseId}`).status(201).json());

//router.put('/:courseId', authorize, (req, res, next) => res.location('/').status(204).json());

//export router
module.exports = router;