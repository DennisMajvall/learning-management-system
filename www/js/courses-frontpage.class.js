class CoursesOnFrontpage {

	constructor() {
		// When we have login working we won't have to 'find' Students (or Teachers)
		// and instead just populate the courses of the one logged in.

		let courseHashMap = {};
		let that = this;
		let currentUser = user;

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

			$('.front-course-container').template('front-course', { courses: courses });
		}


		$('.front-course-container').on('click', '.show-course', function(){
			let id = $(this).data('id');
			let course = that.courseHashMap[id];

			$('.student-announcement-container').empty();
			$('.front-course-container').empty().template('course-page', { course: course });
		});
	}
}
