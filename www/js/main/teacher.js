function loadTeacher(callback) {
	// Set up routes
	routes['/'] = () => {
		$('section.course-page').empty();
		new TeacherMessage();
		new CoursesOnFrontpage();
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
		'bookingpage/booking-info-modal',
		'sidebar',
		'profile'
	], onTemplatesLoaded);

	function onTemplatesLoaded() {
		new Sidebar();
		callback();
	}
}
