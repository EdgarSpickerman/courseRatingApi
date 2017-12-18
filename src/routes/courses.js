'use strict';
//load modules
const express = require('express');
const router = express.Router();
const { authorize, getCourses, getCourse } = require('../middleware/authorization');

router.get('/', getCourses, (req, res, next) => res.status(200).json(req.courses));

router.get('/:courseId', getCourse, (req, res, next) => res.status(200).json(req.course));

//export router
module.exports = router;