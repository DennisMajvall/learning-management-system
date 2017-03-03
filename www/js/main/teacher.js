function loadTeacher(callback) {
	// Set up routes
	routes['/'] = () => {
		new TeacherMessage();
		new TeacherPostedMessage();
		new CoursesOnFrontpage();
	};

	routes['/profile'] = () => {
		new Profile();
	};

	routes['/message'] = () => {
		console.log('test');
		new Message();
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
		'frontpage/teacher-message',
		'course-announcement',
		'frontpage/teacher-posted-message',
		'course-page',
		'listed-profile',
		'booking-page',
		'bookingpage/week-planner',
		'bookingpage/booking-modal',
		'bookingpage/booking-info-modal',
		'sidebar',
		'profile',
		'message'
	], onTemplatesLoaded);

	function onTemplatesLoaded() {
		new Sidebar();
		callback();
	}
}
