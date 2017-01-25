module.exports = class Owner {

	schema(){
		return {
			name: String,
			age: Number,
			phoneNumber: String,
			kittens: [{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Kitten'
			}]
		};
	}

}
