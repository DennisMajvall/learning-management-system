function loadTeacher(callback) {
	$.loadTemplates([
		'frontpage/courses',
		'frontpage/teacher-message',
		'course-page',
		'listed-profile',
		'menu-slider'
	], onTemplatesLoaded);

	function onTemplatesLoaded() {
		new MenuSlider();
		new TeacherMessage();
		new CoursesOnFrontpage("Teacher");
		callback();
	}
};

