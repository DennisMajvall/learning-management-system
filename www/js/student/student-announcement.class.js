class AnnouncementOnFrontpage {

	constructor(studentID) {

		//Posting all the announcements just for testing.
		//Working on posting only the relevant announcements for the logged in student
		//(with help of the studentID)
		Announcement.find('', function(announcementsToPrint, err) {

        	$('body .page-top').template('student-announcement', { announcements: announcementsToPrint });
		});
	}
}