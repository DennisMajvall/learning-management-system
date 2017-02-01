class AdminTest {

	constructor() {

		var someStudents;

		Student.find('', function(data, err) {
			someStudents = data.slice(data.length-3, data.length+1);
			console.log(someStudents);

			$('body').template('student-list-frontpage', {students: someStudents});
		});
	}
}
