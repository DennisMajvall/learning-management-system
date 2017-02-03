module.exports = class Admin extends User{

	schema(){
		return Object.assign({}, super.schema());
	}

	limit() {
		return 20;
	}

}