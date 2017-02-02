// Create som new rest entitites
// (also see classes/rest-entity.class.js)
var Teacher = new RestEntity('teacher');
var Course = new RestEntity('course');
var Student = new RestEntity('student');
var Education = new RestEntity('education');
var Admin = new RestEntity('admin');

// Some utility methods for forms
var formHelpers = new FormHelpers();

// Load html templates
// (also see libs/template.jquery.js)
$.loadTemplates([
  	'modal',
  	'menu-slider-admin',
  	'navbar',
  	'tableFromObject',
    'admin-student-list',
  	'formFromObject',
    'admin-startfrontpage'
], start);

// Start the app
function start() {
  	// Wait for DOM ready
  	$(()=>{
      	// Create the main navbar
        new AdminFrontpage();
        
        // Create the menu
        new MenuAdmin();

        // Create the navbar
        new Navbar();

        menuSlideInAdmin();

    });
}


function menuSlideInAdmin() {

    $('.fake-hamb').click(function() {
        $(".menu-slider-admin").animate({ left: '0' });
        $('.fake-hamb').css({ 'webkit-transform': 'rotate(90deg)' });
        $('.fake-hamb').css({ transform: 'rotate(90deg)' });
    });

    $('.fake-hamb-2').click(function() {
        // $('.fake-hamb-2').css({ transform: 'rotate(90deg)' }, 800);
        $(".menu-slider-admin").animate({ left: '-400px' }, 200);
        $('.fake-hamb').css({ 'webkit-transform': 'rotate(0deg)' });
        $('.fake-hamb').css({ transform: 'rotate(0deg)' });
    });
}
