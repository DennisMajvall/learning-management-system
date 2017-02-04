class AdminFrontpage {
	constructor() {

		$('body div.page-top').template('admin-frontpage', {
            categories: [
                {name: 'Admins', url: 'admin'},
                {name: 'Courses', url: 'course'},
                {name: 'Educations', url: 'education'},
                {name: 'Rooms', url: 'room'},
                {name: 'Students', url: 'student'},
                {name: 'Teachers', url: 'teacher'}
            ]
        });
	}
}
