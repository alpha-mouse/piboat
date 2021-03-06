const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const isProd = process.env.NODE_ENV === 'production';
let drive = null;
if (isProd) {
    drive = require('./drives/motorZeroDrive');
    drive.init(4, 1);
} else {
    drive = require('./drives/debugDrive');
}
const driveRoute = require('./driveRoutes')(drive);

const app = express();

//if (!isProd) {
    app.use(logger('dev'));
//}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', driveRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.send(err.message);
});

module.exports = app;
