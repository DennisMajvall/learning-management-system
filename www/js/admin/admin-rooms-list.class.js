class AdminRoomsList {
	constructor() {
		var itemsDisplayed = [];
        let itemHashMap = {};

        Room.find('', function(data, err) {
            itemsDisplayed = data.slice(0, Math.min(20, data.length));

            $('body div.page-content').html('').template('admin-rooms-list', { rooms: itemsDisplayed });

            // Make an array mapping the _id as an index for each item.
            itemsDisplayed.forEach(function(item, index) {
                itemHashMap[item._id] = item;
            });
        });

        $('body').on('click', 'a.room-info', function() {
            let item = itemHashMap[$(this).attr('room-id')];
            new AdminRoomEditPage(item);
        });
	}
}
