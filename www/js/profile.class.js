class Profile {
  constructor () {
    this.currentUser = user;
    this.dbSchema = this.currentUser.role === "Student" ? Student : Teacher;
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

  init (){
    let that = this;
    // Load template for profile page
    this.renderTemplate();

    // Save changes to db
    $('.profile-page-container').on('click', '.save-profile', function(){
      // get values from form
      that.currentUser.firstname = $('.profile-page-container').find('input[name="firstname"]').val();
      that.currentUser.lastname = $('.profile-page-container').find('input[name="lastname"]').val();
      that.currentUser.phonenumber = $('.profile-page-container').find('input[name="phonenumber"]').val();
      that.currentUser.picture = $('.profile-page-container').find('input[name="picture"]').val();

      // update global user object
      // we should also update the session object
      user = Object.assign({}, that.currentUser);

      // update the db and reload page
      that.dbSchema.update(user._id, that.currentUser, function(){
        location.reload();
      });
    });
  }
}

