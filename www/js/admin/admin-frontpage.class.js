class AdminFrontpage {

	constructor() {

		$('body div.page-top').template('admin-frontpage', {
            categories: [
                {name: 'Educations'},
                {name: 'Courses'},
                {name: 'Rooms'},
                {name: 'Teachers'},
                {name: 'Students'}
            ]
        });

        $('li a.category-Educations').click(()=>{ new AdminEducationpage(); });
        $('li a.category-Courses').click(()=>{ new AdminCoursepage(); });
        $('li a.category-Rooms').click(()=>{ new AdminRoomspage(); });
        $('li a.category-Teachers').click(()=>{ new AdminTeacherpage(); });
        $('li a.category-Students').click(()=>{ new AdminStudentData(); });
	}
}
