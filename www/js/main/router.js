class Router {
	constructor() {
		var self = this;

		// when clicking a link run the click handler
		$(document).on('click','a',function(e){
			var aTag = $(this);
			self.clickHandler(aTag, e);
		});

		// when using back/forward buttons call actOnRoute
		window.onpopstate = () => {
			self.actOnRoute(location.pathname);
		}

		// on initial load
		self.actOnRoute(location.pathname);
	}

	clickHandler(aTag, eventObj) {
		var href = aTag.attr('href'), handleThisRoute = false;

		// check if the href is among
		// the routes this router should handle
		handleThisRoute = routes.hasOwnProperty(href);

		if(!handleThisRoute) {
			return;
		}

		// use pushState (change url + add to history)
		// (the two first arguments are meaningless but required)
		history.pushState(null, '', href);

		// prevent the browser default behaviour (the reload of the page)
		eventObj.preventDefault();

		// run the function connected to the route
		this.actOnRoute(href);
	}

	actOnRoute(route) {
		// find the function corresponding to the route
		var func = routes[route];

		if (func)
			func();
	}
}