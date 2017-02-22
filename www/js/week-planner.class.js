class WeekPlanner{
	constructor(){
		// A variable to store the currently selected room
		var selectedRoom;
		// The currently selected/shown week
		var week = getWorkWeekDates(moment().startOf('isoweek'));

		// Start loadingprocess by loading the room
		loadRoom();
		// Call function that places all eventlisteners for week-planner
		createEventListeners();

		function loadRoom(roomName){
			// Default to Rum 1
			if(!roomName){
				roomName = 'Rum 1';
			}
			setSelectedRoom(roomName, loadWeek);
		}

		function loadWeek(){
			createWeek();
		}

		// createWeek uses the currently selected week and creates an
		// array of objects containing information we want to pass on
		// to the template.  
		function createWeek(){
			var thisWeek = week;
			var resultWeek = [];
		  	var dayArr = ['.','M', 'T', 'O', 'T', 'F'];
		  	var monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 
		  					'Maj', 'Jun', 'Jul', 'Aug', 
		  					'Sep', 'Okt', 'Nov', 'Dec'];

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

		// Get the next workingweek dates from a given weekstart. 
		function getWorkWeekDates(start){
			let returnWeek = [];

			for(let i = 0; i < 5; i++){
				returnWeek.push(start.clone().add(i,'day'));
			}
			return returnWeek;
		}

		// Adds or subtracts 1 week to the variable week.
		function changeWeek(direction){

			if(direction === 'next'){
				let start = week[0].add(1, 'weeks');
				week = getWorkWeekDates(start);
			}
			else{
				let start = week[0].subtract(1, 'weeks');
				week = getWorkWeekDates(start);
			}
		}

		// Finds all bookings made for the currently selected room on a given date
		// executes callback passing a returnObj containing the results and the passed
		// date
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

		// Set the variable selectedRoom
		function setSelectedRoom(roomName, callback){
			Room.find('find/{name:"' + roomName + '"}', function(data,err){
  				selectedRoom = data[0];
  				callback();	
  			});
		}

		// Create a week-planner template passing thisWeek, which contains information
		// about the weeks days and their bookings. 
	  	function createTemplate(thisWeek){
	  		$('.week-planner-container').empty();
			$('.week-planner-container').template('week-planner',{
				week : thisWeek
			});
		}

		// Create a new booking with the arguments passed. 
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
                loadWeek();
            });
        }

        // Set up the booking modal and 
        function prepareModal(date){
			let thisDate = moment(date),
				timeFrom = thisDate.clone().hours(8), 
				timeTo = thisDate.clone().hours(17);

			let dateInfo = {
				date: thisDate,
				from: timeFrom,
				to: timeTo
			};

			let dateInfoFormatted = {
				date: thisDate.format('LL'),
				from: timeFrom.format('LT'),
				to: timeTo.format('LT')
			};

			// Populate courses and the callback createModal
			populateCourses(user.courses, dateInfo, dateInfoFormatted, createModal);
		}

		// Create the bookingModal with given data and show it
		function createModal(dateInfo, dateInfoFormatted, courses){
			new BookingModal(selectedRoom, dateInfoFormatted, courses);
			$('#bookingModal').find('.modal-body').find('.date').data('dateObj', dateInfo);
			$('#bookingModal').modal('show');
		}

		// Populate courses
		function populateCourses(courses, dateInfo, dateInfoFormatted, callback) {
            let coursesIds = courses.map(course => '"' + course + '"');
            let queryString = 'find/{ _id: { $in: [' + coursesIds + '] } }';

            Course.find(queryString, (courses, err) => {
                 callback(dateInfo, dateInfoFormatted, courses);
            });
        }

		// Set up all the eventlisteners for the page. 
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

	  		$('.page-content').on('click', '.book-button', function(){

	  			let selectedCourseId = $('#courseSelect option:selected').attr('data-course-id');
	  			console.log(selectedCourseId);

				Course.find(selectedCourseId, function(data,err){
					let course = data;
					let dateInfo = $('#bookingModal').find('.modal-body').find('.date').data('dateObj');
					let hours = (dateInfo.to.hours() - dateInfo.from.hours()) + 1;
					createBooking(selectedRoom,
								 course, 
								 dateInfo.date,
								 dateInfo.from,
								 dateInfo.to, 
								 hours);
				});
				$('body').removeClass('modal-open');
				$('.modal-backdrop').hide();
			});

	  		$('.page-content').on('click', '.week-schedule-row', function(){
	  			// If the day already have a booking, prevent user from booking on the day
	  			if($(this).find('.bookings').children().length){
	  				return;
	  			}

	  			var clickedDate = ($(this).data('timestamp'));
	  			prepareModal(clickedDate);
	  		});
	  	}
	}
}