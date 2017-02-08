function loadStudent(callback) {
	$.loadTemplates([
		'frontpage/courses',
		'frontpage/student-announcement',
		'course-page',
		'listed-profile',
		'menu-slider'
	], onTemplatesLoaded);

	function onTemplatesLoaded() {
		new MenuSlider();
		//new AnnouncementOnFrontpage();
		new CoursesOnFrontpage("Student");
		callback();
	}
}
