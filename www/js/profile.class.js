class Profile {
  constructor () {
    let that = this;
    this.currentUser = user;
    this.dbSchema = this.currentUser.role === "Student" ? Student : Teacher;

    // Load template for profile page
    this.renderTemplate();

    // Register clicks in save-btn
    $('.profile-page-container').on('click', '.save-profile', function(){
      // get values from form
      that.currentUser.firstname = $('.profile-page-container').find('input[name="firstname"]').val();
      that.currentUser.lastname = $('.profile-page-container').find('input[name="lastname"]').val();
      that.currentUser.phonenumber = $('.profile-page-container').find('input[name="phonenumber"]').val();
      that.currentUser.picture = $('.profile-page-container').find('input[name="picture"]').val();

      user = Object.assign({}, that.currentUser);
      that.dbSchema.update(user._id, that.currentUser, function(){
        location.reload();
      });
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
