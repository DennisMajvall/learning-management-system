class CoursesTest {

	constructor() {
		Student.find('', function(data, err) {
			var student = data[0];
			console.log(student);

			$('body').template('course-frontpage', { courses: student.courses });
			return;
		});
	}
}
