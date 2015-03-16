'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
	config = require('./config/config'),
	mongoose = require('mongoose'),
	chalk = require('chalk');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
// var mongodbUri = 'mongodb://heroku_app1234:random_password@ds029017.mongolab.com:29017/heroku_app1234';
// var mongooseUri = uriUtil.formatMongoose(mongodbUri);
// var db = mongoose.connect(mongooseUri, function(err) {
//   if (err) {
//     console.error(chalk.red('Could not connect to MongoDB!'));
//     console.log(chalk.red(err));
//   }
// });
var db = mongoose.connect(config.db, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});

// Init the express application
var app = require('./config/express')(db);

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);