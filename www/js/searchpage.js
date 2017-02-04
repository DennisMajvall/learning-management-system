// List ALL RestEntity classes here
var Admin = new RestEntity('admin');
var Announcement = new RestEntity('announcement');
var Course = new RestEntity('course');
var Education = new RestEntity('education');
var Login = new RestEntity('login');
var Room = new RestEntity('room');
var Student = new RestEntity('student');
var Teacher = new RestEntity('teacher');

(()=>{
	// Put templates used by ALL ROLES here
	$.loadTemplates([
		'edit/edit-course',
		'edit/edit-education',
		'edit/edit-room',
		'edit/edit-student',
		'edit/edit-teacher',
		'admin/admin-search',
		'admin/admin-edit'
	], onTemplatesLoaded);

	function onTemplatesLoaded() {
		new AdminSearch(findGetParameter('type'));
	}

	function findGetParameter(parameterName) {
		let result = null;
		let tmp = [];
		let items = location.search.substr(1).split("&");
		for (let index = 0; index < items.length; index++) {
			tmp = items[index].split("=");
			if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
		}
		
		return result;
	}

})();
