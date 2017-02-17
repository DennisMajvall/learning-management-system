module.exports = class User {

	schema() {
		return {
			username: {type: String, required: true},
			password: {type: String, required: true}
		};
	}

	alterSchema(schema) {
		schema.pre('save', function(next) {
			// hash the password	- but only if it has been modified (or is new)
			if (this.isModified('password')) {
				this.password = sha1(this.password + global.passwordSalt);
			}
			if (!this.isModified('username')) {
				next();
				return;
			}

			// check that the user name does not exist in any of the
			// entities/collections that inherits from user (our global.userRoles)
			var entities = global.userRoles;
			var foundUser, checkedEntities = 0;
			entities.forEach((entity) => {
				global[entity].findOne({ username: this.username }, (err, found) => {
					foundUser = foundUser || found;
					if(++checkedEntities == entities.length) {
						whenAllChecked();
					}
				});
			});

			function whenAllChecked() {
				// do not allow duplicate user names;
				if(!foundUser) {
					next();
					return;
				}
				var error = new Error(JSON.stringify({
					errors: {
						username: {
							message: 'username `' + foundUser.username + '` is not unique: ',
							name: "SaveError"
						}
					}
				}));
				next(error);
			}
		});
	}
}
