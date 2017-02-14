function loadStudent(callback) {
	$.loadTemplates([
		'frontpage/courses',
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

		// alert('Järp');

		$(".nav-toggle, .menu-toggle").click(function(e) {
		    e.preventDefault();
		    $(".wrapper").toggleClass("toggled");
		});
	}
}
