class Message {
  constructor() {
    this.renderTemplate();
  }

  renderTemplate () {
    window[user.role].find(user._id, (foundUser, err) => {
      // Clear the page
      $('section.course-page').empty();
      $('.student-alert-container').empty();
      $('.student-announcement-container').empty();
      $('.teacher-messages-container').empty();
      $('.front-course-container').empty();
      $('.course-page-container').empty();
      $('.booking-page-container').empty();
      $('.week-planner-container').empty();
      $('.profile-page-container').empty();

      // Add html template for profile
      $('.message-container').empty().template('message', { currentUser: foundUser });
      new UploadPicture();
    });
  }

}
