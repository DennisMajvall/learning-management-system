class BookingPage{
	constructor(){
		var fakeRooms = [];
		for(var i=0; i<5; i++){
			fakeRooms[i]={
				name: "Room " + (i+1),
				type: "classroom",
				seats: 50
			};
		}
		console.log(fakeRooms);
		$('.page-content').template('booking-page',{rooms: fakeRooms});
	}
}