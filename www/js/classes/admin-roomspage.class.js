class AdminRoomspage {

	constructor() {
		var someRooms;

		Room.find('', function(data, err) {
			if(data.length > 20) {
				someRooms = data.slice(data.length-20, data.length+1);
			} else {
				someRooms = data;
			}

			$('body div.page-content').html('');
			$('body div.page-content').template('admin-roomspage', { rooms: someRooms });
		});
	}
}
