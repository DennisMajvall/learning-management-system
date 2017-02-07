class AnnouncementOnFrontpage {

	constructor(studentID) {

		//Posting all the announcements just for testing.
		//Working on posting only the relevant announcements for the logged in student
		//(with help of the studentID)
		Student.find(studentID+"/getAnnouncements", function(announcementsToPrint) {

			announcementsToPrint = announcementsToPrint.returns;

        	$('body .page-top').template('student-announcement', {announcements: announcementsToPrint});
		});
	}
}