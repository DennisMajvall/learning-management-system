class BookingInfoModal{

	constructor(bookingId, callback){

		Booking.find(bookingId, function(data,err){
			console.log(data);
			createTemplate(data);
		});

		function createTemplate(booking){
			$('#bookingInfoModal').remove();
			$('body').template('booking-info-modal',{
				booking: booking
			});
			callback();
		}
	}

}