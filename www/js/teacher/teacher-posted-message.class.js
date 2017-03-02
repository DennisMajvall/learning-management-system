class TeacherPostedMessage {

    constructor() {

        let userCourses = user.courses.map( course => '"' + course + '"' );
        let announcementQuery = 'find/{ courses: { $in: [' + userCourses + '] } }';

        Announcement.find(announcementQuery, announcementsFound);
        
        function announcementsFound(announcements) {

            console.log(announcements);

            announcements = announcements.filter((announcement) => {                
                return announcement.author._id == user._id;
            });

            sortByTime(announcements);
            prepareCourseNames(announcements);
            prepareTime(announcements);
            createPosts(announcements);
        }

        function sortByTime(announcements) {

            announcements.sort(function(a, b) {
                var timeA = moment(a.timeCreated);
                var timeB = moment(b.timeCreated);
                return timeB - timeA;
            });
        }

        function prepareCourseNames(announcements) {

            announcements.forEach((announcement) => {

                let courseNames = '';
                let lastIndex = announcement.courses.length - 1;

                announcement.courses.forEach((course, index) => {
                    courseNames += course.name;
                    if (index < lastIndex)
                        courseNames += ' & ';
                });

                announcement.courseNames = courseNames;
            });
        }

        function prepareTime(announcements) {
            
            var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];
            var dayArr = ['.','Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

            announcements.forEach((announcement) => {
                let date = new Date(announcement.timeCreated);
                let mins = date.getMinutes();

                if(mins < 10){
                    mins = '0' + mins;
                }
                announcement.dateString = 'Posted: ' + date.getHours() + ':' + mins + ' ' + dayArr[date.getDay()] + ' ' + date.getDate() + ' ' + monthNames[date.getMonth()];
            });
        }

        function createPosts(announcements){
            $('.posted-msg-content').template('teacher-posted-message', { announcements: announcements });
            removeMessage();
        }

        function removeMessage(){

            $('.teacher-messages-container').on('click', '.remove-button', function(){
                let postToDelete = $(this).closest('.posted-msg').attr('post-id');

                Announcement.delete(postToDelete, function() {
                    location.reload();
                });

            });
        }
    }
}
