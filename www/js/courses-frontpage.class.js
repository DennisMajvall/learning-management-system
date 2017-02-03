class CoursesOnFrontpage {

	constructor(role) {
		// When we have login working we won't have to 'find' Students (or Teachers)
		// and instead just populate the courses of the one logged in.
		console.log(role);
		let schema = role == "Student" ? Student : Teacher;
		console.log(schema);
		schema.find('', function(data,err){
			let user = data[0];
			console.log(user);

			populateCourses(user.courses);
		});

		function populateCourses(courses) {
			let coursesIds = courses.map( course => '"' + course._id + '"' );
			let queryString = 'find/{ _id: { $in: [' + coursesIds + '] } }';

			Course.find(queryString, createTemplate);
		}

		function createTemplate(courses, err) {
			$('body').template('courses', { courses: courses });
		}
	}
}
