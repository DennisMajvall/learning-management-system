function loadTeacher(callback) {
	// Set up routes
	routes['/'] = () => {
		$('section.course-page').empty();
		new TeacherMessage();
		new CoursesOnFrontpage();
	};

	user.courses.forEach((val) => {
		routes['/course-page-' + val] = () => {
			new CoursePage(val);
		};
	});

	$.loadTemplates([
		'frontpage/front-course',
		'frontpage/teacher-message',
		'course-page',
		'listed-profile',
		'booking-page',
		'bookingpage/week-planner',
		'bookingpage/booking-modal',
		'sidebar',
		'profile'
	], onTemplatesLoaded);

	function onTemplatesLoaded() {
		//new WeekPlanner();
		//new BookingPage();
		new Sidebar();
		callback();
	}
}
