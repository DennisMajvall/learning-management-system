class AnnouncementOnFrontpage {

	constructor() {
		let courseIds = user.courses.map( course => '"' + course + '"' );
		let announcementQuery = 'find/{ courses: { $in: [' + courseIds + '] } }';

		Announcement.find(announcementQuery, announcementsFound);

		function announcementsFound(announcements) {
			prepareCourseNames(announcements);
			prepareDate(announcements);

			$('.student-announcement-container')
				.empty()
				.template('student-announcement', { announcements: announcements });
		}

		function prepareCourseNames(announcements) {
			announcements.forEach((announcement) => {
				let courseNames = '';
				let lastIndex = announcement.courses.length - 1;

				announcement.courses.forEach((course, index) => {
					courseNames += course.name;
					if (index < lastIndex)
						courseNames += ', ';
				});

				announcement.courseNames = courseNames;
			});
		}

		function prepareDate(announcements) {
			var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
				"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
			];

			announcements.forEach((announcement) => {
				let date = new Date(announcement.timeCreated);
				announcement.dateString = date.getDate() + ' ' + monthNames[date.getMonth()];
			});
		}

	}
}
