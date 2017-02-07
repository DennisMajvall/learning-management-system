module.exports = class Student extends User {

	schema() {
	    return Object.assign({}, super.schema(),{
			firstname: {type: String, required: true},
			lastname: {type: String, required: true},
			phonenumber: {type: String},
			picture: {type: String, default: "default"},
			role: { type: String, default: 'Student', set: v => 'Student' },
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

	populate() {
		return 'courses educations';
	}

	limit() {
		return 20;
	}

	getAnnouncements(callback){
		Announcement.find({courses:{$in:this.courses}},function(err,announcements){
			callback(announcements);
		});
	}


};
