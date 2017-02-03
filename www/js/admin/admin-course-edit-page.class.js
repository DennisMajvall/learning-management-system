class AdminCourseEditPage {
	constructor(course) {
		$('body div.page-content').html('').template('admin-course-edit-page', { course: course });
    }
}
