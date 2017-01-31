module.exports = class Admin extends User{

	schema(){
		return Object.assign({}, super.schema());
	}

}