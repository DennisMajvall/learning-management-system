module.exports = class Course {

	schema(){
		return {
			name: {type: String, required: true},
			description: {type: String},
			period: {type: String},
			teachers: [{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Teacher'
			}],
			students: [{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Student'
			}]
		};
	}

	populate() {
		return 'teachers students';
	}

	limit() {
		return 20;
	}
};
