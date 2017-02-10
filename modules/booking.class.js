module.exports = class Booking {

	schema() {
		return {
			name: { type: String },
			time: { type: String }
		}
	}
};
