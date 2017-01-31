// Npm modules
var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
require('mongoosefromclass')(mongoose);

global.mongoose = mongoose;

// My JSON Data
var teacherData = require('./data/teacherData.json');

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
mongoose.connection.once('open', onceConnected);

function onceConnected() {
    app.listen(3000, function() {
        console.log('Express app listening on port 3000');
    });

    // Add my Default Teachers from json. 
    // check how many Teachers are in our database.
    // If 0 exist, add all the teachers from teacherData.json to our lms database

    Teacher.count(function(err, teacherCount) {
        if (teacherCount === 0) {
            createDeafultTeachers();
        } else {
        	return;
        }
    });
}

function createDeafultTeachers() {

        var teachersLeftToSave = teacherData.length;

        teacherData.forEach(function(teacher) {
            var aTeacher = new Teacher({
            	firstname: teacher.firstname,
            	lastname: teacher.lastname,
            	phonenumber: teacher.phonenumber,
            	courses: teacher.courses,
            	email: teacher.email,
            	password: teacher.password
            });
            aTeacher.save(function(err, teachers) {
                console.log("Saved", teachers);
                teachersLeftToSave--;
            });
        });
    }