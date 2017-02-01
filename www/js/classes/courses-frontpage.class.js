class CoursesOnFrontpage {

	constructor() {
		// When we have login working we won't have to 'find' Students (or Teachers)
		// and instead just populate the courses of the one logged in.
		Student.find('', function(data, err) {
			let student = data[0];

			populateCourses(student.courses);
		});

		function populateCourses(courses) {
			let coursesIds = courses.map( course => '"' + course._id + '"' );
			let queryString = 'find/{ _id: { $in: [' + coursesIds + '] } }';

			Course.find(queryString, createTemplate);
		}

		function createTemplate(courses, err) {
			$('body').template('courses-frontpage', { courses: courses });
		}
	}
}
