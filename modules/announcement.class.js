module.exports = class Announcement {

	schema(){
		return {
			author: {type: String, required: true},
			message: {type: String, required: true},
			courses: [{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Course'
			}]
		};
	}

	limit() {
		return 20;
	}
};