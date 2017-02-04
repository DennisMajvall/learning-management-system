class CoursesOnFrontpage {

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

			Course.find(queryString, createTemplate);
		}

		function createTemplate(courses, err) {
			// Make an array mapping the _id as an index for each course.
			that.courseHashMap = {};
			courses.forEach((course) => {
				that.courseHashMap[course._id] = course;
			});

			$('.page-content').template('courses', { courses: courses });
		}

		// wait for DOM ready
		$('body').on('click', '.course-panel', function(){
			let id = $(this).data('id');
			let course = that.courseHashMap[id];

			$('.page-top').empty();
			$('.page-content').empty().template('specific-course', { course: course });
		});
	}
}
