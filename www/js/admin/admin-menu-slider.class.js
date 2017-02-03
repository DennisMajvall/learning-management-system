class AdminMenuSlider {
    constructor(){
        $('body').template('admin-menu-slider',{
            header: 'Startpage',
            data: 'Database',
            categories: [
                {name: 'Educations'},
                {name: 'Courses'},
                {name: 'Rooms'},
                {name: 'Teachers'},
                {name: 'Students'}
            ],
            account: 'Your Account',
            usersettings: 'Settings',
            password: 'change password',
            logout: 'log out'
        });

        $('li a.category-Students').click(()=> { new AdminStudentData(); });
    }
}
