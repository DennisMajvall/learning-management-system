class Navbar {
	constructor() {

		$('.navbar').template('navbar', { });

		// Wait until DOM is ready.
		$(() => {
			// $('.navbar').on('click', '.hamburger', function() {
			// 	$('.menu-slider').animate({ left: '0' });
			// 	$('.hamburger').css({ transform: 'rotate(90deg)' });
			// });

			// $('.navbar').on('click', '.hamburger-2', function() {
			// 	$('.menu-slider').animate({ left: '-400px' }, 200);
			// 	$('.hamburger').css({ transform: 'rotate(0deg)' });
			// });
		});
	}
}