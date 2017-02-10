module.exports = class Room {

	schema() {
		return {
			name: { type: String, required: true },
			description: { type: String, required: true },
			booking: {}
		};
	}

	limit() {
		return 20;
	}
};
