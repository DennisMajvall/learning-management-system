class AnnouncementOnFrontpage {

	constructor(studentID) {
		Student.find(studentID+"/getAnnouncements", function(announcements) {
			announcements = announcements.returns;
			let maxAnnounce = Object.keys(announcements).length;
			let announceCount = 0;

			announcements.forEach(function(announcement) {
				let coursesNames = "";
				let maxCourses = Object.keys(announcement.courses).length;
				let courseCount = 0;

				announceCount++;
				let lastAnnouncement = maxAnnounce == announceCount;

				Teacher.find(announcement.author, function(teacher) {
					announcement.picture = teacher.picture;
					announcement.author = teacher.firstname + " " + teacher.lastname;
					announcement.courses.forEach(function(courseId) {

						Course.find(courseId, function(course) {

							courseCount++;
							if(courseCount === 1) {
								coursesNames += course.name;
							} else {
								coursesNames += ", " + course.name;
							}

							if(lastAnnouncement === true && maxCourses === courseCount) {
								announcement.courses = coursesNames;
								console.log(announcements);
								announcements = announcements.slice(0, 2);
								$('.student-announcement-container').empty().template('student-announcement', {announcements: announcements});
							}
						});
					});
				});
			});
		});
	}
}
