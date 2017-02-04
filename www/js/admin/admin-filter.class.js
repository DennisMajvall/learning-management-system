class AdminFilter {

	constructor(input = '') {
		this.defaultQuery = '';

		let inputArray = input.replace(/\s{2,}/g, ' ').split(' ');
		
		this.admin = '';
		this.student = createNormalUser();
		this.teacher = createNormalUser();

		// this.admin = `find/{ { _id: "` + input + `" }`;
		// this.admin = `find/{ username: { $regex: /.*` + input + `.*/, $options: "i" } }`;

		// this.admin = `find/{ 
		// 	$or: [
		// 		{ _id: { $eq: "` + input + `" },
		// 		{ username: { $regex: /.*` + input + `.*/, $options: "i" } }
		// 	] 
		// }`;

		function createNormalUser() {
			let result = '';

			if (inputArray.length == 1) {
				result = `find/{ 
					$or: [
						{ _id: "` + input + `" },
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
