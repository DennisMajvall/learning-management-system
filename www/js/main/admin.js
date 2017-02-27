function loadAdmin(callback) {
	// Set up routes
	[
		"admin",
		"course",
		"education",
		"room",
		"student",
		"teacher",
		"booking"
	].forEach((category) => {
		routes['/' + category] = () => {
			$('.admin-create-container').empty();
			$('.admin-search-container').empty();
			new AdminSearch(category).init();
		};
	});

	routes['/'] = () => {
		$('.sidebar-slide').removeClass('visible');
		$('.admin-create-container').empty();
		$('.admin-search-container').empty();
		new AdminFrontpage();
	};

	$.loadTemplates([
		'edit/edit-admin',
		'edit/edit-course',
		'edit/edit-education',
		'edit/edit-room',
		'edit/edit-student',
		'edit/edit-teacher',
		'edit/edit-booking',

		'edit/edit-course-relations',
		'edit/edit-education-relations',
		'edit/edit-room-relations',
		'edit/edit-student-relations',
		'edit/edit-teacher-relations',

		'create/create-admin',
		'create/create-course',
		'create/create-education',
		'create/create-room',
		'create/create-student',
		'create/create-teacher',
		'create/create-booking',

		'admin-create',
		'admin-edit',
		'admin-frontpage',
		'admin-sidebar',
		'admin-search',
		'admin-search-list',

		'booking-page',
		'bookingpage/week-planner',
		'bookingpage/booking-modal',
		'bookingpage/booking-info-modal'
	], onTemplatesLoaded, 'templates/admin');

	function onTemplatesLoaded() {
		new AdminSidebar();
		callback();
	}
}
