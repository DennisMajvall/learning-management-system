function loadTeacher(callback) {
	// Set up routes
	routes['/'] = () => {
		$('.sidebar-slide').removeClass('visible');
		$('section.course-page').empty();
		$('.profile-page-container').empty();
		$('.booking-page-container').empty();
		$('.week-planner-container').empty();
		new TeacherMessage();
		new CoursesOnFrontpage();
	};

	routes['/profile'] = () => {
		$('.sidebar-slide').removeClass('visible');
		new Profile();
	};

	routes['/bookings'] = () => {
		$('.sidebar-slide').removeClass('visible');
		$('section.course-page').empty();
		$('.teacher-messages-container').empty();
		$('.student-announcement-container').empty();
		$('.front-course-container').empty();
		$('.profile-page-container').empty();
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
		'frontpage/teacher-message',
		'course-announcement',
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
