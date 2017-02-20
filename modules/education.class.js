module.exports = class Education{

	schema() {
		return {
			name: {type: String, required: true},
			startYear: {type: Number, required: true},
			courses: [{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Course'
			}]
		};
	}
};
