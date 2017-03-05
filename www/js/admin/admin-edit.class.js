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

		$('.admin-search-container').on('change', '.dropdown-single', function() {
			let item = getItemIdFromElement($(this));
			let key = $(this).attr('bind-change');

			let val = null;
			$(this).children().each((index, v) => {
				v = $(v);
				if (v.text().trim() == $(this).val().trim()) {
					val = v.attr('data-id');
				}
			});

			if (val) item[key] = val;
		});

		$('.admin-search-container').on('click', '.dropdown-menu > li', function(e) {
			// Prevent collapsing the dropdown
			e.stopPropagation();

			let item = getItemIdFromElement($(this));

			// Preserve the 'this' element
			that.toggleMultipleDropdown.call(this, item);
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

			// use .edit-buttons as a referens point to get course
			let mainItem = getItemIdFromElement($(this));
			let mainItemType = $('.admin-search-container h2').text().slice(0, - 1);

			that.sortItemsToRemove(itemsToRemove, studentsToRemove, teachersToRemove, coursesToRemove);

			if(studentsToRemove.length > 0) {
				that.removeById("Student", studentsToRemove, mainItem, mainItemType, that, $(this));
			}
			if(teachersToRemove.length > 0) {
				that.removeById("Teacher", teachersToRemove, mainItem, mainItemType, that, $(this));
			}
			if(coursesToRemove.length > 0) {
				that.removeById("Course", coursesToRemove, mainItem, mainItemType, that, $(this));
			}
		});
	}

	initDropdowns(item) {

		// Fill single-dropdowns
		$('.dropdown-single').each((index, v) => {
			let dropdown = $(v);
			let database = dropdown.attr('dropdown-database');

			window[database].find('', (results) => {
				results.forEach((result) => {
					let option = $('<option>').attr('data-id', result._id);

					// Skip the option if it already exists.
					if (dropdown.children('[data-id="' + result._id + '"]').length) {
						return;
					}

					if (result.name) option.text(result.name);
					else if (result.firstname) option.text(result.firstname + ' ' + result.lastname);
					else if (result.username) option.text(result.username);
					else if (result.message) option.text(result.message.substr(0, 30));
					else if (result.room) option.text(result.room.name);

					dropdown.append(option);
				});
			});
		});

		// Fill multi-dropdowns
		$('.dropdown-menu').each((index, v) => {
			let dropdown = $(v);
			let database = dropdown.attr('dropdown-database');
			let bindToggle = dropdown.attr('bind-toggle');

			window[database].find('', (results) => {
				results.forEach((result) => {

					// Skip the option if it already exists.
					if (dropdown.children('[data-id="' + result._id + '"]').length)
						return;

					let li = $('<li>')
						.attr('bind-toggle', bindToggle)
						.attr('data-id', result._id);

					let aTag = $('<a>').appendTo(li);

					if (result.name) aTag.text(result.name);
					else if (result.firstname) aTag.text(result.firstname + ' ' + result.lastname);
					else if (result.username) aTag.text(result.username);
					else if (result.message) aTag.text(result.message.substr(0, 30));
					else if (result.room) aTag.text(result.room.name);

					aTag.append('<span></span>');

					dropdown.append(li);
				});
			});
		});

		// Replace datetime-inputs
		// DISABLED due to un-tested before Sunday-deadline
		// let dateInputs = $('[type="datetime"]');
		// dateInputs.each((index, v) => {
		// 	v = $(v);
		// 	let time = new Date(v.attr('time'));
		// 	let convertedDate =
		// 		(1900 + time.getYear())
		// 		+ '-' + addZero(time.getMonth())
		// 		+ '-' + addZero(time.getDate())
		// 		+ 'T' + addZero(time.getHours())
		// 		+ ':' + addZero(time.getMinutes())
		// 		+ ':' + addZero(time.getSeconds());

		// 	// Adds leading zero to numbers below 10.
		// 	function addZero(n) {
		// 		return ("00" + parseInt(n, 10)).slice(-2);
		// 	}

		// 	let newDateInput =
		// 	$('<input class="form-control">')
		// 	.val(convertedDate)
		// 	.attr('type', v.attr('datetime-local'))
		// 	.attr('bind-change', v.attr('bind-change'))
		// 	.attr('placeholder', v.attr('placeholder'));

		// 	v.after(newDateInput);
		// });
		// dateInputs.remove();
	}

	toggleMultipleDropdown(item){
		let courseId = $(this).attr('data-id');
		if (!courseId)
			return;

		$(this).find('span').toggleClass('glyphicon glyphicon-ok checked-course');

		let key = $(this).attr('bind-toggle');
		let selectedItems = [];

		if (item.hasOwnProperty(key)) {
			selectedItems = item[key].map((v) => {
				return typeof v === 'object' ? v._id : v
			});
		}

		// Adds or Removes the course from the array
		let foundIndex = selectedItems.indexOf(courseId);
		if (foundIndex > -1)
			selectedItems.splice(foundIndex, 1);
		else
			selectedItems.push(courseId);

		item[key] = selectedItems;
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

	removeById(entity, ids, mainItem, mainItemType, that, buttonClicked) {
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
		let closestItem = elem.closest('item');
		let aTag = closestItem.parent().children('a');

		window[mainItemType].update(mainItem._id, updateObj, function() {
			// Close the edit panel.
			closestItem.remove();
			$('.edit-mode').removeClass('edit-mode');

			// Re-open the edit panel.
			aTag.trigger('click');
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
}
