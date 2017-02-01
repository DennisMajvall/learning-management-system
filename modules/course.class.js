module.exports = class Course {

	schema(){
		return {
			name: {type: String, required: true},
			teachers: [{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Teacher'
			}],
			students: [{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Student'
			}],
			description: {type: String},
			period: {type: String}
		};
	}

	populate() {
		return 'teachers students';
	}
};
