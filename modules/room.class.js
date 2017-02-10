module.exports = class Room {

	schema() {
		return {
			name: { type: String, required: true },
			description: { type: String, required: true },
			booking: [{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Booking'
			}]
		};
	}

	limit() {
		return 20;
	}
};
