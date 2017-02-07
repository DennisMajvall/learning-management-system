// List ALL RestEntity classes here
var Admin = new RestEntity('admin');
var Announcement = new RestEntity('announcement');
var Course = new RestEntity('course');
var Education = new RestEntity('education');
var Login = new RestEntity('login');
var Room = new RestEntity('room');
var Student = new RestEntity('student');
var Teacher = new RestEntity('teacher');

// For test, set a static role with,
// var role = role || "Admin";
var role;

(()=>{
	// Put templates used by ALL ROLES here
	$.loadTemplates([
		'navbar',
		'loginpage'
	], start);



	function start() {

		Login.find((response, err)=>{

			if (!response.user){
				new Loginpage();
				return;
			} else {
				new Navbar();

				if (role){ // just for test
					console.log("Static role is defined");
					if (role == "Admin")
						loadAdmin(postStart);
					else if (role == "Student")
						loadStudent(postStart);
					else if (role == "Teacher")
						loadTeacher(postStart);
					return;
				}

				// Load and initialize role-specific templates
				if (response.user.role == "Admin")
					loadAdmin(postStart);
				else if (response.user.role == "Student")
					loadStudent(postStart);
				else if (response.user.role == "Teacher")
					loadTeacher(postStart);
			}
		});
	}

	function postStart() {

	}
})();
