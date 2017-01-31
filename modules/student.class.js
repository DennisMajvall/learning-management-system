module.exports = class Student extends User {

	schema() {
	    return Object.assign({}, super.schema(),{
			firstname: {type: String, required: true},
			lastname: {type: String, required: true},
			phonenumber: {type: String},
			courses: [{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Course'
			}],
			educations: [{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Education'
			}]
    	});
	}

	// Thomas used one single thing that needed a populate() in the examples.
	// Students will have two things to populate(),
	// so probably will we have to make a fix here with something _like_ this:
	// populate(){
	// 	return 'courses' || return 'educations';
	// }

	populate() {
		return 'courses';
	}
}
