class AdminStudentData {

	constructor() {
		var studentsDisplayed;

		Student.find('', function(data, err) {
			if(data.length > 20) {
				studentsDisplayed = data.slice(data.length-20, data.length+1);
			} else {
				studentsDisplayed = data;
			}

			$('body div.page-content').html('').template('admin-student-list', { students: studentsDisplayed });
			
			// Store the students in their respective data-attribute.
			let studentIds = studentsDisplayed.map( student => student._id );
			$('a.student-info').each((index, elem) => {
				let me = $(elem);
				let studentId = me.attr('student-id');
				let foundIndex = studentIds.indexOf(studentId);
				me.data('student', studentsDisplayed[foundIndex]);
			});
		});
    	
		$('body').on('click', 'a.student-info', function() {
			let student = $(this).data('student');
			new AdminStudentEditPage(student);
		});
	}
}
