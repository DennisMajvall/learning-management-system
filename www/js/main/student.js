function loadStudent(callback) {
	$.loadTemplates([
		'menu-slider',
		'frontpage/courses',
	], onTemplatesLoaded);

	function onTemplatesLoaded() {
		new MenuSlider();
		new CoursesOnFrontpage("Student");
		callback();
	}
};