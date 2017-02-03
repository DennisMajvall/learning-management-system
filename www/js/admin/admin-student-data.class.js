class AdminStudentData {

	constructor() {
		var studentsDisplayed;
		let studentIds;

		Student.find('', function(data, err) {
			if(data.length > 20) {
				studentsDisplayed = data.slice(data.length-20, data.length+1);
			} else {
				studentsDisplayed = data;
			}

			$('body div.page-content').html('').template('admin-student-list', { students: studentsDisplayed });

			// Make an array mapping the _id of every student displayed.
			studentIds = studentsDisplayed.map( student => student._id );
		});

		function getStudent(element) {
			let studentId = element.attr('student-id');
			let foundIndex = studentIds.indexOf(studentId);
			return studentsDisplayed[foundIndex];
		}

		$('body').on('click', 'a.student-info', function() {
			new AdminStudentEditPage(getStudent($(this)));
		});
	}
}
