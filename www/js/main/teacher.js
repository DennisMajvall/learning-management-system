function loadTeacher(callback) {
	$.loadTemplates([
		'frontpage/front-course',
		'frontpage/teacher-message',
		'course-page',
		'listed-profile',
		'booking-page',
		'bookingpage/week-planner',
		'sidebar'
	], onTemplatesLoaded);

	function onTemplatesLoaded() {
		new MenuSlider();
		//new WeekPlanner();
		//new BookingPage();
		new Sidebar();
		new TeacherMessage();
		new CoursesOnFrontpage("Teacher");
		callback();
	}
}