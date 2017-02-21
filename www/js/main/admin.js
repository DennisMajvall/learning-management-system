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
			new AdminSearch(category).init();
		};
	});

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
		new AdminFrontpage();

		callback();
	}

	function getParameterFromUrl(parameterName) {
		let result = null;
		let tmp = [];
		let items = location.search.substr(1).split("&");
		for (let index = 0; index < items.length; index++) {
			tmp = items[index].split("=");
			if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
		}

		return result;
	}
}
