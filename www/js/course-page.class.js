class CoursePage{
	constructor(courseId) {

		Course.find(courseId, function(data, err) {
			// get the first course in collection for testing purposes
			let course = data;
			createTemplate(course);
		});

		function createTemplate(course) {
			// Set the nav-info in navbar to display course name
			$('.nav-info').find('p').text(course.name);

			$('.page-content').template('course-page', {
				teachers: course.teachers,
				students: course.students
			});
		};
	}
}
