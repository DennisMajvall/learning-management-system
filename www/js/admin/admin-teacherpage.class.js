class AdminTeacherpage {

	constructor() {
		var teachersDisplayed;
		let teacherIds;

		Teacher.find('', function(data, err) {
			if(data.length > 20) {
				teachersDisplayed = data.slice(data.length-20, data.length+1);
			} else {
				teachersDisplayed = data;
			}

			$('body div.page-content').html('').template('admin-teacherpage', { teachers: teachersDisplayed });

			// Make an array mapping the _id of every teacher displayed.
			teacherIds = teachersDisplayed.map( teacher => teacher._id );
		});

		function getTeacher(element) {
			let teacherId = element.attr('teacher-id');
			let foundIndex = teacherIds.indexOf(teacherId);
			return teachersDisplayed[foundIndex];
		}

		$('body').on('click', 'a.teacher-info', function() {
			new AdminTeacherEditPage(getTeacher($(this)));
		});
	}
}
