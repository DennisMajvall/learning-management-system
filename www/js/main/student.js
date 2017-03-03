function loadStudent(callback) {
	// Set up routes
	routes['/'] = () => {
		new AnnouncementOnFrontpage();
		new CoursesOnFrontpage();
		new StudentAlert();
	};

	routes['/profile'] = () => {
		new Profile();
	};

	routes['/bookings'] = () => {
		new WeekPlanner();
		new BookingPage();
	};

	user.courses.forEach((val) => {
		routes['/course-page-' + val] = () => {
			new CoursePage(val);
		};
	});

	$.loadTemplates([
		'frontpage/front-course',
		'frontpage/student-announcement',
		'frontpage/student-alert',
		'course-announcement',
		'course-page',
		'listed-profile',
		'sidebar',
		'profile',
		'booking-page',
		'bookingpage/week-planner',
		'bookingpage/booking-modal',
		'bookingpage/booking-info-modal'
	], onTemplatesLoaded);

	function onTemplatesLoaded() {
		new Sidebar();
		callback();
	}
}
