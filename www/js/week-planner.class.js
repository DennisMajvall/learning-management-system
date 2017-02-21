class WeekPlanner{
	constructor(){
		var selectedRoom;
		var week = getWeekDates(moment().startOf('isoweek'));

		loadRoom();
		createEventListeners();

		function loadRoom(roomName){
			if(!roomName){
				roomName = 'Rum 1';
			}
			setSelectedRoom(roomName, loadWeek);
		}

		function loadWeek(){
			createWeek();
		}

		function createWeek(){
			var thisWeek = week;
			var resultWeek = [];
		  	var dayArr = ['.','M', 'T', 'O', 'T', 'F'];
		  	var monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 
		  					'Maj', 'Jun', 'Jul', 'Aug', 
		  					'Sep', 'Okt', 'Nov', 'Dec'];

		  	// Get the current week counting from previous monday
		  	for(let i = 0; i < 5; i++){
		  		var date = thisWeek[i];
		  		findBookings(date, function(returnObj){
			  		resultWeek.push({
			  			timestamp: returnObj.date.format('x'),
			  			date: returnObj.date.date(),
			  			day: dayArr[returnObj.date.day()],
			  			weekNum: returnObj.date.week(),
			  			month: monthArr[returnObj.date.month()],
			  			bookings: returnObj.bookings
			  		});
			  		if(resultWeek.length === 5){
			  			resultWeek.sort(function(a,b){
			  				return a.timestamp- b.timestamp;
			  			});
			  			createTemplate(resultWeek);
			  		}
		  		});
		  	}
		}

		function getWeekDates(start){
			let returnWeek = [];

			for(let i = 0; i < 5; i++){
				returnWeek.push(start.clone().add(i,'day'));
			}
			return returnWeek;
		}

		function changeWeek(direction){

			if(direction === 'next'){
				let start = week[0].add(1, 'weeks');
				console.log('next', week);
				week = getWeekDates(start);
			}
			else{
				let start = week[0].subtract(1, 'weeks');
				console.log('prev', week);
				week = getWeekDates(start);
			}
		}

		function findBookings(date, callback){
			Booking.find(`find/{ $and: [
				{ room: "` + selectedRoom._id + `" },
				{ date: ` + date.format('x') +  ` }]}`
				,function(data,err){
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
	  			
	  			changeWeek('prev');
	  			createWeek();
	  		});

	  		$('.page-content').on('click', '#next', function(e){
	  			e.preventDefault();
	  			e.stopPropagation();
	  			
	  			changeWeek('next');
	  			createWeek();
	  		});

	  		$('.page-content').on('change', '#roomSelect', function(){
	  			var roomName = $(this).val();
	  			setSelectedRoom(roomName, loadWeek);
	  			createWeek();
	  		});

	  		$('.page-content').on('click', '.week-schedule-row', function(){
	  			// If the day already have a booking, prevent user from booking on the day
	  			if($(this).find('.bookings').children().length){
	  				console.log('quitting');
	  				return;
	  			}
	  			var clickedDate = ($(this).data('timestamp'));
	  			presentModal(clickedDate);

	  			function presentModal(date){
	  				let thisDate = moment(date),
	  					timeFrom = thisDate.clone().hours(8), 
  						timeTo = thisDate.clone().hours(17),
  						hours = (timeTo.hours() - timeFrom.hours()) + 1;

	  				$('#bookingModal').find('.modal-title').text('Boka ' + selectedRoom.name);

	  				$('#bookingModal').find('.modal-body').empty().append(
	  					'<p> Datum: ' + thisDate.format('LL') + ' </p>' + 
	  					'<p> Från klockan: ' + timeFrom.format('LT') + '</p>' + 
	  					'<p> Till klockan: ' + timeTo.format('LT') + '</p>'
	  				);
	  				$('#bookingModal').modal('show');

	  				$('.page-content').on('click', '.book-button', function(){
	  					Course.find('', function(data,err){
  							var course = data[0];
  							createBooking(selectedRoom, course, thisDate,timeFrom,timeTo, hours);
  							$('#bookingModal').modal('hide');
  						});
	  				});
	  			}

  				// var date = moment(clickedDate);
  				// var timeFrom = date.clone().hour(8); 
  				// var timeTo = date.clone().hour(17);  
  				// var hours = (timeTo.hours() - timeFrom.hours()) + 1;

  				// Course.find('', function(data,err){
  				// 	var course = data[0];
  				// 	createBooking(selectedRoom, course, date,timeFrom,timeTo, hours);
  				// });

	  			function createBooking(room, course, date, timeFrom, timeTo, hours) {
		            Booking.create({
		                room: room._id,
		                course: course,
		                date: date.format('x'),
		                timeFrom: timeFrom.format('x'),
		                timeTo: timeTo.format('x'),
		                bookedBy: user.username,
		                hours: hours
		            }, function() {
		                console.log('Bokade ' + selectedRoom.name + 
		                ' för ' + course.name + ' från ' + timeFrom + ' ' + 
		                'till ' + '' + timeTo);
		            });
		            loadWeek();
		        }
	  		});
	  	}
	}
}