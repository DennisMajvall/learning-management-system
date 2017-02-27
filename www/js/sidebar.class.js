class Sidebar {

	constructor() {
		window[user.role].find(user._id, (foundUser, err) => {
			let courseHashMap = {};
			let that = this;
			let user = foundUser;
			let educationName = '';
			if (user.role == 'Student') {
				educationName = user.educations[0] ? user.educations[0].name : 'No ongoing education';
			}

			createTemplate();

			function createTemplate() {
				// Make an array mapping the _id as an index for each course.
				that.courseHashMap = {};
				user.courses.forEach((course) => {
					that.courseHashMap[course._id] = course;
				});

				var settingsObj = {
					courses: user.courses,
					header: 'Learning Management System',
					role: user.role.toLowerCase(),
					picture: user.picture,
					education: educationName,
					booking: 'Book a room',
					account: 'Your Account',
					fullname: user.firstname + ' ' + user.lastname,
					usersettings: 'Settings',
					logout: 'log out'
				};

				$('.sidebar-container').empty().template('sidebar', settingsObj);

				$('.nav-toggle, .menu-toggle').click(function(e) {
					e.preventDefault();
					$('.sidebar-slide').toggleClass('visible');
				});
			}
		});

		// Log out
		$('.sidebar-container').on('click', '.log-out', function() {
			Login.delete(onLogout);
		});

		function onLogout(response, err) {
			location.href = '/';
		}
	}
}

