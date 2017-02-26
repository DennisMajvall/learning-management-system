class CoursePage{
	constructor(courseId) {
		$('.teacher-messages-container').empty();
		$('.student-announcement-container').empty();
		$('.front-course-container').empty();
		$('.profile-page-container').empty();
		$('.booking-page-container').empty();
		$('.week-planner-container').empty();

		Course.find(courseId, (course) => {
			$('.front-course-container').empty().template('course-page', {
				course: course,
				role: user.role
			});
		});
	}
}
