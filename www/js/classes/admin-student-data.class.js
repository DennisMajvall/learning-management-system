class AdminStudentData {

	constructor() {

		var someStudents;

		Student.find('', function(data, err) {
			if(data.length > 20) {
				someStudents = data.slice(data.length-20, data.length+1);
			} else {
				someStudents = data;
			}

			$('body div.page-content').html('');
			$('body div.page-content').template('admin-student-list', {students: someStudents});
		});
	}
}
