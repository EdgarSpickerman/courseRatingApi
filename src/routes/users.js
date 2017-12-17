'use strict';
//load modules
const express = require('express');
const router = express.Router();
const { authorize, postUser } = require('../middleware/authorization');

router.get('/', authorize, (req, res, next) => res.status(200).json(req.user));

router.post('/', postUser, (req, res, next) => res.status(201).location('/').json());

//export router
module.exports = router;