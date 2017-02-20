class CoursesOnFrontpage {

	constructor() {
		// When we have login working we won't have to 'find' Students (or Teachers)
		// and instead just populate the courses of the one logged in.

		let courseHashMap = {};
		let that = this;

		populateCourses(user.courses);

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

			$('.front-course-container').template('front-course', { courses: courses });
		}


		$('.front-course-container').on('click', '.show-course', function() {
			e.preventDefault();
			let id = $(this).data('id');
			let course = that.courseHashMap[id];

			$('.student-announcement-container').empty();
			$('.teacher-messages-container').empty();
			$(".sidebar-slide").removeClass("visible");
			$('.front-course-container').empty().template('course-page', {
				course: course,
				role: user.role.toLowerCase()
			});
		});
	}
}
