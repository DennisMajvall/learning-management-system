module.exports = class Teacher extends User {

	schema() {
		return Object.assign({}, super.schema(),{
			firstname: {type: String, required: true},
			lastname: {type: String, required: true},
			phonenumber: {type: String},
			picture: {type: String, default: "default"},
			role: { type: String, default: 'Teacher', set: v => 'Teacher' },
			timeCreated: {type: Date, default: Date.now},
			courses: [{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Course'
			}]
		});
	}

	populate() {
		return 'courses';
	}
};
