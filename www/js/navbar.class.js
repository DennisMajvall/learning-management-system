class Navbar {
	constructor() {

		$('body').template('navbar', { });

		// Wait until DOM is ready.
		$(() => {
			$('body').on('click', '.hamburger', function() {
				$('.menu-slider').animate({ left: '0' });
				$('.hamburger').css({ transform: 'rotate(90deg)' });
			});

			$('body').on('click', '.hamburger-2', function() {
				$('.menu-slider').animate({ left: '-400px' }, 200);
				$('.hamburger').css({ transform: 'rotate(0deg)' });
			});
		});
	}
}
