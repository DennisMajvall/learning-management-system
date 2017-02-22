class BookingModal{
	constructor(room,dateInfo){
		console.log(room);
		console.log(dateInfo);
		$('.booking-modal-container').empty();
		$('.booking-modal-container').template('booking-modal',{
			room: room,
			dateInfo: dateInfo
		});
	}
}