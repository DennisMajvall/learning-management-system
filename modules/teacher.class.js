module.exports = class Teacher extends User {

	schema() {
		return Object.assign({}, super.schema(),{
			firstname: {type: String, required: true},
			lastname: {type: String, required: true},
			phonenumber: {type: String},
			role: { type: String, default: 'Teacher', set: v => 'Teacher' },
			courses: [{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Course'
			}]
		});
	}

	populate() {
		return 'courses';
	}

	limit() {
		return 20;
	}
}
