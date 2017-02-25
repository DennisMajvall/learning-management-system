class Sidebar {

	constructor() {
		let courseHashMap = {};
		let that = this;
		let currentUser = user;
		let educationName = '';

		if (currentUser.role == 'Student') {
			Student.find(currentUser._id, function(student, err) {
				educationName = student.educations[0].name;
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
				role: user.role.toLowerCase(),
				picture: user.picture,
				education: educationName,
				booking: 'Book a room',
				account: 'Your Account',
				fullname: user.firstname + ' ' + user.lastname,
				usersettings: 'Settings',
				logout: 'log out'
			};

			$('.sidebar-container').empty().template('sidebar', settingsObj);

			$(".nav-toggle, .menu-toggle").click(function(e) {
				e.preventDefault();
				$(".sidebar-slide").toggleClass("visible");
			});
		}


		// Open the user profile page
		$('.sidebar-container').on('click', '.settings-icon', function() {
			// Clear the page
			$('.page-content').children().empty();
			// Add html template for profile
			$('.page-content').empty().template('profile', {
				firstname: user.firstname,
				lastname: user.lastname,
				picture: settingsObj[picture]
			})
		});

		// Log out
		$('.sidebar-container').on('click', '.log-out', function() {
			Login.delete(onLogout);
		});

		function onLogout(response, err) {
			location.href = '/';
		}

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
		Course.update(mainItem._id, updateObj, function() {
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

