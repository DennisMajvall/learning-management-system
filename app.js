// Npm modules
var express = require('express');
var bodyparser = require('body-parser');
var cookieparser = require('cookie-parser');
var sha1 = require('sha1');
var mongoose = require('mongoose');
require('mongoosefromclass')(mongoose);

// Fake JSON Data
var adminData = require('./data/adminData.json');
var teacherData = require('./data/teacherData.json');
var studentData = require('./data/studentData.json');
var courseData = require('./data/courseData.json');
var roomData = require('./data/roomData.json');
var announcementData = require('./data/announcementData.json');

// Make some things global
global.mongoose = mongoose;
global.sha1 = sha1;
global.userRoles = ['Owner'];
global.passwordSalt = "shouldBeHardToGuess132638@@@@x";

// Stop mongoose from using an old promise library
// (takes away the warning "mpromise is deprecated")
mongoose.Promise = Promise;

// Load classes, make them global and then convert selected ones to modules
var classesToLoad = {
	Sessionhandler: true,
	Loginhandler: true,
	Restrouter: true,
	Session: 'module',
	User: 'module',
	Owner: 'module',
	Course: 'module',
	Teacher: 'module',
	Admin: 'module',
	Education: 'module',
	Room: 'module',
	Announcement: 'module',
	Student: 'module'
};

for(let className in classesToLoad) {
	let pathName = './modules/' + className.toLowerCase() + '.class';
	global[className] = require(pathName);
}

for(let className in classesToLoad) {
	if(classesToLoad[className] == 'module') {
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
app.use((req, res, next)=>{
	if(req.url.indexOf('/rest/') >= 0) {
		res.set("Cache-Control", "no-store, must-revalidate");
	}
	next();
});

// Create restroutes to selected classes/mongoose models
new Restrouter(app, Owner);
new Restrouter(app, Teacher);
new Restrouter(app, Student);
new Restrouter(app, Course);
new Restrouter(app, Education);
new Restrouter(app, Room);
new Restrouter(app, Admin);
new Restrouter(app, Announcement);
new Loginhandler(app);

// A path to get user roles
app.get('/rest/user-roles',(req, res)=>{
  	res.json(global.userRoles);
});

// Point to a folder where we have static files
// (our frontend code)
app.use(express.static('www'));

// Connect to mongoDB
// and when that is done start the express server
mongoose.connect('mongodb://127.0.0.1/lms');
mongoose.connection.once('open', onceConnected);

function onceConnected() {
    app.listen(3000, function() {
        console.log('Express app listening on port 3000');
    });

	// For each collection type we have JSON of
	// If the db counts 0 of either item
	// It will insert the JSON into the db.
	createFakeDataFromJSON();
}

function createFakeDataFromJSON() {
    Admin.count(function(err, count) {
        if (count === 0) {
            createDeafultAdmins();
        }
    });

    Teacher.count(function(err, count) {
        if (count === 0) {
            createDeafultTeachers();
        }
    });

    Student.count(function(err, count) {
        if (count === 0) {
            createDeafultStudents();
        }
    });

    Course.count(function(err, count) {
    	if (count === 0) {
    		createDefaultCourses();
    	}
    });

    Room.count(function(err, count) {
    	if (count === 0) {
    		createDefaultRooms();
    	}
    });

    Announcement.count(function(err, count) {
    	if (count === 0) {
    		createDefaultAnnouncements();
    	}
    });
	
	function createDeafultAdmins() {
		adminData.forEach(function(data) {
			new Admin(data).save();
		});
	}

	function createDeafultTeachers() {
		thingsLeftToSave += teacherData.length;

		teacherData.forEach(function(teacher) {
			new Teacher(teacher).save(function(err, teachers) {
				linkCollectionsToEachother();
			});
		});
	}

	function createDeafultStudents() {
		thingsLeftToSave += studentData.length;

		studentData.forEach(function(student) {
			new Student(student).save(function(err, students) {
				linkCollectionsToEachother();
			});
		});
	}

	function createDefaultCourses() {
		thingsLeftToSave += courseData.length;

		courseData.forEach(function(course) {
			new Course(course).save(function(err, courses) {
				linkCollectionsToEachother();
			});
		});
	}

	function createDefaultRooms() {
		roomData.forEach(function(data) {
			new Room(data).save();
		});
	}

	function createDefaultAnnouncements() {
		thingsLeftToSave += announcementData.length;

		announcementData.forEach(function(announcement) {
			new Announcement(announcement).save(function(err, announcements) {
				linkCollectionsToEachother();
			});
		});
	}

	var thingsLeftToSave = 0; // Change this to 1 to disable the populating
	function linkCollectionsToEachother() {
		if (--thingsLeftToSave != 0)
			return;

		var courses = null;
		var teachers = null;
		var students = null;
		var announcements = null;

		Course.find('', function(err, result) {
			courses = result;
			doLast();
		});

		Teacher.find('', function(err, result) {
			teachers = result;
			doLast();
		});

		Student.find('', function(err, result) {
			students = result;
			doLast();
		});

		Announcement.find('', function(err, result) {
			announcements = result;
			doLast();
		});

		function doLast() {
			if (!courses || !teachers || !students || !announcements)
				return;

			teachers.courses = courses;
			students.courses = courses;
			courses.teachers = teachers;
			courses.students = students;
			announcements.courses = courses;

			teachers.forEach((v)=>{
				v.courses = courses;
				v.save();
			});

			students.forEach((v)=>{
				v.courses = courses;
				v.save();
			});

			courses.forEach((v)=>{
				v.students = students;
				v.teachers = teachers;
				v.save();
			});

			announcements.forEach((v)=>{
				v.courses = courses;
				v.save();
			});
		}
	}


}
