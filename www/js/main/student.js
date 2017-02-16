function loadStudent(callback) {
	$.loadTemplates([
		'navbar',
		'frontpage/front-course',
		'frontpage/student-announcement',
		'course-page',
		'listed-profile',
		'sidebar'
	], onTemplatesLoaded);

	function onTemplatesLoaded() {
		new Navbar();
		new Sidebar("Student");
		new AnnouncementOnFrontpage(user._id);
		new CoursesOnFrontpage("Student");
		callback();
	}
}
