class Loginpage {
    constructor() {
        $('body').template('loginpage',{
            "text": "The login page!"
        });

		$('form.login-form').on('submit', function(event) {
			event.preventDefault();

			Login.find(onGet);
		});

		function onGet(response, err) {
			console.log('onGet', response, 'errorMessage', err);

			let username = 'test@test.test';
			let password = 'test'

			Login.create({
				username: username,
				password: password
			}, onLogin);
		}

		function onLogin(response, err) {
			console.log('onLogin', response, 'errorMessage', err);

			if (response.user) {
				Login.delete(onLogout);
			}
		}

		function onLogout(response, err) {
			console.log('onLogout', response, 'errorMessage', err);
		}
    }
}