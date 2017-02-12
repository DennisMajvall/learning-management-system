class TeacherMessage {

    constructor() {
        // Find which courses this teacher have access to. 
        // When we have login working we won't have to 'find' Teachers
        // and instead just populate the courses of the one logged in.
        let coursesToPublishTo = [];

        let teacher = user;
        populateCourses(teacher.courses);
    

        function populateCourses(courses) {
            let coursesIds = courses.map(course => '"' + course + '"');
            let queryString = 'find/{ _id: { $in: [' + coursesIds + '] } }';

            Course.find(queryString, (courses, err) => {
                createTemplate(courses);
                createEventListeners();
            });
        }

        function createTemplate(courses) {
            $('.page-top').template('teacher-message', { courses: courses });
        }

        function createEventListeners() {
            $('.page-top').on('click', '.send-button', makeAnnouncement);

            // Select a Course
            $('.page-top').on("click", 'li', function(e) {

                $(this).find('span').toggleClass('glyphicon glyphicon-ok checked-course');

                changeValue($(this).closest('li').attr('course-id'));
                e.stopPropagation();
            });

            // Select All Courses
            $('.page-top').on("click", '.select-all', function(e) {

                $('.course-list').find('span').toggleClass('glyphicon glyphicon-ok checked-course');

                $(".course-list").each(function() {
                    changeValue($(this).attr('course-id'));
                });

                e.stopPropagation();
            });

            function changeValue(courseId) {

                // Adds or Removes the course from the array
                let foundIndex = coursesToPublishTo.indexOf(courseId);

                if (foundIndex > -1) {
                    coursesToPublishTo.splice(foundIndex, 1);
                } else {
                    coursesToPublishTo.push(courseId);
                }
                console.log(coursesToPublishTo);
            }
        }

        function makeAnnouncement() {
            var author = teacher._id;
            var textInput = $('textarea').val();

            Announcement.create({
                author: author,
                message: textInput,
                courses: coursesToPublishTo
            }, function() {
                console.log(textInput);
            });

            $('textarea').val('');
            $('.msg-sent').text("Message has been sent!");
            setTimeout(function(){
                $('.msg-sent').text('');
            }, 3000);
        }
    }
}
