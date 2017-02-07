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
					// console.log('onGet: \n', response, 'errorMessage: ', err);

					var username = $('form.login-form #username').val();
				 	var password = $('form.login-form #password').val();

					Login.create({
						username: username,
						password: password
					}, onLogin);
				}

				function onLogin(response, err) {
					// console.log('onLogin', response, 'errorMessage', err);

					if (response.user) {
						console.log('You successfuly logged in!');
						location.reload();
					}
				}
		}
}
