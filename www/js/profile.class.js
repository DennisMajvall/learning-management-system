class Profile {
  constructor () {
    this.currentUser = user;
    this.dbSchema = this.currentUser.role === "Student" ? Student : Teacher;
    console.log('dbSchema: ',this.dbSchema);

    this.renderTemplate();
  }

  renderTemplate (){
    let currentUser = this.currentUser;
    // Clear the page
    $('.page-content').children().empty();
    // Add html template for profile
    $('.page-content').template('profile', {currentUser})
  }

  getDbSchema(){
    if (this.currentUser.role == 'Student'){
      return Student;
    }
    else
      return Teacher;
  }
}





// TODO
/*
  Rendera template
  Fånga clicks på save knapp
  spara mot db
*/
