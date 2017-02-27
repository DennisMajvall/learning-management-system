module.exports = class Announcement {

	schema() {
		return {
			message: {type: String, required: true},
			timeCreated: {type: Date, default: Date.now},
			author: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Teacher',
				required: false
			},
			courses: [{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Course'
			}]
		};
	}

	populate() {
		return 'author courses';
	}
};
