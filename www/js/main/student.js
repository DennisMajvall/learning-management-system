function loadStudent(callback) {
	$.loadTemplates([
		'frontpage/courses',
		'course-page',
		'frontpage/student-announcement',
		'menu-slider'
	], onTemplatesLoaded);

	function onTemplatesLoaded() {
		new MenuSlider();
		new AnnouncementOnFrontpage();
		new CoursesOnFrontpage("Student");
		callback();
	}
};
