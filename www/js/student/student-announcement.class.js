class AnnouncementOnFrontpage {

	constructor() {
		let courseIds = user.courses.map( course => '"' + course + '"' );
		let announcementQuery = 'find/{ courses: { $in: [' + courseIds + '] } }';

		Announcement.find(announcementQuery, announcementsFound);

		function announcementsFound(announcements) {
			
			sortByTime(announcements);
			let limitAnnouncements = announcements.splice(0,2);

			prepareCourseNames(limitAnnouncements);
			prepareDate(limitAnnouncements);

			$('.student-announcement-container')
				.empty()
				.template('student-announcement', { announcements: limitAnnouncements });
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

        function sortByTime(announcements) {

            announcements.sort(function(a, b) {
                var timeA = moment(a.timeCreated);
                var timeB = moment(b.timeCreated);
                return timeB - timeA;
            });
        }

	}
}
