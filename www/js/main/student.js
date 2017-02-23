function loadStudent(callback) {
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
		new Sidebar("Student");
		new AnnouncementOnFrontpage(user._id);
		//new BookingPage();
		//new WeekPlanner();
		new CoursesOnFrontpage("Student");
		new StudentAlert();
		callback();
	}
}
