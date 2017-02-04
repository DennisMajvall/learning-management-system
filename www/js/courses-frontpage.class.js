class CoursesOnFrontpage {

	constructor(role) {
		// When we have login working we won't have to 'find' Students (or Teachers)
		// and instead just populate the courses of the one logged in.
		let schema = role == "Student" ? Student : Teacher;

		schema.find('', function(data,err){
			let user = data[0];

			populateCourses(user.courses);
		});

		function populateCourses(courses) {
			let coursesIds = courses.map( course => '"' + course._id + '"' );
			let queryString = 'find/{ _id: { $in: [' + coursesIds + '] } }';

			Course.find(queryString, createTemplate);
		}

		function createTemplate(courses, err) {
			$('.page-content').template('courses', { courses: courses });
		}

		// wait for DOM ready
		$(() => {
			$('body').on('click', '.course-panel', function(){
				var id = $(this).data('id');
				$('.page-top').empty();
				$('.page-content').empty();
				$('.page-content').template('specific-course', { course: course });
			});
		});
	}
}
