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

		$('.admin-search-container').on('click', 'button.cancel-item', function() {
			$(this).closest('item').remove();
			$('.edit-mode').removeClass('edit-mode');
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

		// if new education is selected in dropdown
		$('.admin-search-container').on('change', '.dropdown-educations', function() {
			let selectedEducation = $(this).find(':selected').attr('education-id');
			let item = getItemIdFromElement($(this));

			if(selectedEducation === 'no-education') {
				delete item.education;
				Student.update(item._id, {$unset: {education: ""}});	
			} else {
				Education.find(selectedEducation, (education) => {
					item.education = education;
					Student.update(item._id, {education: item.education});		
				});
			}
		});
		

		$('.admin-search-container').on('click', '.add-course-to-item', function(e) {

			var courseToAdd = $('.dropdown-courses').find(':selected');

			if (courseToAdd.length === 0) {
				return;
			}

			var courseId = courseToAdd.attr('course-id');

			let item = getItemIdFromElement($(this));
			
			Course.find(courseId,function(result,err){
              	item.courses.push(result);
              	updateItem();
			});
			
			function updateItem(){
		     	dbSchema.update(item._id, { courses: item.courses }, function(result, err) {
					if (!result._error){
						$('[item-type="Course"]').append('<a class="list-group-item" list-item-id="' + courseId + '">' + courseToAdd.val() +'</a');
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
			}
		});

		// remove marked items
		$('.admin-search-container').on('click', 'button.remove-item', function() {
			let studentsToRemove = [];
			let teachersToRemove = [];
			let coursesToRemove = [];
			let itemsToRemove = $('.admin-search-container a.active');
			let itemJQuery = $(this).closest('.1234');

			// use .edit-buttons as a referens point to get course
			let mainItem = getItemIdFromElement($(this));
			let mainItemType = $('.admin-search-container h2').text().slice(0, - 1);

			that.sortItemsToRemove(itemsToRemove, studentsToRemove, teachersToRemove, coursesToRemove);

			if(studentsToRemove.length > 0) {
				that.removeById("Student", studentsToRemove, mainItem, mainItemType, that, itemJQuery);
			}
			if(teachersToRemove.length > 0) {
				that.removeById("Teacher", teachersToRemove, mainItem, mainItemType, that, itemJQuery);
			}
			if(coursesToRemove.length > 0) {
				that.removeById("Course", coursesToRemove, mainItem, mainItemType, that, itemJQuery);
			}
		});
	}

	sortItemsToRemove(itemsToRemove, studentsToRemove, teachersToRemove, coursesToRemove) {
		itemsToRemove.each(function() {
			let itemCategory = $(this).closest('[item-type]').attr('item-type');
			let itemId = $(this).attr('list-item-id');

			if(itemCategory === "Student") {
				studentsToRemove.push(itemId);
			} else if(itemCategory === "Teacher") {
				teachersToRemove.push(itemId);
			} else if(itemCategory === "Course") {
				coursesToRemove.push(itemId);
			}
		});
	}

	removeById(entity, ids, mainItem, mainItemType, that, itemJQuery) {
		var plEntity = entity.toLowerCase() + 's';
		mainItem[plEntity] = mainItem[plEntity].filter(function(item) {
			let shouldKeep = ids.indexOf(item._id) == -1;
			if(!shouldKeep && mainItemType !== "Education") {
				that.removeFromEntity(entity, item, mainItem, mainItemType);
			}
			return shouldKeep;
		});
		var updateObj = {};
		updateObj[plEntity] = mainItem[plEntity];

		window[mainItemType].update(mainItem._id, updateObj, function() {
			that.reprintTemplate(mainItem, mainItemType, itemJQuery);
		});
	}

	removeFromEntity(entity, obj, mainItem, mainItemType) {
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
	}

	reprintTemplate(item, itemType, itemJQuery) {
		// dropdown and courselist creater
		let haveCourses = (item.courses ? true : false);
		let haveEducation = (item.education ? true : false);

		console.log("Reprint!");

		if(haveCourses) {
			let courseIds, queryStringCourses;

			courseIds = item.courses.map( course => '"' + course._id + '"' );
			queryStringCourses = 'find/{ _id: { $nin: [' + courseIds + '] } }';
			
			if(haveEducation) {
				let educationId = item.education._id;
				let queryStringEducations = 'find/{ _id: { $ne: "' + educationId + '" } }';

				Course.find(queryStringCourses, (courses, err) => {
					Education.find(queryStringEducations, (educations, err) => {
						itemJQuery.empty().template('admin-edit', {
							type: itemType,
							item: item,
							dropdowncourses: courses,
							dropdowneducations: educations
						});
					});
				});
			} else {
				Course.find(queryStringCourses, (courses, err) => {
					itemJQuery.empty().template('admin-edit', {
						type: itemType,
						item: item,
						dropdowncourses: courses
					});
				});
			}
		} else {	
			console.log("itemType: ", itemType);
			console.log("item: ",item);
			console.log("jQuery: ", itemJQuery);

			itemJQuery.empty().template('admin-edit', {
				type: itemType,
				item: item
			});
			console.log(itemType);
			console.log("jQuery2: ", itemJQuery);
		}
	}
}
