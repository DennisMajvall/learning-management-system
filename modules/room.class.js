module.exports = class Room {

	schema(){
		return {
			roomName: { type: String, required: true },
			bookedTime: { type: String },
			bookedBy: { type: String}
		};
	}

	limit() {
		return 20;
	}
};
