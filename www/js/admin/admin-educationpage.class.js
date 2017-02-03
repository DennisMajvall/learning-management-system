class AdminEducationpage {

	constructor() {
		var someEducations;

		Education.find('', function(data, err) {
			if(data.length > 20) {
				someEducations = data.slice(data.length-20, data.length+1);
			} else {
				someEducations = data;
			}

			$('body div.page-content').html('');
			$('body div.page-content').template('admin-educationpage', {educations: someEducations} );
		});
	}
}
