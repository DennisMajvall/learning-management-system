

// Create som new rest entitites
// (also see classes/rest-entity.class.js)
var Kitten = new RestEntity('kitten');
var Owner = new RestEntity('owner');
var Login = new RestEntity('login');
var Teacher = new RestEntity('teacher');
var Course = new RestEntity('course');
var Education = new RestEntity('education');
var Admin = new RestEntity('admin');
var Student = new RestEntity('student');

// Some utility methods for forms
var formHelpers = new FormHelpers();

// Load html templates
// (also see libs/template.jquery.js)
$.loadTemplates([
    'startpage'
], start);

// Start the app
function start() {
    // Wait for DOM ready
    $(() => {
        // Load startpage
        new Startpage();
    });
}
