// Create som new rest entitites
// (also see classes/rest-entity.class.js)
var Kitten = new RestEntity('kitten');
var Owner = new RestEntity('owner');
var Login = new RestEntity('login');
var Teacher = new RestEntity('teacher');
var Course = new RestEntity('course');
var Education = new RestEntity('education');
var Admin = new RestEntity('admin');

// Some utility methods for forms
var formHelpers = new FormHelpers();

// Load html templates
// (also see libs/template.jquery.js)
$.loadTemplates([
    'header',
    'menu-slider',
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

        // Create the main navbar
        // new MainNavbar();

        // Run the rest tests
        // new RestTests();

        // Create the menu
        new Menu();

        // slide in (animate) the menu 
        menuSlideIn();

    });
}


function menuSlideIn() {

    $('.temp-x').click(function() {

        // retrieve current state, initially undefined
        var state = $(this).data('state');

        // toggle the state - first click will make this "true"
        state = !state;

        if (state) {
            $(".menu-slider").animate({ left: '-400px' }, 200);
        } else {
            $(".menu-slider").animate({ left: '10px' }, 200);
        }

        // put the state back
        $(this).data('state', state);

    });

}
