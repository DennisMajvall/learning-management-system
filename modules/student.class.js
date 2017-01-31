module.exports = class Student extends User {

	schema(){
	    return Object.assign({},super.schema(),{
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
}