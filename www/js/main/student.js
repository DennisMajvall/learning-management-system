function loadStudent(callback) {
	$.loadTemplates([
		'menu-slider',
		'frontpage/courses',
		'course-page'
	], onTemplatesLoaded);

	function onTemplatesLoaded() {
		new MenuSlider();
		new CoursesOnFrontpage("Student");
		callback();
	}
};