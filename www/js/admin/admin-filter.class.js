class AdminFilter {

	constructor(input = '') {
		this.defaultQuery = '';

		let inputArray = input.replace(/\s{2,}/g, ' ').split(' ');
		
		this.admin = `find/{ username: { $regex: /.*` + input + `.*/, $options: "i" } }`;
		this.course = '';
		this.edcuation = '';
		this.room = '';
		this.student = createNormalUser();
		this.teacher = this.student;
		
		// { _id: '` + input + `' }, // doesn't work well inside an $or

		function createNormalUser() {
			let result = '';

			if (inputArray.length == 1 && inputArray[0].length) {
				result = `find/{ 
					$or: [
						{ username: { $regex: /.*` + input + `.*/, $options: "i" } },
						{ firstname: { $regex: /.*` + input + `.*/, $options: "i" } },
						{ lastname: { $regex: /.*` + input + `.*/, $options: "i" } },
						{ phonenumber: { $regex: /.*` + input + `.*/, $options: "i" } }
					] 
				}`;
			} else if (inputArray.length > 1) {
				result = `find/{ 
					$and: [
						{ firstname: { $regex: /.*` + inputArray[0] + `.*/, $options: "i" } },
						{ lastname: { $regex: /.*` + inputArray[1] + `.*/, $options: "i" } }
					] 
				}`;
			}

			return result;
		}
	}
}
