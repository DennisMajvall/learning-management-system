function loadStudent(callback) {
	$.loadTemplates([
		'frontpage/front-course',
		'frontpage/student-announcement',
		'course-page',
		'listed-profile',
		'sidebar'
	], onTemplatesLoaded);

	function onTemplatesLoaded() {
		new Sidebar("Student");
		new AnnouncementOnFrontpage(user._id);
		new CoursesOnFrontpage("Student");
		callback();
	}
}
