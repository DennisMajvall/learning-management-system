function loadTeacher(callback) {
	$.loadTemplates([
		'frontpage/front-course',
		'frontpage/teacher-message',
		'course-page',
		'listed-profile',
		'menu-slider',
		'booking-page',
		'bookingpage/week-planner'
	], onTemplatesLoaded);

	function onTemplatesLoaded() {
		new MenuSlider();
		//new BookingPage();
		new TeacherMessage();
		new CoursesOnFrontpage("Teacher");
		callback();
	}
};
