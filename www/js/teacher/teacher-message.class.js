class TeacherMessage {

    constructor() {
        this.eventListenersAdded = false;
        let coursesToPublishTo = [];
        populateCourses(user.courses);

        function populateCourses(courses) {
            let coursesIds = courses.map(course => '"' + course + '"');
            let queryString = 'find/{ _id: { $in: [' + coursesIds + '] } }';

            Course.find(queryString, (courses, err) => {
                createTemplate(courses);
                createEventListeners();
            });
        }

        function createTemplate(courses) {
            $('.teacher-messages-container').empty().template('teacher-message', { courses: courses });
        }

        function createEventListeners() {
            $('.teacher-messages-container')
            .off('click', '.send-button', makeAnnouncement)
             .on('click', '.send-button', makeAnnouncement);

            // Select a Course
            $('.teacher-messages-container')
            .off('click', 'li', toggleIconOne)
             .on('click', 'li', toggleIconOne);

            $('.teacher-messages-container')
            .off('click', '.select-all', toggleIconAll)
             .on('click', '.select-all', toggleIconAll);


            function toggleIconOne(e){
                $(this).find('span').toggleClass('glyphicon glyphicon-ok checked-course');
                changeValue($(this).closest('li').attr('course-id'));
                e.stopPropagation();
            }

            function toggleIconAll(e){
                $('.course-list').find('span').addClass('glyphicon glyphicon-ok checked-course');

                $('.course-list').each(function() {
                    changeValue($(this).attr('course-id'));
                });

                e.stopPropagation();
            }


            function changeValue(courseId) {
				if (!courseId)
					return;

                // Adds or Removes the course from the array
                let foundIndex = coursesToPublishTo.indexOf(courseId);

                if (foundIndex > -1) {
                    coursesToPublishTo.splice(foundIndex, 1);
                } else {
                    coursesToPublishTo.push(courseId);
                }
            }
        }

        function makeAnnouncement() {
            var author = user._id;
            var textInput = $('textarea').val();

            Announcement.create({
                author: author,
                message: textInput,
                courses: coursesToPublishTo
            }, function() {
                location.reload();
            });

            $('textarea').val('');
            $('.msg-sent').html(
                '<div class="alert alert-success alert-dismissible" role="alert">' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                'You successfully sent the message: "' + textInput + '" to your students.' +
                '</div>')
            .fadeOut(3000);

        }
    }
}
