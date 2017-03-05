class TeacherMessage {

    constructor() {
        this.eventListenersAdded = false;
        let coursesToPublishTo = [];
        let populatedCourses;
        populateCourses(user.courses);

        function populateCourses(courses) {
            let coursesIds = courses.map(course => '"' + course + '"');
            let queryString = 'find/{ _id: { $in: [' + coursesIds + '] } }';

            Course.find(queryString, (courses, err) => {
                populatedCourses = courses;
                createTemplate(courses);
                createEventListeners();
            });
        }

        function createTemplate(courses) {
            $('.teacher-messages-container').empty().template('teacher-message', { courses: courses });
        }

        function createEventListeners() {
            $('.teacher-messages-container').on('click', '.send-button', makeAnnouncement);

            // Select a Course
            $('.teacher-messages-container').on('click', 'li.course-list', toggleIconOne);

            $('.teacher-messages-container').on('click', 'li.all-courses', toggleIconAll);


            function toggleIconOne(e){
                $(this).find('span').toggleClass('glyphicon glyphicon-ok checked-course');
                addOrRemoveOne($(this).attr('course-id'));
                e.stopPropagation();
            }

            function toggleIconAll(e){
                let add = $('.teacher-messages-container li.all-courses').hasClass('select-all');
                addOrRemoveAll($('.dropdown-menu .course-list'), add);

                if(add) {
                    $('.course-list').find('span').addClass('glyphicon glyphicon-ok checked-course');
                    $('.teacher-messages-container li.all-courses a').text('Remove All');
                } else {
                    $('.course-list').find('span').removeClass('glyphicon glyphicon-ok checked-course');
                    $('.teacher-messages-container li.all-courses a').text('Select All');
                }

                $('.teacher-messages-container li.all-courses').toggleClass('select-all remove-all');
                e.stopPropagation();
            }

            function addOrRemoveAll(courses, add){
                courses.each(function() {
                    let courseId = $(this).attr('course-id');
                    let foundIndex = coursesToPublishTo.indexOf(courseId);

                    if (foundIndex > -1) {
                        if(add){
                            return;
                        }
                        coursesToPublishTo.splice(foundIndex, 1);
                    } else {
                        if(add){
                            coursesToPublishTo.push(courseId)
                        }
                    }
                });
            }

            function addOrRemoveOne(courseId) {
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
                coursesToPublishTo = [];
                createTemplate(populatedCourses);
                new TeacherPostedMessage();
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
