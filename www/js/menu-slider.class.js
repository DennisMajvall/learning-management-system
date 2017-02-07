class MenuSlider {

	constructor(role) {
		// When we have login working we won't have to 'find' Students (or Teachers)
		// and instead just populate the courses of the one logged in.
		let schema = role == "Student" ? Student : Teacher;

		let courseHashMap = {};
		let that = this;

		schema.find('', function(data,err){
			let user = data[0];

			populateCourses(user.courses);
		});

		function populateCourses(courses) {
			let coursesIds = courses.map( course => '"' + course._id + '"' );
			let queryString = 'find/{ _id: { $in: [' + coursesIds + '] } }';
			console.log("fp", courses);
			Course.find(queryString, createTemplate);
		}

		function createTemplate(courses, err) {
			// Make an array mapping the _id as an index for each course.
			that.courseHashMap = {};
			courses.forEach((course) => {
				that.courseHashMap[course._id] = course;
			});

			$('body').template('menu-slider',{
				header: 'Startpage',
				education: 'Education Name',
				courses: courses,
				booking: 'Book a room',
				account: 'Your Account',
				usersettings: 'Settings',
				password: 'change password',
				logout: 'log out'
			});
		}

		$('.menu-slider').on('click', '.log-out', function(){
			Login.delete(onLogout);
		});

		function onLogout(response, err) {
			console.log('onLogout', response, 'errorMessage', err);
			location.reload();
		}

		$('body').on('click', '.menu-choice-courses', function(){
			alert('hej');
			let id = $(this).data('id');
			let course = that.courseHashMap[id];

			$('.page-top').empty();
			$('.page-content').empty().template('course-page', { course: course });
			$('.menu-slider').animate({ left: '-400px' }, 200);
			$('.fake-hamb').css({ transform: 'rotate(0deg)' });
		});
	}
}
