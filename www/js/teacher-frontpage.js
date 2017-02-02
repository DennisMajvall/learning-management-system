// REST-ENTITES
var Teacher = new RestEntity('teacher');
var Course = new RestEntity('course');
var Student = new RestEntity('student');
var Announcement = new RestEntity('announcement');

$.loadTemplates([
	'teacher-mess'
], start);


function start() {
    // Wait for DOM ready
    $(() => {
        
        // teacher-frontpage.class.js
        new TeacherTest();
    });
}