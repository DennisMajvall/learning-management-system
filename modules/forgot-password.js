var nodemailer = require('nodemailer');

module.exports = function(username, password) {
	// Create a SMTP transporter object
	let transporter = nodemailer.createTransport({
	    service: 'Gmail',
	    auth: {
	        user: 'lernia.suw16',
	        pass:  'lernia123'
	    },
	    debug: true // include SMTP traffic in the logs
	}, {
	    // default message fields

	    // sender info
	    from: 'Learning Management System <lernia.suw16@gmail.com>'
	    // headers: {
	    //     'X-Laziness-level': 1000 // just an example header, no need to use this
	    // }
	});

	console.log('SMTP Configured');

	// Message object
	var message = {

	    // Comma separated list of recipients
	    to: username,

	    // Subject of the message
	    subject: 'New password from LMS', //

	    // plaintext body
	    text: 'Hello. Your new password is: ' + password,

	    // HTML body
	    html: '<p>Hello. Your new password is: <b>' + password + '</b></p>'
	};

	console.log('Sending Mail');
	transporter.sendMail(message, (error, info) => {
	    if (error) {
	        console.log('Error occurred');
	        console.log(error.message);
	        return;
	    }
	    console.log('Message sent successfully!');
	    console.log('Server responded with', info.response);
	    transporter.close();
	});
}