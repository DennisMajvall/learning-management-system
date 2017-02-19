class Sidebar {

	constructor() {
		let courseHashMap = {};
		let that = this;
		let currentUser = user;

		if (currentUser.role != 'Teacher') {
			Student.find(currentUser._id, function(student,err){
				currentUser = student;
				populateCourses(user.courses);
			});
		} else {
			populateCourses(user.courses);
		}


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
				courses: courses,
				header: 'Learning Management System',
				role: currentUser.role.toLowerCase(),
				picture: currentUser.picture,
				education: currentUser.educations ? currentUser.educations[0].name : '',
				booking: 'Book a room',
				account: 'Your Account',
				fullname: currentUser.firstname + ' ' + currentUser.lastname,
				usersettings: 'Settings',
				logout: 'log out'
			};

			$('.sidebar-container').template('sidebar', settingsObj);

			$(".nav-toggle, .menu-toggle").click(function(e) {
				e.preventDefault();
				$(".sidebar-slide").toggleClass("visible");
			});
		}

		$('.sidebar-container').on('click', '.log-out', function(){
			Login.delete(onLogout);
		});

		function onLogout(response, err) {
			location.reload();
		}

		$('.sidebar-container').on('click', '.menu-choice-courses', function(){
			let id = $(this).data('id');
			let course = that.courseHashMap[id];

			$('.student-announcement-container').empty();
			$('.teacher-messages-container').empty();
			$('.front-course-container').empty().template('course-page', { course: course });

			if ($(window).width() < 768) {
				$('.menu-toggle').trigger('click');
			}
		});
	}
}
