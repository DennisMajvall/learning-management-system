class BookingInfoModal{

	constructor(bookingId, callback){

		Booking.find(bookingId, function(data,err){
			let	deleteRights = false,
				booking = data,
				dateFormatObj = {
				date: moment(booking.date).format('LL'),
				timeFrom: moment(booking.timeFrom).format('LT'),
				timeTo: moment(booking.timeTo).format('LT')
			}

			if(user.username === booking.bookedBy || user.role === "Admin"){
				console.log('Du har makten');
				deleteRights = true;
			}

			createTemplate(booking, dateFormatObj, deleteRights);
		});

		function createTemplate(booking, dateFormatObj, deleteRights){
			$('#bookingInfoModal').remove();
			$('body').template('booking-info-modal',{
				booking: booking,
				dateFormatObj: dateFormatObj,
				deleteRights: deleteRights
			});
			callback();
		}
	}

}