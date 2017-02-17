function loadTeacher(callback) {
	$.loadTemplates([
		'navbar',
		'sidebar',
		'frontpage/front-course',
		'frontpage/teacher-message',
		'course-page',
		'listed-profile',
		'booking-page',
		'bookingpage/week-planner'
	], onTemplatesLoaded);

	function onTemplatesLoaded() {
		new Navbar();
		new Sidebar();
		new TeacherMessage();
		new CoursesOnFrontpage("Teacher");
		callback();
	}
}