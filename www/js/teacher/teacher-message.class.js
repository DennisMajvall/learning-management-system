class TeacherMessage {

    constructor() {

        // Find which courses this teacher have access to. 
        // When we have login working we won't have to 'find' Teachers
        // and instead just populate the courses of the one logged in.

        Teacher.find('', function(data, err) {
            let teacher = data[0];
            populateCourses(teacher.courses);
            makeAnnouncement(teacher._id);
        });

        function populateCourses(courses) {
            let coursesIds = courses.map(course => '"' + course._id + '"');
            let queryString = 'find/{ _id: { $in: [' + coursesIds + '] } }';
            Course.find(queryString, createTemplate);
        }

        function createTemplate(courses, err) {
            $('body').template('teacher-message', { courses: courses });
        }

        function makeAnnouncement(teacher) {

            Teacher.find('find/{_id:"' + teacher + '"}', function(teacher) {

                $('body').on('click', '.send-button', function() {

                    // HEY!! Här kör det fast, har suttit helt för länge med samma problem. 
                    var selCourse = $('.dropdown-menu').val($(this).html());
                    // Det funkar som jag vill förutom detta: ->
                    // Vill kunna få ut dropdown value. Helst att kunna plocka ut coursens id (utan find).
                    // Announcement skapas (rad 42) - och courses id ska in som en array (rad 45). How in hell gör jag detta smidigast?

                    var author = teacher[0]._id;
                    var textInput = $('.teacher-input-area').val();
                    var authorName = teacher[0].firstname + ' ' + teacher[0].lastname;
                    var displayMessage = textInput + ' - (Posted by ' + authorName + ')';

                    Announcement.create({
                        author: author,
                        message: displayMessage,
                        courses: ["588f5e8a205b985ee4187f9b"]
                    }, function() {
                        console.log(displayMessage);
                    });
                });
            });
        }


    }
}
