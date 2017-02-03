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

        $('li a.category-Educations').click(()=>{ new AdminEducationList(); });
        $('li a.category-Courses').click(()=>{ new AdminCourseList(); });
        $('li a.category-Rooms').click(()=>{ new AdminRoomsList(); });
        $('li a.category-Teachers').click(()=>{ new AdminTeacherList(); });
        $('li a.category-Students').click(()=>{ new AdminStudentList(); });
	}
}
