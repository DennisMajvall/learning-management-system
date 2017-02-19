class WeekPlanner{
	constructor(){
		// return an array of date objects for start (monday)
		// and end (friday) of the current week

		createTemplate( createThisWeek() );
		createEventListeners();

		function createThisWeek(){
		  	var thisWeek = [];
		  	var dayArr = ['.','M', 'T', 'O', 'T', 'F'];
		  	var now = new Date();

		  	now.setHours(0,0,0,0);

		 	// Get the previous Monday
		 	var monday = new Date(now);
		  	monday.setDate(monday.getDate() - monday.getDay() + 1);

		  	// Get the current week counting from previous monday
		  	for(let i = 0; i < 5; i++){
		  		var date = new Date();
		  		date.setDate(monday.getDate() + i);
		  		date.setHours(0,0,0,0);
		  		thisWeek.push({
		  			dateObj: date,
		  			date: date.getDate(),
		  			day: dayArr[date.getDay()]
		  		});
		  	}

		  	return thisWeek;
		}

	  	function createTemplate(thisWeek){
			$('.week-planner-container').template('week-planner',{
				week : thisWeek
			});
		}

		function createEventListeners(){

	  		$('.page-content').on('click', '#prev', function(e){
	  			e.preventDefault();
	  			e.stopPropagation();
	  			alert('prev');
	  		});

	  		$('.page-content').on('click', '#next', function(e){
	  			e.preventDefault();
	  			e.stopPropagation();
	  			alert('next');
	  		});
	  	}
	}
}