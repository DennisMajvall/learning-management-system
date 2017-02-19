module.exports = class Booking {

	schema() {
		return {
			room: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Room',
				required: true
			},
			date: {type: Date, required: true},
			timeFrom: {type: Date, required: true},
			timeTo: {type: Date, required: true},
			bookedBy: {type: String, required: true}
		}
	}
};
