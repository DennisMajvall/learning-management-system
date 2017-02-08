class AnnouncementOnFrontpage {

	constructor(studentID) {

		//Posting all the announcements just for testing.
		//Working on posting only the relevant announcements for the logged in student
		//(with help of the studentID)
		Student.find(studentID+"/getAnnouncements", function(announcementsToPrint){

			announcementsToPrint = announcementsToPrint.returns;

			let numberOfAnnouncements = Object.keys(announcementsToPrint).length;
			let announcementsDone = 0;

			announcementsToPrint.forEach(function(announcement){

				let coursesNames = "";
				let lastAnnouncement = false;

				let numberOfCourses;
				let coursesDone = 0;

				announcementsDone++;

				if(numberOfAnnouncements === announcementsDone){
					numberOfCourses = Object.keys(announcement.courses).length;
					lastAnnouncement = true;
				}

				Teacher.find(announcement.author, function(teacher){

					announcement.author = teacher.firstname + " " + teacher.lastname;

					announcement.courses.forEach(function(courseId){

						Course.find(courseId, function(course, doLast){

							coursesNames += " " + course.name;
							coursesDone++;

							if(lastAnnouncement === true && numberOfCourses === coursesDone){

								announcement.courses = coursesNames;

								$('body .page-top').template('student-announcement', {announcements: announcementsToPrint});
							}
						});
					});
				});
			});
		});
	}
}