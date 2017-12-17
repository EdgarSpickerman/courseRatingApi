'use strict';
//load modules
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => res.send(200).json({ msg: 'hello' }));

//export router
module.exports = router;