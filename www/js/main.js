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
    'header',
    'menu-slider',
    'teacher-mess',
    'modal',
    'navbar',
    'restTestOutput',
    'tableFromObject',
    'formFromObject'
], start);

// Start the app
function start() {
    // Wait for DOM ready
    $(() => {
        // Run the rest tests
        // new RestTests();
        // new TeacherTest();

        // Create the menu
        new Menu();

        // Create the navbar
        new Navbar();

        menuSlideIn();

    });
}


function menuSlideIn() {

    $('.fake-hamb').click(function() {
        $(".menu-slider").animate({ left: '0' });
        $('.fake-hamb').css({ 'webkit-transform': 'rotate(90deg)' });
        $('.fake-hamb').css({ transform: 'rotate(90deg)' });
    });

    $('.fake-hamb-2').click(function() {
        // $('.fake-hamb-2').css({ transform: 'rotate(90deg)' }, 800);
        $(".menu-slider").animate({ left: '-400px' }, 200);
        $('.fake-hamb').css({ 'webkit-transform': 'rotate(0deg)' });
        $('.fake-hamb').css({ transform: 'rotate(0deg)' });
    });
}
