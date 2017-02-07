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
				announcementsDone++;

				Teacher.find(announcement.author, function(teacher){
					announcement.author = teacher.firstname + " " + teacher.lastname;

					let numberOfCourses;
					let coursesDone = 0;
					let lastAnnouncement = false;

					announcement.courses.forEach(function(courseId){

						if(numberOfAnnouncements === announcementsDone){
							numberOfCourses = Object.keys(announcement.courses).length;
							lastAnnouncement = true;
						}

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