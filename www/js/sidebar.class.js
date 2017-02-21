class Sidebar {

	constructor() {
		let courseHashMap = {};
		let that = this;
		let currentUser = user;

		if (currentUser.role != 'Teacher') {
			Student.find(currentUser._id, function(student, err) {
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


		// Open the user profile page
		$('.sidebar-container').on('click', '.settings-icon', function(){
			// Clear the page
			$('.page-content').children().empty();
			// Add html template for profile
			$('.page-content').template('profile', {
				firstname: currentUser.firstname,
				lastname: currentUser.lastname,
				picture: settingsObj[picture]
			})
		});

		// Log out
		$('.sidebar-container').on('click', '.log-out', function(){

			Login.delete(onLogout);
		});

		function onLogout(response, err) {
			location.href = '/';
		}

		$('.sidebar-container').on('click', '.menu-choice-courses', function() {
			let id = $(this).data('id');
			let course = that.courseHashMap[id];

			$('.student-announcement-container').empty();
			$('.teacher-messages-container').empty();
			$('.front-course-container').empty().template('course-page', { course: course, role: user.role });
			$('.sidebar-slide').removeClass('visible');
		});

		$('.front-course-container').on('click', 'button.remove-item', function() {
			let id = $(this).attr('list-item-id');
			let courseId = $(this).closest('section.course-page').attr('course-id');
			let course = that.courseHashMap[courseId];

			that.removeById(id, course, that, this);
		});
	}

	removeById(id, mainItem, that, domThis) {
		mainItem.students = mainItem.students.filter(function(item) {
			let shouldKeep = id !== item._id;

			if(!shouldKeep) {

				that.removeCourseFromEntity(item, mainItem);
			}
			return shouldKeep;
		});
		var updateObj = {};
		updateObj.students = mainItem.students;
		Course.update(mainItem._id, updateObj, function(){
			$(domThis).closest('profile').remove();
		});
	}

	removeCourseFromEntity(obj, mainItem) {
		obj.courses = obj.courses.filter(function(course) {
			return mainItem._id.indexOf(course) == -1;
		});

		Student.update(obj._id, {courses: obj.courses});
	}
}

