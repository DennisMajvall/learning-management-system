class WeekPlanner{
	constructor(){
		// return an array of date objects for start (monday)
		// and end (friday) of the current week

		var now = new Date();
		var monday = new Date(now);
		monday.setDate(monday.getDate() - monday.getDay() + 1);

		createTemplate( createWeek(monday) );
		createEventListeners();

		function createWeek(mondayDate){
		  	var thisWeek = [];
		  	var dayArr = ['.','M', 'T', 'O', 'T', 'F'];

		  	// Get the current week counting from previous monday
		  	for(let i = 0; i < 5; i++){
		  		var date = new Date();
		  		date.setDate(mondayDate.getDate() + i);
		  		date.setHours(0,0,0,0);

		  		var bookings = findBookings(date);

		  		thisWeek.push({
		  			timestamp: date.getTime(),
		  			date: date.getDate(),
		  			day: dayArr[date.getDay()],
		  			bookings: bookings
		  		});
		  	}

		  	return thisWeek;
		}

		function findBookings(){
			Booking.find('', function(data,err){
				var bookings = data;
			});
		}

	  	function createTemplate(thisWeek){
	  		$('.week-planner-container').empty();
			$('.week-planner-container').template('week-planner',{
				week : thisWeek
			});
		}

		function createEventListeners(){

	  		$('.page-content').on('click', '#prev', function(e){
	  			e.preventDefault();
	  			e.stopPropagation();
	  			
	  			monday.setDate(monday.getDate() - 7);
	  			createTemplate( createWeek(monday) );
	  		});

	  		$('.page-content').on('click', '#next', function(e){
	  			e.preventDefault();
	  			e.stopPropagation();
	  			
	  			monday.setDate(monday.getDate() + 7);
	  			createTemplate( createWeek(monday) );
	  		});

	  		$('.page-content').on('click', '.week-schedule-row', function(){
	  			var clickedDate = ($(this).data('timestamp'));
	  			console.log(clickedDate);

	  			Room.find('', function(data,err){
	  				var roomToBook = data[0];
	  				var date = new Date(clickedDate);
	  				var timeFrom = new Date(date.setHours(8)); 
	  				var timeTo = new Date(date.setHours(17)); 

	  				createBooking(roomToBook,date,timeFrom,timeTo);
	  			});

	  			function createBooking(room, date, timeFrom, timeTo) {

		            Booking.create({
		                room: room._id,
		                date: date,
		                timeFrom: timeFrom,
		                timeTo: timeTo,
		                bookedBy: user.username
		            }, function() {
		                console.log('Bokade ' + room.name + ' från ' + timeFrom + ' ' + 'till ' + '' + timeTo);
		            });
		        }
	  		});
	  	}
	}
}