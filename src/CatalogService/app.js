'use strict'

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://mongo/ms-catalog");

const index = require('./routes/index');
const catalog = require('./routes/hotelRoutes');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', index);
app.use('/catalog', catalog);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404,
        next(err)
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    return res.status(500).json({status: 500, name: err.name, msg: err.message, url: req.url})
});

module.exports = app;



