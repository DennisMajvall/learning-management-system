class CoursePage{

	constructor(courseId) {
		let that = this;
		let courseObj;
		let announcementQuery;

		$('.teacher-messages-container').empty();
		$('.student-announcement-container').empty();
		$('.front-course-container').empty();
		$('.profile-page-container').empty();
		$('.booking-page-container').empty();
		$('.week-planner-container').empty();
		$('.course-page-container').empty();

		Course.find(courseId, (course) => {
			$('.front-course-container').empty().template('course-page', {
				course: course,
				role: user.role
			});


			$('.add-student').on('click', addStudent);

			courseObj = course;

			announcementQuery = 'find/{ courses: { $in: ["' + courseObj._id + '"] } }';

			Announcement.find(announcementQuery, announcementsFound);

			function announcementsFound(announcements) {
				prepareDate(announcements);

				$('.course-page-container')
					.empty()
					.template('course-announcement', { announcements: announcements, course: courseObj });
			}

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


		$('.front-course-container').on('click', 'button.remove-item', function() {
			let id = $(this).attr('list-item-id');

			that.removeById(id, courseObj, that, this);
		});

		function addStudent(){
			// Get the username from the textbox
			let username = $('.add-student-input').val();

			// Find student in database
			Student.find('find/{ username: "' + username + '" }', function(result) {

				// If student exists in the database
				if (result.length) {
					let student = result[0];
					let studentsInCourse = courseObj.students;
					let studentIsAlreadyInCourse = false;

					// Loop through the course's students and check if
					// a student with the specified username is already in there.
					studentsInCourse.forEach(function(obj) {
						if(obj.username == username) {
							studentIsAlreadyInCourse = true;
						}
					});

					if (studentIsAlreadyInCourse) {
						// show error msg, student already in course
					} else {
						// Add student to course.
						studentsInCourse.push(student);

						// Add course to student.
						student.courses.push(courseObj);

						// Update the course in the database
						Course.update(courseObj._id, { students: studentsInCourse }, function(){

							// Update the student in the database.
							Student.update(student._id, { courses: student.courses }, function(){

								// Reload the page.
								location.reload();
							});

						})
					}
				} else {
					// show error msg, wrong username
				}
			});
		}
	}

	removeById(id, mainItem, that, domThis) {
		mainItem.students = mainItem.students.filter(function(item) {
			let shouldKeep = id !== item._id;

			if(!shouldKeep) {
				that.removeCourseFromEntity(item, mainItem);
			}

			return shouldKeep;
		});

		var updateObj = { students: mainItem.students };

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