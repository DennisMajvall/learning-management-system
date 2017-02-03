function loadTeacher(callback) {
	$.loadTemplates([
		'menu-slider',
		'frontpage/courses',
		'frontpage/teacher-message'
	], onTemplatesLoaded);

	function onTemplatesLoaded() {
		new MenuSlider();
		new TeacherMessage();
		new CoursesOnFrontpage("Teacher");

		callback();
	}
};