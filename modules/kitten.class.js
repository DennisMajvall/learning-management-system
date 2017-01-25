module.exports = class Kitten {

	schema(){
		return {
			name: {type: String, required: true},
			age: {type: Number, min:0, max:30},
			owner: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Owner'
			}
		}
	}

	speak(){
		var greeting = this.name
			? "Meow name is " + this.name
			: "I don't have a name";
		return greeting;
	}

}
