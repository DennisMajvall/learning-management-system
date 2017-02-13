module.exports = class Admin extends User{

	schema() {
		return Object.assign({
			role: { type: String, default: 'Admin', set: v => 'Admin' }
		}, super.schema());
	}
}
