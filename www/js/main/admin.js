function loadAdmin(callback) {
	// Set up routes
	[
		"admin",
		"course",
		"education",
		"room",
		"student",
		"teacher"
	].forEach((category) => {
		delete routes['/' + category];
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

		'admin-create',
		'admin-edit',
		'admin-frontpage',
		'admin-sidebar',
		'admin-search',
		'admin-search-list'
	], onTemplatesLoaded, 'templates/admin');

	function onTemplatesLoaded() {
		new AdminSidebar();
		callback();
	}
}
