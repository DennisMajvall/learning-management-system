// List ALL RestEntity classes here
var Admin = new RestEntity('admin');
var Announcement = new RestEntity('announcement');
var Course = new RestEntity('course');
var Education = new RestEntity('education');
var Login = new RestEntity('login');
var Room = new RestEntity('room');
var Student = new RestEntity('student');
var Teacher = new RestEntity('teacher');

// Edit your role here
var role = role || 'Teacher';

// Edit your logged in status here
var loggedIn = true;

(()=>{
	// Put templates used by ALL ROLES here
	$.loadTemplates([
		'navbar',
		'loginpage'
	], start);

	function start() {
		if (!loggedIn) {
			new Loginpage();
			return;
		}
		new Navbar();

		// Load and initialize role-specific templates
		if (role == "Admin")
			loadAdmin(postStart);
		else if (role == "Student")
			loadStudent(postStart);
		else if (role == "Teacher")
			loadTeacher(postStart);
	}

	function postStart() {

	}
})();
