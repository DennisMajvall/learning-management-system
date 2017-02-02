class AdminCoursepage {

	constructor() {
		var someCourses;

		Course.find('', function(data, err) {
			if(data.length > 20) {
				someCourses = data.slice(data.length-20, data.length+1);
			} else {
				someCourses = data;
			}

			$('body div.page-content').html('');
			$('body div.page-content').template('admin-coursepage', {courses: someCourses} );
		});
	}
}

