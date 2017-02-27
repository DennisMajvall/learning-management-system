class StudentAlert {

	constructor() {
		createSearchString(findBookingsForStudent);

		function createSearchString (callback) {
			let searchString = '[';

			if(user.courses){
				user.courses.forEach((id, index, array)=>{
					searchString += '{ course: "' + id +'"}';

					if(array[index+1]) {
						searchString += ',';
					}
				});

				searchString += ']';
			}
			callback(searchString);
		}

		function findBookingsForStudent(searchString) {
			if(searchString.length > 2){
				Booking.find(`find/{ $or: ` + searchString + `}`
				,(data, err)=>{
					findNextBooking(data);
				});
			}
			else{
				findNextBooking([]);
			}
		}

		function findNextBooking(bookings) {
			if(bookings.length > 0) {
				let bookingsSorted = bookings.sort(function(a, b) {
	  				let aTime = moment(a.timeFrom),
	  					bTime = moment(b.timeFrom);

	  				if (aTime < bTime) {
						return -1;
					}
					if (aTime > bTime) {
					    return 1;
					}
					return 0;
	  			});

				let nextBooking = bookingsSorted[0];
				let dateFormatObj = {
					date: moment(nextBooking.date).format('MMM Do'),
					timeFrom: moment(nextBooking.timeFrom).format('LT'),
					timeTo: moment(nextBooking.timeTo).format('LT')
				}
				createTemplate(nextBooking, dateFormatObj);
			}
			else{
				createTemplate();
			}
		}

		function createTemplate(booking, dateFormatObj) {
			$('.student-alert-container').empty().template('student-alert', {
				booking: booking ? booking : 'false',
				dateFormatObj: dateFormatObj ? dateFormatObj : 'false'
			});
		}
	}
}
