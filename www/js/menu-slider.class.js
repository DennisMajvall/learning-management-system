class MenuSlider {

	constructor() {
		// When we have login working we won't have to 'find' Students (or Teachers)
		// and instead just populate the courses of the one logged in.
		let courseHashMap = {};
		let that = this;
		let currentUser = user;

		if(currentUser.role != 'Teacher'){
			Student.find(currentUser._id, function(student,err){
				console.log(student);
				currentUser = student;
			});
		}

		populateCourses(currentUser.courses);

		function populateCourses(courses) {
			let coursesIds = courses.map( course => '"' + course + '"' );
			let queryString = 'find/{ _id: { $in: [' + coursesIds + '] } }';

			Course.find(queryString, createTemplate);
		}

		function createTemplate(courses, err) {
			// Make an array mapping the _id as an index for each course.
			that.courseHashMap = {};
			courses.forEach((course) => {
				that.courseHashMap[course._id] = course;
			});

			var settingsObj = {
				header: 'Learing Management System',
				courses: courses,
				picture: currentUser.picture,
				education: currentUser.educations ? currentUser.educations[0].name : 'false',
				booking: 'Book a room',
				account: 'Your Account',
				fullname: currentUser.firstname + ' ' + currentUser.lastname,
				usersettings: 'Settings',
				logout: 'log out'
			};

			$('.sidebar').template('menu-slider', settingsObj);
		}

		$('.sidebar').on('click', '.log-out', function(){
			Login.delete(onLogout);
		});

		function onLogout(response, err) {
			console.log('onLogout', response, 'errorMessage', err);
			location.reload();
		}

		$('.sidebar').on('click', '.menu-choice-courses', function(){
			let id = $(this).data('id');
			let course = that.courseHashMap[id];

			$('.front-announcements').empty();
			$('.front-courses').empty().template('course-page', { course: course });
			// $('.menu-slider').animate({ left: '-400px' }, 200);
			// $('.hamburger').css({ transform: 'rotate(0deg)' });
		});
	}
}
