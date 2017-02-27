class AdminSidebar {
    constructor() {
        $('.sidebar-container').template('admin-sidebar', {
            header: 'Learning Management System',
            data: 'Database',
            categories: [
                {name: 'Admins', url: 'admin'},
                {name: 'Educations', url: 'education'},
                {name: 'Courses', url: 'course'},
                {name: 'Rooms', url: 'room'},
                {name: 'Teachers', url: 'teacher'},
                {name: 'Students', url: 'student'},
                {name: 'Bookings', url: 'booking'}
            ],
            account: 'Your Account',
            fullname: user.username,
            usersettings: 'Settings',
            password: 'change password',
            logout: 'log out'
        });

        $(".nav-toggle, .menu-toggle").click(function(e) {
            e.preventDefault();
			$(".sidebar-slide").toggleClass("visible");
        });

        $('.sidebar-container').on('click', '.log-out', function() {
            Login.delete(onLogout);
        });

        function onLogout(response, err) {
			location.href = '/';
        }
    }
}
