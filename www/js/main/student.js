function loadStudent(callback) {
	$.loadTemplates([
		'frontpage/courses',
		'frontpage/student-announcement',
		'menu-slider',
		'frontpage/specific-course'
	], onTemplatesLoaded);

	function onTemplatesLoaded() {
		new MenuSlider();
		new CoursesOnFrontpage("Student");
		callback();
	}
};
