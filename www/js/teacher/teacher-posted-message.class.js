class TeacherPostedMessage {

    constructor() {

        let userCourses = user.courses.map( course => '"' + course + '"' );
        let announcementQuery = 'find/{ courses: { $in: [' + userCourses + '] } }';

        Announcement.find(announcementQuery, announcementsFound);
        
        function announcementsFound(announcements) {

            announcements.forEach((announcement) => {                
                checkForThisUserPost(announcement);
                console.log(announcement);
            });

            prepareCourseNames(announcements);
            prepareDate(announcements);
            createPosts(announcements);
        }

        function checkForThisUserPost(announcement){

            for(var props in announcement.author){

                    let postAuthor = announcement.author._id,
                        currentUser = user._id;

                        if(postAuthor === currentUser){
                            console.log('matched');
                        } else {
                            console.log('not matched');
                        }   

        // I'm Stuck! How do I get only the currentUsers posts!

                }
        }


        function prepareCourseNames(announcements) {

            announcements.forEach((announcement) => {

                let courseNames = '';
                let lastIndex = announcement.courses.length - 1;

                announcement.courses.forEach((course, index) => {
                    // console.log(announcement);
                    courseNames += course.name;
                    if (index < lastIndex)
                        courseNames += ' & ';
                });

                announcement.courseNames = courseNames;
            });
        }

        function prepareDate(announcements) {
            var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];
            var dayArr = ['.','Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

            announcements.forEach((announcement) => {
                let date = new Date(announcement.timeCreated);
                announcement.dateString = 'Posted: ' + date.getHours() + ':' + date.getMinutes() + ' ' + dayArr[date.getDay()] + ' ' + date.getDate() + ' ' + monthNames[date.getMonth()];
            });
        }

        function createPosts(announcements){
            $('.posted-msg-content').template('teacher-posted-message', { announcements: announcements });

        }

    }
}
