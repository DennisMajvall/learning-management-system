module.exports = class Room {

	schema(){
		return {
			name: { type: String, required: true },
			bookedTime: { type: String },
			bookedBy: { type: String}
		};
	}

	limit() {
		return 20;
	}
};
