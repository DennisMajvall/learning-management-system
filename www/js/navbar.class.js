class Navbar {
	constructor() {
		
		$('body').template('navbar', { });

		// Wait until DOM is ready.
		$(() => {
			$('body').on('click', '.fake-hamb', function() {
				$('.menu-slider').animate({ left: '0' });
				$('.fake-hamb').css({ transform: 'rotate(90deg)' });
			});

			$('body').on('click', '.fake-hamb-2', function() {
				$('.menu-slider').animate({ left: '-400px' }, 200);
				$('.fake-hamb').css({ transform: 'rotate(0deg)' });
			});
		});
	}
}
