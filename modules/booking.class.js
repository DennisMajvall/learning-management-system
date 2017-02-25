module.exports = class Booking {

	schema() {
		return {
			room: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Room',
				required: true
			},
			course: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Course',
				required: true
			},
			date: {type: Date, required: true},
			timeFrom: {type: Date, required: true},
			timeTo: {type: Date, required: true},
			bookedBy: {type: String, required: true},
			type: {type: String, required: true}
		}
	}

	populate() {
		return 'room course';
	}
};
