module.exports = class Booking {

	schema() {
		return {
			name: {type: String, required: true},
			size: {type: String, required: true},
			bookedTime: [{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'bookedTime'
			}],
			bookedBy: [{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'bookedBy'
			}]
		}
	}
}
