module.exports = class Room {

	schema() {
		return {
			name: { type: String, required: true },
			description: { type: String },
			type: { type: String, required: true },
			seats: Number,
			projector: String,
			bookings: [{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Booking'
			}]
		};
	}
};
