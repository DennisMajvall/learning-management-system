class AdminTest {

	constructor() {

		var someStudents;

		Student.find('', function(data, err) {
			if(data.length >= 21) {
				someStudents = data.slice(data.length-20, data.length+1);
			} else {
				someStudents = data;
			}

			$('body').template('student-list-frontpage', {students: someStudents});
		});
	}
}
