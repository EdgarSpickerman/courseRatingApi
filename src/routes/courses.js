'use strict';
//load modules
const express = require('express');
const router = express.Router();
const { authorize, getCourses } = require('../middleware/authorization');

router.get('/', getCourses, (req, res, next) => res.status(200).json(req.courses));

//export router
module.exports = router;