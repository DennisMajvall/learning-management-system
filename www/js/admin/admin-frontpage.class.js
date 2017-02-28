class AdminFrontpage {
	constructor() {

		$('.admin-search-container').template('admin-frontpage', {
            categories: [
                {name: 'Admins', url: 'admin'},
                {name: 'Courses', url: 'course'},
                {name: 'Educations', url: 'education'},
                {name: 'Rooms', url: 'room'},
                {name: 'Students', url: 'student'},
                {name: 'Teachers', url: 'teacher'},
                {name: 'Bookings', url: 'booking'},
                {name: 'Announcements', url: 'announcement'}
            ]
        });
	}
}
