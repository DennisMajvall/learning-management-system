class AdminTeacherEditPage {
	constructor(teacher) {
       	$('body div.page-content').html('').template('admin-teacher-edit-page', { teacher: teacher });
    }
}
