class MenuSlider {

	constructor() {
		$('body').template('menu-slider',{
			header: 'Startpage',
			education: 'Education Name',
			courses: [
				{name: 'Coursename 1'},
				{name: 'Coursename 2'},
				{name: 'Coursename 3'},
			],
			booking: 'Book a room',
			account: 'Your Account',
			usersettings: 'Settings',
			password: 'change password',
			logout: 'log out'
		});

		$('.menu-slider').on('click', '.log-out', function(){
			Login.delete(onLogout);
		});

		function onLogout(response, err) {
			console.log('onLogout', response, 'errorMessage', err);
			location.reload();
		}
	}

}
