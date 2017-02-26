class CoursesOnFrontpage {

	constructor() {
		let courseHashMap = {};

		populateCourses(user.courses);

		function populateCourses(courses) {
			let coursesIds = courses.map( course => '"' + course + '"' );
			let queryString = 'find/{ _id: { $in: [' + coursesIds + '] } }';

			Course.find(queryString, createTemplate);
		}

		function createTemplate(courses, err) {
			// Make an array mapping the _id as an index for each course.
			this.courseHashMap = {};
			courses.forEach((course) => {
				this.courseHashMap[course._id] = course;
			});

			$('.front-course-container').empty().template('front-course', { courses: courses });
		}
	}
}
