function loadTeacher(callback) {
	$.loadTemplates([
		'frontpage/front-course',
		'frontpage/teacher-message',
		'course-page',
		'listed-profile',
		'sidebar'
	], onTemplatesLoaded);

	function onTemplatesLoaded() {
		new Sidebar();
		new TeacherMessage();
		new CoursesOnFrontpage("Teacher");
		callback();
	}
};
