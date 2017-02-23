class AdminEdit {

	constructor(dbSchema, getItemIdFromElement) {
		let that = this;

		$('.admin-search-container').on('click', 'button.delete-item', function() {
			let item = getItemIdFromElement($(this));

			dbSchema.delete(item._id, () => {
				location.reload();
			});
		});

		$('.admin-search-container').on('click', 'button.save-item', function() {
			let item = getItemIdFromElement($(this));
			let objectToSave = Object.assign({}, item);

			delete objectToSave._id;

			if (objectToSave.password && objectToSave.password == "[secret]")
				delete objectToSave.password;

			dbSchema.update(item._id, objectToSave, () => {
				location.reload();
			});
		});

		$('.admin-search-container').on('keyup', '[bind-key]', function() {
			let item = getItemIdFromElement($(this));
			let key = $(this).attr('bind-key');

			item[key] = $(this).val().trim();
		});

		// highlight items
		$('.admin-search-container').on('click', '.list-group a', function() {
			$(this).toggleClass('active');
		});


		// 

		$('.admin-search-container').on('click', '.add-course-to-item', function(e) {

			var courseToAdd = $('.selectpicker').find(':selected');

			if (courseToAdd.length === 0) {
				return;
			}

			var courseId = courseToAdd.attr('course-id');

			let item = getItemIdFromElement($(this));
			item.courses.push(courseId);

			dbSchema.update(item._id, { courses: item.courses }, function(result, err) {
				if (!result._error){
					$('[item-type="Course"]').append('<a class="list-group-item" list-item-id="' + courseToAdd + '">' + courseToAdd.val() +'</a');
					courseToAdd.remove();

					if(item.role !== 'Eduction'){
						Course.find(courseId, function(course, err) {
							if (!course._error){
								if(item.role == 'Student'){
									course.students.push(item._id);
									Course.update(courseId, { students: course.students });
								} else if (item.role == 'Teacher'){
									course.teachers.push(item._id);
									Course.update(courseId, { teachers: course.teachers });
								} else {
									return;
								}
							}
						});
					}


				}
			});
		});

		// remove marked items
		$('.admin-search-container').on('click', 'button.remove-item', function() {
			let studentsToRemove = [];
			let teachersToRemove = [];
			let coursesToRemove = [];
			let educationsToRemove = [];
			let itemsToRemove = $('.admin-search-container a.active');

			// use .edit-buttons as a referens point to get course
			let mainItem = getItemIdFromElement($('.admin-search-container .delete-item'));

			that.sortItemsToRemove(itemsToRemove, studentsToRemove, teachersToRemove, coursesToRemove, educationsToRemove);

			if(studentsToRemove.length > 0) {
				that.removeById("Student", studentsToRemove, mainItem, that);
			}
			if(teachersToRemove.length > 0) {
				that.removeById("Teacher", teachersToRemove, mainItem, that);
			}
			if(educationsToRemove.length > 0) {
				that.removeById("Education", educationsToRemove, mainItem, that);
			}
			if(coursesToRemove.length > 0) {
				that.removeById("Course", coursesToRemove, mainItem, that);
			}
		});
	}

	sortItemsToRemove(itemsToRemove, studentsToRemove, teachersToRemove, coursesToRemove, educationsToRemove) {
		itemsToRemove.each(function() {
			let itemCategory = $(this).closest('[item-type]').attr('item-type');
			let itemId = $(this).attr('list-item-id');

			if(itemCategory === "Student") {
				studentsToRemove.push(itemId);
			} else if(itemCategory === "Teacher") {
				teachersToRemove.push(itemId);
			} else if(itemCategory === "Education") {
				educationsToRemove.push(itemId);
			} else if(itemCategory === "Course") {
				coursesToRemove.push(itemId);
			}
		});
	}

	removeById(entity, ids, mainItem, that) {
		var plEntity = entity.toLowerCase() + 's';
		mainItem[plEntity] = mainItem[plEntity].filter(function(item) {
			let shouldKeep = ids.indexOf(item._id) == -1;
			if(!shouldKeep) {
				that.removeFromEntity(entity, item, mainItem);
			}
			return shouldKeep;
		});
		var updateObj = {};
		updateObj[plEntity] = mainItem[plEntity];
		if(entity === "Student" || entity === "Teacher") {
			Course.update(mainItem._id, updateObj, function() {
				$('.admin-search-container item').empty().template('admin-edit', {
					type: "course",
					item: mainItem
				});
			});
		} else if(entity === "Course") {
			item.update(mainItem._id, updateObj, function() {
				$('.admin-search-container item').empty().template('admin-edit', {
					type: "student",
					item: mainItem
				});
			});
			Teacher.update(mainItem._id, updateObj, function() {
				$('.admin-search-container item').empty().template('admin-edit', {
					type: "teacher",
					item: mainItem
				});
			});
		} else if(entity === "Education") {
			Course.update(mainItem._id, updateObj, function() {
				$('.admin-search-container item').empty().template('admin-edit', {
					type: "course",
					item: mainItem
				});
			});
		}
	}

	removeFromEntity(entity, obj, mainItem) {
		if(entity === "Student" || entity === "Teacher") {
			obj.courses = obj.courses.filter(function(course) {
				return mainItem._id.indexOf(course) == -1;
			});
			window[entity].update(obj._id, {courses: obj.courses});
		}

		if(entity === "Course") {
			obj.students = obj.students.filter(function(student) {
				return mainItem._id.indexOf(student) == -1;
			});
			obj.teachers = obj.teachers.filter(function(teacher) {
				return mainItem._id.indexOf(teacher) == -1;
			});
			window[entity].update(obj._id, {students: obj.students});
			window[entity].update(obj._id, {teachers: obj.teachers});
		}

		if(entity === "Education") {
			obj.courses = obj.courses.filter(function(course) {
				return mainItem._id.indexOf(course) == -1;
			});
			window[entity].update(obj._id, {courses: obj.courses});
		}
	}
}
