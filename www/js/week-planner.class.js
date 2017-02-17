class WeekPlanner{
	constructor(){
		// return an array of date objects for start (monday)
		// and end (sunday) of week based on supplied 
		// date object or current date
		function startAndEndOfWeek(date) {
		  	// If no date object supplied, use current date
		  	var now = date? new Date(date) : new Date();

		  	// set time to some convenient value
		  	now.setHours(0,0,0,0);

		 	// Get the previous Monday
		 	var monday = new Date(now);
		  	monday.setDate(monday.getDate() - monday.getDay() + 1);

		  	// Get next Sunday
		  	var sunday = new Date(now);
		  	sunday.setDate(sunday.getDate() - sunday.getDay() + 7);

		  	// Return array of date objects
		  	return [monday, sunday];
		}

		function CreateTemplate(week){
			$('.page-content').template('week-planner',{week});
		}
	}
}