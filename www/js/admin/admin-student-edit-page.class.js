class AdminStudentEditPage {
	constructor(student) {
		$('body div.page-content').html('').template('admin-student-edit-page', { student: student });
    }
}
