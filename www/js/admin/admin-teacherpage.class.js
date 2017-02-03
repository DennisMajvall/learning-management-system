class AdminTeacherpage {

	constructor() {
		var someTeachers;

		Teacher.find('', function(data, err) {
			if(data.length > 20) {
				someTeachers = data.slice(data.length-20, data.length+1);
			} else {
				someTeachers = data;
			}

			$('body div.page-content').html('');
			$('body div.page-content').template('admin-teacherpage', {teachers: someTeachers} );
		});

		$('body').on('click', 'a.teacher-info', ()=>{ new AdminTeacherEditPage();});
	}
}
