function loadStudent(callback) {
	$.loadTemplates([
		'frontpage/courses',
		'frontpage/student-announcement',
		'course-page',
		'listed-profile',
		'menu-slider'
	], onTemplatesLoaded);

	function onTemplatesLoaded() {

		new MenuSlider("Student");
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
