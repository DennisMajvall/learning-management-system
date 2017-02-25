class Profile {
	constructor () {
		this.init();
	}

	renderTemplate () {
		window[user.role].find(user._id, (foundUser, err) => {
			// Clear the page
			$('section.course-page').empty();
			$('.student-alert-container').empty();
			$('.student-announcement-container').empty();
			$('.teacher-messages-container').empty();
			$('.front-course-container').empty();

			// Add html template for profile
			$('.profile-page-container').empty().template('profile', { currentUser: foundUser });
			new UploadPicture();
		});
	}

	init () {
		// Load template for profile page
		this.renderTemplate();

		let container = $('.profile-page-container');

		// Save changes to db
		container.on('click', '.save-profile', () => {
			let tempUser = {};

			// get values from form
			tempUser.firstname = 	container.find('input[name="firstname"]').val();
			tempUser.lastname = 	container.find('input[name="lastname"]').val();
			tempUser.phonenumber =	container.find('input[name="phonenumber"]').val();
			tempUser.picture = 		container.find('input[name="picture"]').val();

			// update global user object
			user = Object.assign({}, user, tempUser);

			// update the db and reload page
			window[user.role].update(user._id, tempUser, () => {
				location.reload();
			});
		});
	}
}

