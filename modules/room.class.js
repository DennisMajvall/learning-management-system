module.exports = class Room {

	schema(){
		return {
			name: { type: String, required: true },
			description: { type: String, required: true},
			bookedTime: { type: String, required: true},
			bookedBy: { type: String}
		};
	}

	limit() {
		return 20;
	}
};
