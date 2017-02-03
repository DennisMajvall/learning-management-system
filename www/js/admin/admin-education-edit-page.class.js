class AdminEducationEditPage {
	constructor(education) {
		$('body div.page-content').html('').template('admin-education-edit-page', { education: education });
    }
}
