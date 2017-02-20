class WeekPlanner{
	constructor(){
		// return an array of date objects for start (monday)
		// and end (friday) of the current week
		var selectedRoom;
		var now = new Date();
		var monday = new Date(now);
		monday.setDate(monday.getDate() - monday.getDay() + 1);

		loadRoom();
		createEventListeners();

		function loadRoom(roomName){
			if(!roomName){
				roomName = 'Rum 1';
			}
			setSelectedRoom(roomName, loadWeek);
		}

		function loadWeek(){
			createWeek(monday);
		}

		function createWeek(mondayDate){
			var thisWeek = [];
		  	var dayArr = ['.','M', 'T', 'O', 'T', 'F'];

		  	// Get the current week counting from previous monday
		  	for(let i = 0; i < 5; i++){
		  		var date = new Date();
		  		date.setDate(mondayDate.getDate() + i);
		  		date.setHours(0,0,0,0);

		  		findBookings(date, function(returnObj){
			  		thisWeek.push({
			  			timestamp: returnObj.date.getTime(),
			  			date: returnObj.date.getDate(),
			  			day: dayArr[returnObj.date.getDay()],
			  			bookings: returnObj.bookings
			  		});
			  		if(thisWeek.length === 5){
			  			thisWeek.sort(function(a,b){
			  				return a.timestamp- b.timestamp;
			  			});
			  			createTemplate(thisWeek);
			  		}
		  		});
		  	}
		  	return thisWeek;
		}

		function findBookings(date, callback){
			Booking.find(`find/{ $and: [
				{ room: "` + selectedRoom._id + `" },
				{ date: ` + date.getTime() +  ` }
			]}`, function(data,err){
				var returnObj = {
					date: date,
					bookings: data
				};
				callback(returnObj);
			});
		}

		function setSelectedRoom(roomName, callback){
			Room.find('find/{name:"' + roomName + '"}', function(data,err){
  				selectedRoom = data[0];
  				callback();	
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
	  			createWeek(monday);
	  		});

	  		$('.page-content').on('click', '#next', function(e){
	  			e.preventDefault();
	  			e.stopPropagation();
	  			
	  			monday.setDate(monday.getDate() + 7);
	  			createWeek(monday);
	  		});

	  		$('.page-content').on('change', '#roomSelect', function(){
	  			var roomName = $(this).val();
	  			setSelectedRoom(roomName, loadWeek);
	  			createWeek(monday);
	  		});

	  		$('.page-content').on('click', '.week-schedule-row', function(){
	  			// If the day already have a booking, prevent user from booking on the day
	  			if($(this).find('.bookings').children().length){
	  				console.log('quitting');
	  				return;
	  			}
	  			var clickedDate = ($(this).data('timestamp'));

  				var date = new Date(clickedDate);
  				var timeFrom = new Date(date.setHours(8)); 
  				var timeTo = new Date(date.setHours(17)); 
  				var hours = (timeTo.getHours() - timeFrom.getHours()) + 1;
  				date.setHours(0,0,0,0);

  				Course.find('', function(data,err){
  					var course = data[0];
  					console.log('kurs: ', course);
  					createBooking(selectedRoom, course, date,timeFrom,timeTo, hours);
  				});

	  			function createBooking(room, course, date, timeFrom, timeTo, hours) {
		            Booking.create({
		                room: room._id,
		                course: course,
		                date: date.getTime(),
		                timeFrom: timeFrom.getTime(),
		                timeTo: timeTo.getTime(),
		                bookedBy: user.username,
		                hours: hours
		            }, function() {
		                console.log('Bokade ' + selectedRoom.name + ' för ' + course.name + ' från ' + timeFrom + ' ' + 'till ' + '' + timeTo);
		            });
		        }
		        createWeek(monday);
	  		});
	  	}
	}
}