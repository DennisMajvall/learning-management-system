class CoursePage{
	constructor(courseId) {
		$('.teacher-messages-container').empty();
		$('.student-announcement-container').empty();
		$('.front-course-container').empty();

		Course.find(courseId, (course) => {
			$('.front-course-container').empty().template('course-page', {
				course: course,
				role: user.role.toLowerCase()
			});
		});
	}
}
