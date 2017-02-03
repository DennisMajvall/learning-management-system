function loadAdmin(callback) {
	$.loadTemplates([
		'admin-course-list',
		'admin-education-list',
		'admin-frontpage',
		'admin-menu-slider',
		'admin-rooms-list',
		'admin-student-list',
		'admin-teacher-list',
		'admin-student-edit-page',
		'admin-teacher-edit-page',
		'admin-course-edit-page',
		'admin-education-edit-page',
		'admin-rooms-edit-page'
	], onTemplatesLoaded, 'templates/admin');

	function onTemplatesLoaded() {
		new AdminMenuSlider();
  		new AdminFrontpage();

		callback();
	}
};
