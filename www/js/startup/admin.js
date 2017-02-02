function loadAdmin(callback) {
	$.loadTemplates([
		'admin-coursepage',
		'admin-educationpage',
		'admin-frontpage',
		'admin-menu-slider',
		'admin-roomspage',
		'admin-student-list',
		'admin-teacherpage',
	], onTemplatesLoaded, 'templates/admin');

	function onTemplatesLoaded() {
		new AdminMenuSlider();
  		new AdminFrontpage();

		callback();
	}
};