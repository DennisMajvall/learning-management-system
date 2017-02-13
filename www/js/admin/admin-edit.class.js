class AdminEdit {

	constructor(dbSchema, findItemFunc) {

		let that = this;

		$('body').on('click', 'button.delete-item', function() {
			let item = findItemFunc($(this));

			dbSchema.delete(item._id, () => {
				location.reload();
			});
		});

		$('body').on('click', 'button.save-item', function() {
			let item = findItemFunc($(this));
			let objectToSave = Object.assign({}, item);

			delete objectToSave._id;

			if (objectToSave.password && objectToSave.password == "[secret]")
				delete objectToSave.password;

			dbSchema.update(item._id, objectToSave, () => {
				location.reload();
			});
		});

		$('body').on('keyup', '[bind-key]', function() {
			let item = findItemFunc($(this));
			let key = $(this).attr('bind-key');

			item[key] = $(this).val().trim();
		});

		// highlight items
		$('.edit-area').on('click', 'a', function() {
			$(this).toggleClass('active');
		});

		// remove marked items
		$('.edit-area').on('click', 'button.remove-item', function() {
			let studentsToRemove = [];
			let teachersToRemove = [];
			let itemsToRemove = $('.edit-area a.active');
			
			// use .edit-buttons as a referens point to get course
			let mainItem = findItemFunc($('.edit-area .delete-item'));

			that.sortItemsToRemove(itemsToRemove, studentsToRemove, teachersToRemove);

			if(studentsToRemove.length > 0){
				that.removeStudents(studentsToRemove, mainItem, that);
			}

			if(teachersToRemove.length > 0){
				that.removeTeachers(teachersToRemove, mainItem, that);
			}
		});
	}

	sortItemsToRemove(itemsToRemove, studentsToRemove, teachersToRemove){
		itemsToRemove.each(function(){
			let itemCategory = $(this).closest('[item-type]').attr('item-type');
			let itemId = $(this).attr('list-item-id');

			if(itemCategory === "students"){
				studentsToRemove.push(itemId);
			} else if(itemCategory === "teachers"){
				teachersToRemove.push(itemId);
			}
		});
	}

	removeStudents(studentsId, mainItem, that){
		mainItem.students = mainItem.students.filter(function(student){
			let shouldKeep = studentsId.indexOf(student._id) == -1;

			if(!shouldKeep){
				console.log("Removing course from student: ", student);
				that.removeCourseFromStudent(student, mainItem);
			}
			return shouldKeep;
		});
		console.log("Printing saving data: ", mainItem.students);
		Course.update(mainItem._id, {students: mainItem.students});
	}

	removeTeachers(teachersId, mainItem, that){
		mainItem.teachers = mainItem.teachers.filter(function(teacher){
			let shouldKeep = teachersId.indexOf(teacher._id) == -1;

			if(!shouldKeep){
				that.removeCourseFromTeacher(teacher, mainItem);
			}
			return shouldKeep;
		});
		Course.update(mainItem._id, {teachers: mainItem.teachers});
	}

	removeCourseFromStudent(student, mainItem){
		student.courses = student.courses.filter(function(course){
			return mainItem._id.indexOf(course) == -1;
		});

		Student.update(student._id, {courses: student.courses});
	}

	removeCourseFromTeacher(teacher, mainItem){
		teacher.courses = teacher.courses.filter(function(course){
			return mainItem._id.indexOf(course) == -1;
		});

		Teacher.update(teacher._id, {courses: teacher.courses});
	}
}