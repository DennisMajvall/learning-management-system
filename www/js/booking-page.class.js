class BookingPage{
	constructor(){
		Room.find('',function(data,err){
			var rooms = data;
			createTemplate(rooms);
		});

		function createTemplate(rooms){
			$('.booking-page-container').template('booking-page',{rooms: rooms});
		}
	}
}