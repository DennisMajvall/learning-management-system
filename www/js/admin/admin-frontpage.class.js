class AdminFrontpage {
	constructor() {

		$('body div.page-top').template('admin-frontpage', {
            categories: [
                {name: 'Educations', url: 'education'},
                {name: 'Courses', url: 'course'},
                {name: 'Rooms', url: 'room'},
                {name: 'Teachers', url: 'teacher'},
                {name: 'Students', url: 'student'}
            ]
        });
	}
}
