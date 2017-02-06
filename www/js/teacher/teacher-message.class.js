class TeacherMessage {

    constructor() {
        // Find which courses this teacher have access to. 
        // When we have login working we won't have to 'find' Teachers
        // and instead just populate the courses of the one logged in.
		let teacher = null;
		let coursesToPublishTo = [];

        Teacher.find('', function(data, err) {
            teacher = data[0];
            populateCourses(teacher.courses);
        });

        function populateCourses(courses) {
            let coursesIds = courses.map(course => '"' + course._id + '"');
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

			$('.page-top').on('click', '.dropdown-menu input', function() {
				let courseId = $(this).attr('course-id');

				// Adds or Removes the course from the array
				let foundIndex = coursesToPublishTo.indexOf(courseId);
				if (foundIndex > -1) {
					coursesToPublishTo.splice(foundIndex, 1);
				} else {
					coursesToPublishTo.push(courseId);
				}
			});
		}

        function makeAnnouncement() {
			var author = teacher._id;
			var textInput = $('.teacher-input-area').val();
			var authorName = teacher.firstname + ' ' + teacher.lastname;
			var displayMessage = textInput + ' - (Posted by ' + authorName + ')';

			Announcement.create({
				author: author,
				message: displayMessage,
				courses: coursesToPublishTo
			}, function() {
				console.log(displayMessage);
			});
        }
    }
}
