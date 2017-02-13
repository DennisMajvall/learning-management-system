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

			$('.front-courses').template('courses', { courses: courses });
		}

		// wait for DOM ready
		$('front-courses').on('click', '.course-panel', function(){
			let id = $(this).data('id');
			let course = that.courseHashMap[id];

			$('.front-announcements').empty();
			$('.front-courses').empty().template('course-page', { course: course });
			
		});
	}
}
