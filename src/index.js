'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const { pageNotFound } = require('./functions/errors');
const { connectDatabase } = require('./functions/connection');
const { json } = require('body-parser');
const userRoutes = require('./routes/users');
const courseRoutes=require('./routes/courses');
const app = express();

// set our port
app.set('port', process.env.PORT || 5000);

//set parsing of requests
app.use(json());

//connect to db
connectDatabase(27017, 'courseRating').then(success => console.log(success)).catch(err => console.error(err));

// morgan gives us http request logging
app.use(morgan('dev'));

//route handlers
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);

// catch 404 and forward to global error handler
app.use((req, res, next) => next(pageNotFound()));

// Express's global error handler
app.use((err, req, res, next) => res.status(err.name === 'ValidationError' ? 400 : err.status || 500).json(err));

// start listening on our port
const server = app.listen(app.get('port'), () => console.log('Express server is listening on port ' + server.address().port));

//exporting app
module.exports = app;
