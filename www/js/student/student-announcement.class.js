class AnnouncementOnFrontpage {

	constructor(studentID) {

		Student.find('find/{_id:"' + studentID + '"}', function(thisStudent, err) {

			let thisStudentsCourses = thisStudent.courses;
			let announcementsWithSameCourses;

			if(thisStudentsCourses.length === 0) {
				announcementsWithSameCourses = 0;
			} else {

				Announcement.find('find/{courses:"' + data.courses + '"}', function(announcementsToPrint, err) {

					$('body div.page-top').html('');
					$('body div.page-top').template('student-announcement', {announcements: announcementsToPrint});
				});
			}
		});
	}
}