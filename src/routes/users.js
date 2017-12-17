'use strict';
//load modules
const express = require('express');
const router = express.Router();
const { authorize } = require('../middleware/authorization');

router.get('/', authorize, (req, res, next) => res.status(200).json(req.user));

//export router
module.exports = router;