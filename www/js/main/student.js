function loadStudent(callback) {
	// Set up routes
	routes['/'] = () => {
		$('.sidebar-slide').removeClass('visible');
		$('section.course-page').empty();
		new AnnouncementOnFrontpage(user._id);
		new CoursesOnFrontpage();
		new StudentAlert();
	};

	user.courses.forEach((val) => {
		routes['/course-page-' + val] = () => {
			$('.sidebar-slide').removeClass('visible');
			new CoursePage(val);
		};
	});

	$.loadTemplates([
		'frontpage/front-course',
		'frontpage/student-announcement',
		'frontpage/student-alert',
		'course-page',
		'listed-profile',
		'sidebar',
		'profile',
		'booking-page',
		'bookingpage/week-planner',
		'bookingpage/booking-modal'
	], onTemplatesLoaded);

	function onTemplatesLoaded() {
		//new BookingPage();
		//new WeekPlanner();
		new Sidebar();
		callback();
	}
}
