class AdminFrontpage {

	constructor() {

		$('body').template('admin-startfrontpage', {
            categories: [
                {name: 'Educations'},
                {name: 'Courses'},
                {name: 'Rooms'},
                {name: 'Teachers'},
                {name: 'Students'}
            ]
        });
	}
}
