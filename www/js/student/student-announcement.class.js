class AnnouncementOnFrontpage {

	constructor(studentID) {

		//Posting all the announcements just for testing.
		//Working on posting only the relevant announcements for the logged in student
		//(with help of the studentID)
		Student.find(studentID+"/getAnnouncements", function(announcements) {

			announcements = announcements.returns;

			let maxAnnounce = Object.keys(announcements).length;
			let announceCount = 0;

			announcements.forEach(function(announcement) {

				let coursesNames = "";
				let lastAnnouncement = false;

				let maxCourses = Object.keys(announcement.courses).length;
				let courseCount = 0;

				announceCount++;

				if(maxAnnounce === announceCount) {
					lastAnnouncement = true;
				}

				Teacher.find(announcement.author, function(teacher) {

					announcement.picture = teacher.picture;

					announcement.author = teacher.firstname + " " + teacher.lastname;

					announcement.courses.forEach(function(courseId) {

						Course.find(courseId, function(course) {

							courseCount++;
							if(courseCount === 1){
								coursesNames += course.name;
							} else {
								coursesNames += ", " + course.name;
							}


							if(courseCount === maxCourses) {
								announcement.courses = coursesNames;
							}

							if(lastAnnouncement === true && maxCourses === courseCount) {
								announcements = announcements.slice(0, 2);

								$('.student-announcement-container').template('student-announcement', {announcements: announcements});
							}
						});
					});
				});
			});
		});
	}
}
