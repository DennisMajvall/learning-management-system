module.exports = class Teacher {

	schema(){
		return {
			firstname: {type: String, required: true},
			lastname: {type: String, required: true},
			phonenumber: {type: String},
			courses: [{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Course'
			}],
			email: {type: String, required: true},
			password: {type: String, required: true}
		}
	}
}