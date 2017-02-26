// Npm modules
var fs = require('fs');
var express = require('express');
var bodyparser = require('body-parser');
var cookieparser = require('cookie-parser');
var sha1 = require('sha1');
var mongoose = require('mongoose');
var compression = require('compression');
require('mongoosefromclass')(mongoose);

// Fake JSON Data
var adminData = require('./data/adminData.json');
var educationData = require('./data/educationData.json');
var teacherData = require('./data/teacherData.json');
var studentData = require('./data/studentData.json');
var courseData = require('./data/courseData.json');
var roomData = require('./data/roomData.json');
var announcementData = require('./data/announcementData.json');

// Make some things global
global.mongoose = mongoose;
global.sha1 = sha1;
global.userRoles = ['Teacher', 'Student', 'Admin'];
global.passwordSalt = "shouldBeHardToGuess132638@@@@x";

// Stop mongoose from using an old promise library
// (takes away the warning "mpromise is deprecated")
mongoose.Promise = Promise;

// Load classes, make them global and then convert selected ones to modules
var classesToLoad = {
	Sessionhandler: true,
	Loginhandler: true,
	Restrouter: true,
	Lesswatch: true,
	Session: 'module',
	User: 'module',
	Owner: 'module',
	Course: 'module',
	Teacher: 'module',
	Admin: 'module',
	Education: 'module',
	Room: 'module',
	Announcement: 'module',
	Student: 'module',
	Booking: 'module'
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

// Make the express server abl.e to read the body of requests
app.use(bodyparser.json({ limit: '5mb' }));
app.use(bodyparser.urlencoded({ extended: false }));

// Make the express server able to handle
// cookies, sessions and logins
app.use(cookieparser());
app.use(new Sessionhandler(Session).middleware());

app.use(compression());

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
new Restrouter(app, Booking);
new Loginhandler(app);

// A path to get user roles
app.get('/rest/user-roles',(req, res)=>{
  	res.json(global.userRoles);
});

// Point to a folder where we have static files
// (our frontend code)
app.use(express.static('www'));

// start LessWatch
new Lesswatch();

var sendForgotPassword = require('./modules/forgot-password');

function makeRandomPassword() {
    var text = "";
    var possible = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";

    for( var i=0; i < 8; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

// A path to get user roles
app.get('/forgot-password/:username',(req, res)=>{
	var username = req.params.username;
	var pw = makeRandomPassword();

	findInCollection(Student, function(didSucceed) {
		if (didSucceed) {
			res.json('student username found');
		} else {
			findInCollection(Teacher, function(didSucceed) {
				if (didSucceed) {
					res.json('teacher username found');
				} else {
					findInCollection(Admin, function(didSucceed) {
						if (didSucceed) {
							res.json('admin username found');
						} else {
							res.json('username not found');
						}
					});
				}
			});
		}
	});


    function findInCollection(schema, callback) {
		schema.findOne({ username: username }, function(err, result) {
	    	if (result) {
	    		succeeded = true;
	    		result.password = pw;
	    		result.save();
				sendForgotPassword(username, pw);
				callback(true);
			} else
				callback(false);
	    });
    }

});

app.post('/upload-file',(req, res)=>{
	var data = req.body.imgData;
	var filename = sha1(req.session.content.user.username) + req.body.imgExtension;

	var filePath = __dirname + '/www/images/profiles/' + filename;


	function decodeBase64Image(dataString) {
		var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
		response = {};

		if (matches.length !== 3) {
			return new Error('Invalid input string');
		}

		response.type = matches[1];
		response.data = new Buffer(matches[2], 'base64');

		return response;
	}

	var imageBuffer = decodeBase64Image(data);

	fs.writeFile(filePath, imageBuffer.data, ()=> {
		res.json(filename);
	});

});

// A path to get user roles
app.get('*',(req, res)=>{
	res.sendFile(__dirname + '/www/index.html');
});

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

    Education.count(function(err, count) {
    	if (count === 0) {
    		createDefaultEducations();
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

	function createDefaultEducations() {
		thingsLeftToSave += educationData.length;

		educationData.forEach(function(education) {
			new Education(education).save(function(err, educations) {
				linkCollectionsToEachother();
			});
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
		var educations = null;

		Course.find('', function(err, result) {
			courses = result;
			doLast();
		});

		Education.find('', function(err, result) {
			educations = result;
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
			if (!courses || !teachers || !students || !announcements || !educations)
				return;

			//assign students to educations
			students[0].educations = educations.slice(0, 1);
			students[1].educations = educations.slice(0, 1);
			students[2].educations = educations.slice(0, 1);
			students[17].educations = educations.slice(0, 1);
			students[23].educations = educations.slice(0, 1);

			students[3].educations = educations.slice(1, 2);
			students[4].educations = educations.slice(1, 2);
			students[5].educations = educations.slice(1, 2);
			students[18].educations = educations.slice(1, 2);

			students[6].educations = educations.slice(2, 3);
			students[7].educations = educations.slice(2, 3);
			students[19].educations = educations.slice(2, 3);

			students[8].educations = educations.slice(3, 4);
			students[9].educations = educations.slice(3, 4);
			students[10].educations = educations.slice(3, 4);
			students[20].educations = educations.slice(3, 4);

			students[11].educations = educations.slice(4, 5);
			students[12].educations = educations.slice(4, 5);
			students[13].educations = educations.slice(4, 5);
			students[21].educations = educations.slice(4, 5);

			students[14].educations = educations.slice(5, 6);
			students[15].educations = educations.slice(5, 6);
			students[16].educations = educations.slice(5, 6);
			students[22].educations = educations.slice(5, 6);

			//assign educations to students
			educations[0].students = [].concat( students.slice(0, 3) , [ students[17] ] , [ students[23] ]);
			educations[1].students = [].concat( students.slice(3, 6) , [ students[18] ]);
			educations[2].students = [].concat( students.slice(6, 8) , [ students[19] ]);
			educations[3].students = [].concat( students.slice(8, 11) , [ students[20] ]);
			educations[4].students = [].concat( students.slice(11, 14) , [ students[21] ]);
			educations[5].students = [].concat( students.slice(14, 17) , [ students[22] ]);

			//assign teachers to courses
			teachers[0].courses = courses.slice(0, 3);
			teachers[1].courses = courses.slice(0, 3);

			teachers[2].courses = courses.slice(2, 5);
			teachers[3].courses = courses.slice(2, 5);
			teachers[4].courses = courses.slice(4);

			//assign courses to teachers
			courses[0].teachers = teachers.slice(0, 2);
			courses[1].teachers = teachers.slice(0, 2);

			courses[2].teachers = teachers.slice(2, 4);
			courses[3].teachers = teachers.slice(2, 4);

			courses[4].teachers = teachers.slice(4);
			courses[5].teachers = teachers.slice(4);

			//assign students to courses
			students[0].courses = courses.slice(0, 3);
			students[1].courses = courses.slice(0, 3);
			students[2].courses = courses.slice(0, 3);
			students[17].courses = courses.slice(0, 3);
			students[23].courses = courses.slice(0, 3);

			students[3].courses = courses.slice(1, 2);
			students[4].courses = courses.slice(1, 2);
			students[5].courses = courses.slice(1, 2);
			students[18].courses = courses.slice(1, 2);

			students[6].courses = courses.slice(2, 3);
			students[7].courses = courses.slice(2, 3);
			students[19].courses = courses.slice(2, 3);

			students[8].courses = courses.slice(3, 4);
			students[9].courses = courses.slice(3, 4);
			students[10].courses = courses.slice(3, 4);
			students[20].courses = courses.slice(3, 4);

			students[11].courses = courses.slice(4, 5);
			students[12].courses = courses.slice(4, 5);
			students[13].courses = courses.slice(4, 5);
			students[21].courses = courses.slice(4, 5);

			students[14].courses = courses.slice(5, 6);
			students[15].courses = courses.slice(5, 6);
			students[16].courses = courses.slice(5, 6);
			students[22].courses = courses.slice(5, 6);

			//assign courses to announcements
			announcements[0].courses = courses.slice(0, 2);
			announcements[1].courses = courses.slice(1, 3);
			announcements[2].courses = courses.slice(3, 5);

			//assign teacher to announcements authors
			announcements[0].author = teachers[0];
			announcements[1].author = teachers[2];
			announcements[2].author = teachers[3];

			//assign courses to students
			courses[0].students = [].concat( students.slice(0, 6) , [ students[17] ] , [ students[23] ]);
			courses[1].students = [].concat( students.slice(3, 6) , [ students[18] ]);
			courses[2].students = [].concat( students.slice(6, 8) , [ students[19] ]);
			courses[3].students = [].concat( students.slice(8, 11) , [ students[20] ]);
			courses[4].students = [].concat( students.slice(11, 14) , [ students[21] ]);
			courses[5].students = [].concat( students.slice(14, 17) , [ students[22] ]);

			teachers.forEach((v)=>{
				v.save();
			});

			educations.forEach((v)=>{
				v.save();
			});

			students.forEach((v)=>{
				v.save();
			});

			courses.forEach((v)=>{
				v.save();
			});

			announcements.forEach((v)=>{
				v.save();
			});
		}
	}


}
