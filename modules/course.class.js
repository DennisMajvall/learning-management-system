module.exports = class Course {

	schema() {
		return {
			name: {type: String, required: true},
			description: {type: String},
			icon_image: {type: String, default: "default_course_icon"},
			icon_bg: {type: String, default: "#BDBDBD"},
			period: {type: String},
			about: {type: String},
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
};
