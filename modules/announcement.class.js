module.exports = class Announcement {

	schema(){
		return {
			author: [{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Teacher', 
				required: true
			}],
			message: {type: String, required: true},
			courses: [{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Course'
			}]
		};
	}

	populate() {
		return 'author courses';
	}

	limit() {
		return 20;
	}
};