// Npm modules
var express = require('express');
var bodyparser = require('body-parser');
var cookieparser = require('cookie-parser');
var sha1 = require('sha1');
var mongoose = require('mongoose');
require('mongoosefromclass')(mongoose);

// My JSON Data
var teacherData = require('./data/teacherData.json');
var courseData = require('./data/courseData.json');

// Make some things global
global.mongoose = mongoose;
global.sha1 = sha1;
global.userRoles = ['Kitten','Owner'];
global.passwordSalt = "shouldBeHardToGuess132638@@@@x";

// Stop mongoose from using an old promise library
// (takes away the warning "mpromise is deprecated")
mongoose.Promise = Promise;

// Load classes, make them global and
// then convert selected ones to modules
var classesToLoad = {
  Sessionhandler: true,
  Loginhandler: true,
  Restrouter: true,
  Session: 'module',
  User: 'module',
  Kitten: 'module',
  Owner: 'module',
  Course: 'module',
  Teacher: 'module'
};
for(let className in classesToLoad){
  let pathName = './modules/' + className.toLowerCase() + '.class';
  let required = require(pathName);
  global[className] = required;
}
for(let className in classesToLoad){
  if(classesToLoad[className] == 'module'){
    global[className] = mongoose.fromClass(global[className]);
  }
}

// Create a new express server, store in the variable app
var app = express();

// Make the express server able to read the body of requests
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// Make the express server able to handle
// cookies, sessions and logins
app.use(cookieparser());
app.use(new Sessionhandler(Session).middleware());

// Never cache request starting with "/rest/"
app.use((req,res,next)=>{
  if(req.url.indexOf('/rest/') >= 0){
    // never cache rest requests
    res.set("Cache-Control", "no-store, must-revalidate");
  }
  next();
});

// Create restroutes to selected classes/mongoose models
new Restrouter(app,Kitten);
new Restrouter(app,Owner);
new Restrouter(app,Teacher);
new Restrouter(app,Course);
new Loginhandler(app);

// A path to get user roles
app.get('/rest/user-roles',(req,res)=>{
  res.json(global.userRoles);
});

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

    Course.count(function(err, courseCount) {
    	if (courseCount === 0) {
    		createDefaultCourses();
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

function createDefaultCourses() {

	var coursesLeftToSave = courseData.length;

	courseData.forEach(function(course) {
		var aCourse = new Course({
			name: course.name,
			teachers: course.teachers,
			students: course.students,
			description: course.description,
			period: course.period
		});
		aCourse.save(function(err, courses) {
			console.log("Saved", courses);
			coursesLeftToSave--;
		});
	});
}
