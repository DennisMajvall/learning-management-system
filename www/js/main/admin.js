function loadAdmin(callback) {
	$.loadTemplates([
		'edit/edit-admin',
		'edit/edit-course',
		'edit/edit-education',
		'edit/edit-room',
		'edit/edit-student',
		'edit/edit-teacher',
		'admin-edit',
		'admin-search',
		'admin-frontpage',
		'admin-menu-slider'
	], onTemplatesLoaded, 'templates/admin');

	function onTemplatesLoaded() {
		let category = getCategoryFromUrl('cat');

		new AdminMenuSlider();

		if (category) {
			new AdminSearch(category);
		} else {
			new AdminFrontpage();
		}

		callback();
	}

	function getCategoryFromUrl(parameterName) {
		let result = null;
		let tmp = [];
		let items = location.search.substr(1).split("&");
		for (let index = 0; index < items.length; index++) {
			tmp = items[index].split("=");
			if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
		}
		
		return result;
	}
};
