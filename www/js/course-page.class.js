class CoursePage{

	constructor(courseId) {
		this.course = null;

		$('.teacher-messages-container').empty();
		$('.student-announcement-container').empty();
		$('.front-course-container').empty();
		$('.profile-page-container').empty();
		$('.booking-page-container').empty();
		$('.week-planner-container').empty();
		$('.course-page-container').empty();
		$('.teacher-posted-messages-container').empty();

		Course.find(courseId, (course) => {
			this.course = course;

			// Load the course info
			$('.front-course-container').empty().template('course-page', {
				course: course,
				role: user.role
			});

			this.addEventListeners();

			this.loadAnnouncements();
		});
	}

	loadAnnouncements() {
		Announcement.find('find/{ courses: { $in: ["' + this.course._id + '"] } }', (announcements) => {
			prepareDate(announcements);

			$('.course-page-container')
				.empty()
				.template('course-announcement', { announcements: announcements, course: this.course });

			function prepareDate(announcements) {
				var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
					"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
				];

				announcements.forEach((announcement) => {
					let date = new Date(announcement.timeCreated);
					announcement.dateString = date.getDate() + ' ' + monthNames[date.getMonth()];
				});
			}
		});
	}

	addEventListeners() {
		let that = this;

		$('.front-course-container').on('click', 'button.remove-item', function() {
			let id = $(this).attr('list-item-id');

			that.removeById.call(that, id, this);
		});

		$('.add-student').on('click', () => {
			// Get the username from the textbox
			let username = $('.add-student-input').val();
			that.addStudent(username);
		});
	}

	addStudent(username) {
		let course = this.course;

		// Find student in database
		Student.find('find/{ username: "' + username + '" }', function(result) {

			// If student exists in the database
			if (result.length) {
				let student = result[0];
				let studentIsAlreadyInCourse = false;

				// Loop through the course's students and check if
				// a student with the specified username is already in there.
				course.students.forEach(function(obj) {
					if(obj.username == username) {
						studentIsAlreadyInCourse = true;
					}
				});

				if (studentIsAlreadyInCourse) {
					// show error msg, student already in course
				} else {
					// Add course to student.
					// Then update the student in the database.
					student.courses.push(course._id);
					Student.update(student._id, { courses: student.courses });

					// Add student to course.
					// Then update the course in the database
					course.students.push(student._id);
					Course.update(course._id, { students: course.students }, function(){

						// Reload the page when the course has finished updating.
						location.reload();
					});
				}
			} else {
				// show error msg, wrong username
			}
		});
	}

	removeById(id, clickedElement) {
		this.course.students = this.course.students.filter((item) => {
			let shouldKeep = id !== item._id;

			if(!shouldKeep) {
				this.removeCourseFromEntity(item);
			}

			return shouldKeep;
		});

		var updateObj = { students: this.course.students };

		Course.update(this.course._id, updateObj, function() {
			$(clickedElement).closest('.profile-content').remove();
		});
	}

	removeCourseFromEntity(obj) {
		obj.courses = obj.courses.filter((course) => {
			return this.course._id.indexOf(course) == -1;
		});

		Student.update(obj._id, {courses: obj.courses});
	}
}