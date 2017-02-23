class Profile {
  constructor () {
    this.currentUser = user;
    this.dbSchema = this.currentUser.role === "Student" ? Student : Teacher;

    // for test
    console.log('currentUser.role: ', this.currentUser.role );
    console.log('dbSchema: ', this.dbSchema);

    // Load template for profile page
    this.renderTemplate();

    // Register clicks in save-btn
    $('.profile-page-container').on('click', '.save-profile', function(){

    });

  }

  renderTemplate (){
    let currentUser = this.currentUser;

    // Clear the page
    $('.student-alert-container').empty();
    $('.student-announcement-container').empty();
    $('.teacher-messages-container').empty();
    $('.front-course-container').empty();

    // Add html template for profile
    $('.profile-page-container').empty().template('profile', {currentUser})
  }
}





// TODO
/*
  Rendera template
  Fånga clicks på save knapp
  spara mot db
*/
