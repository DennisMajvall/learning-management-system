function loadTeacher(callback) {
	// Set up routes
	routes['/'] = () => {
		$('.sidebar-slide').removeClass('visible');
		$('section.course-page').empty();
		$('.profile-page-container').empty();
		$('.booking-page-container').empty();
		$('.week-planner-container').empty();
		$('.course-page-container').empty();
		$('.message-container').empty();
		new TeacherMessage();
		new TeacherPostedMessage();
		new CoursesOnFrontpage();
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

	routes['/announcements'] = () => {
		$('.sidebar-slide').removeClass('visible');
		$('section.course-page').empty();
		$('.teacher-messages-container').empty();
		$('.student-announcement-container').empty();
		$('.front-course-container').empty();
		$('.profile-page-container').empty();
		$('.course-page-container').empty();
		$('.booking-page-container').empty();
		$('.week-planner-container').empty();
		new TeacherMessage();
		new TeacherPostedMessage();
	}

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
