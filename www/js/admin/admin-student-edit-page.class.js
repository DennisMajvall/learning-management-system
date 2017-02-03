class AdminStudentEditPage {

	constructor(student) {

       	$('body div.page-content').html('');
		$('body div.page-content').template('admin-student-edit-page', { student: student });
    }
}
