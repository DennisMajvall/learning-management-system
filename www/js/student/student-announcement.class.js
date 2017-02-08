class AnnouncementOnFrontpage {

	constructor(studentID) {

		//Posting all the announcements just for testing.
		//Working on posting only the relevant announcements for the logged in student
		//(with help of the studentID)
		Student.find(studentID+"/getAnnouncements", function(announcementsToPrint) {

			announcementsToPrint = announcementsToPrint.returns;

			let numberOfAnnouncements = Object.keys(announcementsToPrint).length;
			let announcementsDone = 0;

			announcementsToPrint.forEach(function(announcement) {

				let coursesNames = "";
				let lastAnnouncement = false;

				let numberOfCourses = Object.keys(announcement.courses).length;
				let coursesDone = 0;

				announcementsDone++;

				if(numberOfAnnouncements === announcementsDone) {
					lastAnnouncement = true;
				}

				Teacher.find(announcement.author, function(teacher) {

					announcement.picture = teacher.picture;

					announcement.author = teacher.firstname + " " + teacher.lastname;

					announcement.courses.forEach(function(courseId) {

						Course.find(courseId, function(course) {

							coursesDone++;
							if(coursesDone === 1){
								coursesNames += course.name;
							} else {
								coursesNames += ", " + course.name;
							}


							if(coursesDone === numberOfCourses) {
								announcement.courses = coursesNames;
							}

							if(lastAnnouncement === true && numberOfCourses === coursesDone) {
								$('body .page-top').template('student-announcement', {announcements: announcementsToPrint});
							}
						});
					});
				});
			});
		});
	}
}
