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

// Global object to hold current user
var user = {};

// For test, set a static role with,
// var role = role || "Admin";
var role;

(()=>{
	// Put templates used by ALL ROLES here
	$.loadTemplates([
		'navbar',
		'loginpage',
		'attend-list'
	], start);



	function start() {

		Login.find((response, err)=>{

			if (!response.user){
				new Loginpage();
				return;
			} else {

				// Save current logged in user
				user = response.user;
				console.log('Current logged in user: ', user);

				new Navbar();

				if (user.role){ // just for test
					if (user.role == "Admin")
						loadAdmin(postStart);
					else if (user.role == "Student")
						loadStudent(postStart);
					else if (user.role == "Teacher")
						loadTeacher(postStart);
					return;
				}
			}
		});
	}

	function postStart() {

	}
})();
