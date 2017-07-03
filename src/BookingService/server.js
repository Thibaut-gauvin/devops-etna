var express     = require('express'),
    app         = express(),
    env         = require('node-env-file'),
    mongoose    = require('mongoose'),
    bodyParser  = require('body-parser');

/**
 * Load vars from .env files
 * Any .env vars are accessible trough the "process.env.SOME_VAR"
 */
env(__dirname +  '/.env', { overwrite: true });

/** Init the database connection */
var database = require('./config/db');
mongoose.Promise = global.Promise;
mongoose.connect(database.url);

/** Parse application/json */
app.use(bodyParser.json());

/** Parse application/x-www-form-urlencoded */
app.use(bodyParser.urlencoded({ extended: true }));

/** Configure routes */
require('./config/routes')(app);

/** Start server */
app.listen(process.env.NODE_INTERNAL_PORT, function () {
    console.log('Application started at http://localhost:' + process.env.BOOKING_SERVICE_LISTEN_PORT + ' !');
});

module.exports = app;
module.exports = mongoose;
