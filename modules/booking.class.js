module.exports = class Booking {

	schema() {
		return {
			name: [{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Room'
			}],
			description: [{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Room'
			}],
			bookedTime: [{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Room'
			}],
			bookedBy: [{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Room'
			}]
		}
	}
}
