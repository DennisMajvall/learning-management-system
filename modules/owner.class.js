module.exports = class Owner {

	schema() {
		return {
			name: String,
			age: Number,
			phoneNumber: String
		}
	}

	speak() {
		var greeting = this.name
			? "Meow name is " + this.name
			: "I don't have a name";

		return greeting;
	};

}
