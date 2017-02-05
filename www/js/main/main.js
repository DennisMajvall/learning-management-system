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
var role = role || 'Student';

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

				// Load and initialize role-specific templates
				if (role == "Admin")
					loadAdmin(postStart);
				else if (role == "Student")
					loadStudent(postStart);
				else if (role == "Teacher")
					loadTeacher(postStart);
			}
		});
	}

	function postStart() {

	}
})();
