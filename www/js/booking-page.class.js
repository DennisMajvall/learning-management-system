class BookingPage{
	constructor(){
		Room.find('',function(data,err){
			var rooms = data;
			createTemplate(rooms);
		});

		function createTemplate(rooms){
			$('.page-top').template('booking-page',{rooms: rooms});
		}
	}
}