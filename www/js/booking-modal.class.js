class BookingModal{
	constructor(room,dateInfo,courses){

		$('.booking-modal-container').empty();
		$('.booking-modal-container').template('booking-modal',{
			room: room,
			dateInfo: dateInfo,
			courses: courses
		});
	}
}