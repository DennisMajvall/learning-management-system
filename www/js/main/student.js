function loadStudent(callback) {
	// Set up routes
	routes['/'] = () => {
		$('.sidebar-slide').removeClass('visible');
		$('section.course-page').empty();
		new AnnouncementOnFrontpage(user._id);
		new CoursesOnFrontpage();
		new StudentAlert();
	};

	routes['/profile'] = () => {
		new Profile().init();
	};

	routes['/bookings'] = () => {
		$('section.course-page').empty();
		$('.teacher-messages-container').empty();
		$('.student-announcement-container').empty();
		$('.front-course-container').empty();
		new WeekPlanner();
		new BookingPage();
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
		'bookingpage/booking-modal',
		'bookingpage/booking-info-modal'
	], onTemplatesLoaded);

	function onTemplatesLoaded() {
		//new BookingPage();
		//new WeekPlanner();
		new Sidebar();
		callback();
	}
}
