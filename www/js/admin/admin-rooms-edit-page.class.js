class AdminRoomsEditPage {
	constructor(room) {
		$('body div.page-content').html('').template('admin-rooms-edit-page', { room: room });
    }
}
