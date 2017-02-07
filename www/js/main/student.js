function loadStudent(callback) {
	$.loadTemplates([
		'frontpage/courses',
		'course-page',
		'frontpage/student-announcement',
		'menu-slider'
	], onTemplatesLoaded);

	function onTemplatesLoaded() {

		new MenuSlider("Student");
		new AnnouncementOnFrontpage(user._id);
		new CoursesOnFrontpage("Student");
		callback();
	}
}
