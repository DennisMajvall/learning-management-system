function loadTeacher(callback) {
	$.loadTemplates([
		'frontpage/courses',
		'frontpage/teacher-message',
		'course-page',
		'listed-profile',
		'menu-slider',
		'booking-page'
	], onTemplatesLoaded);

	function onTemplatesLoaded() {
		new MenuSlider();
		//new BookingPage();
		new TeacherMessage();
		new CoursesOnFrontpage("Teacher");
		callback();
	}
};

