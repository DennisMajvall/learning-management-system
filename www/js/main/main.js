// List ALL RestEntity classes here
var Admin = new RestEntity('admin');
var Announcement = new RestEntity('announcement');
var Course = new RestEntity('course');
var Education = new RestEntity('education');
var Login = new RestEntity('login');
var Room = new RestEntity('room');
var Student = new RestEntity('student');
var Teacher = new RestEntity('teacher');
var Booking = new RestEntity('booking');

// Global objects
var user = {};
var routes = {};

(()=>{
	// Put templates used by ALL ROLES here
	$.loadTemplates([
		'navbar',
		'loginpage'
	], start);

	function start() {
		Login.find((response, err) => {
			if (!response.user) {
				new Loginpage();
				return;
			} else {
				// Save currently logged in user
				user = response.user;

				new Navbar();

				switch (user.role) {
					case "Admin":
						loadAdmin(postStart);
						break;
					case "Student":
						loadStudent(postStart);
						break;
					case "Teacher":
						loadTeacher(postStart);
						break;
				}
			}
		});
	}

	function postStart() {
		new Router();
	}
})();
