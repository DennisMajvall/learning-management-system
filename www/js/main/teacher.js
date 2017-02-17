function loadTeacher(callback) {
	$.loadTemplates([
		'sidebar',
		'frontpage/front-course',
		'frontpage/teacher-message',
		'course-page',
		'listed-profile',
		'booking-page',
		'bookingpage/week-planner'
	], onTemplatesLoaded);

	function onTemplatesLoaded() {
		new Sidebar();
		new TeacherMessage();
		new CoursesOnFrontpage("Teacher");
		callback();
	}
}