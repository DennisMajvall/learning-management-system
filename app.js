// Npm modules
var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
require('mongoosefromclass')(mongoose);

global.mongoose = mongoose;

// Classes (as modules)
var Restrouter = require('./modules/restrouter.class');
var Teacher = require('./modules/teacher.class');
var Course = require('./modules/course.class');

// Create a new express server,  store in the variable app
var app = express();

// Make the express server able to read the body of requests
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// Convert selected classes to mongoose models
Teacher = mongoose.fromClass(Teacher);
Course = mongoose.fromClass(Course);

// Create restroutes to selected classes/mongoose models
new Restrouter(app, Teacher);
new Restrouter(app, Course);

// Point to a folder where we have static files
// (our frontend code)
app.use(express.static('www'));

// Connect to mongoDB
// and when that is done start the express server
mongoose.connect('mongodb://localhost/lms');
mongoose.connection.once('open', function() {
	app.listen(3000,  function () {
		console.log('Express app listening on port 3000!');
	});
});
