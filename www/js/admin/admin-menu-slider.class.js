class AdminMenuSlider {
    constructor(){
        $('body').template('admin-menu-slider',{
            header: 'Startpage',
            data: 'Database',
            categories: [
                {name: 'Admins', url: 'admin'},
                {name: 'Educations', url: 'education'},
                {name: 'Courses', url: 'course'},
                {name: 'Rooms', url: 'room'},
                {name: 'Teachers', url: 'teacher'},
                {name: 'Students', url: 'student'}
            ],
            account: 'Your Account',
            fullname: user.username,
            usersettings: 'Settings',
            password: 'change password',
            logout: 'log out'
        });

        $('.body').on('click', '.log-out', function(){
            Login.delete(onLogout);
        });

        function onLogout(response, err) {
            console.log('onLogout', response, 'errorMessage', err);
            location.reload();
        }
    }
}
