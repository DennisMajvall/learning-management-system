// Create som new rest entitites
// all entities should be moved to a single file.
var Teacher = new RestEntity('teacher');
var Course = new RestEntity('course');
var Student = new RestEntity('student');

$.loadTemplates([
	'courses-frontpage'
], start);

function start() {
	$(()=>{
		new CoursesOnFrontpage();
	});
}
