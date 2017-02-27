class CoursePage{

	constructor(courseId) {
		let that = this;
		let courseObj;

		$('.teacher-messages-container').empty();
		$('.student-announcement-container').empty();
		$('.front-course-container').empty();
		$('.profile-page-container').empty();
		$('.booking-page-container').empty();
		$('.week-planner-container').empty();

		Course.find(courseId, (course) => {
			$('.front-course-container').empty().template('course-page', {
				course: course,
				role: user.role
			});

			courseObj = course;
		});

		$('.front-course-container').on('click', 'button.remove-item', function() {
			let id = $(this).attr('list-item-id');

			that.removeById(id, courseObj, that, this);
		});
	}

	removeById(id, mainItem, that, domThis) {
		mainItem.students = mainItem.students.filter(function(item) {
			let shouldKeep = id !== item._id;

			if(!shouldKeep) {
				that.removeCourseFromEntity(item, mainItem);
			}

			return shouldKeep;
		});

		var updateObj = { students: mainItem.students };

		Course.update(mainItem._id, updateObj, function() {
			$(domThis).closest('profile').remove();
		});
	}

	removeCourseFromEntity(obj, mainItem) {
		obj.courses = obj.courses.filter(function(course) {
			return mainItem._id.indexOf(course) == -1;
		});

		Student.update(obj._id, {courses: obj.courses});
	}
}