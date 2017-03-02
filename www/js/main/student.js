function loadStudent(callback) {
	// Set up routes
	routes['/'] = () => {
		$('.sidebar-slide').removeClass('visible');
		$('section.course-page').empty();
		$('.profile-page-container').empty();
		$('.message-container').empty();
		$('.booking-page-container').empty();
		$('.week-planner-container').empty();
		$('.course-page-container').empty();
		new AnnouncementOnFrontpage();
		new CoursesOnFrontpage();
		new StudentAlert();
	};

	routes['/profile'] = () => {
		$('.sidebar-slide').removeClass('visible');
		new Profile();
	};

	routes['/message'] = () => {
		console.log('test');
		$('.sidebar-slide').removeClass('visible');
		new Message();
	};

	routes['/bookings'] = () => {
		$('.sidebar-slide').removeClass('visible');
		$('section.course-page').empty();
		$('.teacher-messages-container').empty();
		$('.student-announcement-container').empty();
		$('.front-course-container').empty();
		$('.profile-page-container').empty();
		$('.course-page-container').empty();
		$('.message-container').empty();
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
		'course-announcement',
		'course-page',
		'listed-profile',
		'sidebar',
		'profile',
		'message',
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
