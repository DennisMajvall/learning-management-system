module.exports = class User {

  schema(){
    return {
      username: {type: String, required: true},
      password: {type: String, required: true},
      role: {type: String, required: true}
    };
  }

  alterSchema(schema){

    schema.pre('save',function(next){

      // hash the password  - but only if it has been modified (or is new)
      if (this.isModified('password')){
        this.password = sha1(this.password + global.passwordSalt);
      }

      // check that the user name does not exist in any of the
      // entities/collections that inherits from user (our global.userRoles)
      var entities = global.userRoles;
      var foundUser, checkedEntities = 0;
      entities.forEach((entity)=>{
        global[entity].findOne({username:this.username},(err,found)=>{
          foundUser = foundUser || found;
          checkedEntities++;
          if(checkedEntities == entities.length){
            // now we have checked everywhere :D
            // do not allow duplicate user names;
            if(foundUser){
              var error = new Error(JSON.stringify({
                errors: {
                  username: {
                    message: 'Path `username` is not unique',
                    name: "SaveError"
                  }
                }
              }));
              next(error);
            }
            else {
              next();
            }
          }
        });
      });

    });

  }

}
