function loadStudent(callback) {
	$.loadTemplates([
		'frontpage/front-course',
		'frontpage/student-announcement',
		'frontpage/student-alert',
		'course-page',
		'listed-profile',
		'sidebar',
		'profile'
	], onTemplatesLoaded);

	function onTemplatesLoaded() {
		new Sidebar("Student");
		new AnnouncementOnFrontpage(user._id);
		new CoursesOnFrontpage("Student");
		new StudentAlert();
		callback();
	}
}
