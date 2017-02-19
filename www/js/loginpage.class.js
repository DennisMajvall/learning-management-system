class Loginpage {
    constructor() {
        $('body').empty().template('loginpage',{
            "text": "The login page!"
        });

		$('form.login-form').on('submit', function(event) {
			event.preventDefault();
			Login.find(onGet);
		});

		$('#forgot-password').on('click', function(event) {
			event.preventDefault();
			$('#modal-username').text($('#username').val());
		});

		$('#send-password').on('click', function(event) {
			$('#myModal').modal('hide');

			if (!$('#username').val()) {
				return;
			}
			$.ajax({
				url: '/forgot-password/' + $('#username').val(),
				type: "GET",
				dataType: "json",
				success: function(error){
					console.log(error);
				},
				error: function(error){
					console.log(error);
				}
			});
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
				location.reload();
			} else {
				$('#error-message').text('Wrong username or password');
			}
		}
	}
}
