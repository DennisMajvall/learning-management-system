class Navbar {
	constructor() {

		$('.navbar').template('navbar', { });

		// Wait until DOM is ready.
		$(() => {

			$(".nav-toggle, .menu-toggle").click(function(e) {
			    e.preventDefault();
			    $(".wrapper").toggleClass("toggled");
			});
		});
	}
}
