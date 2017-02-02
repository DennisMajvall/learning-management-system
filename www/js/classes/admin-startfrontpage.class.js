class AdminFrontpage {

	constructor() {

		$('body div.page-top').template('admin-startfrontpage', {
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
