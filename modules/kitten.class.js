module.exports = class Kitten {

	schema() {
		return {
			name: {type: String, required: true},
			age: Number
		}
	}

	speak() {
		var greeting = this.name
			? "Meow name is " + this.name
			: "I don't have a name";

		return greeting;
	};
}
