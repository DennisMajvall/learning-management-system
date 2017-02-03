function loadTeacher(callback) {
	$.loadTemplates([
		'menu-slider',
		'frontpage/courses',
		'course-page',
		'frontpage/teacher-message'
	], onTemplatesLoaded);

	function onTemplatesLoaded() {
		new MenuSlider();
		// new TeacherMessage();
		new CoursesOnFrontpage("Teacher");
		callback();
	}
};

