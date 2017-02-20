class AdminEdit {

	constructor(dbSchema, findItemFunc) {
		let that = this;
		this.container = $('.admin-search-container');

		this.container.on('click', 'button.delete-item', function() {
			let item = findItemFunc($(this));

			dbSchema.delete(item._id, () => {
				location.reload();
			});
		});

		this.container.on('click', 'button.save-item', function() {
			let item = findItemFunc($(this));
			let objectToSave = Object.assign({}, item);

			delete objectToSave._id;

			if (objectToSave.password && objectToSave.password == "[secret]")
				delete objectToSave.password;

			dbSchema.update(item._id, objectToSave, () => {
				location.reload();
			});
		});

		this.container.on('keyup', '[bind-key]', function() {
			let item = findItemFunc($(this));
			let key = $(this).attr('bind-key');

			item[key] = $(this).val().trim();
		});

		// highlight items
		this.container.on('click', '.list-group a', function() {
			$(this).toggleClass('active');
		});

		// remove marked items
		this.container.on('click', 'button.remove-item', function() {
			let studentsToRemove = [];
			let teachersToRemove = [];
			let itemsToRemove = $('.admin-result-container a.active');

			// use .edit-buttons as a referens point to get course
			let mainItem = findItemFunc($('.admin-result-container .delete-item'));

			itemsToRemove.each(function() {
				let itemCategory = $(this).closest('[item-type]').attr('item-type');
				let itemId = $(this).attr('list-item-id');

				that.sortItemsToRemove(itemsToRemove, studentsToRemove, teachersToRemove);

				if(studentsToRemove.length > 0) {
					that.removeById("Student", studentsToRemove, mainItem, that);
				}
				if(teachersToRemove.length > 0) {
					that.removeById("Teacher", teachersToRemove, mainItem, that);
				}
			});
		});
	}

	sortItemsToRemove(itemsToRemove, studentsToRemove, teachersToRemove) {
		itemsToRemove.each(function() {
			let itemCategory = $(this).closest('[item-type]').attr('item-type');
			let itemId = $(this).attr('list-item-id');

			if(itemCategory === "students") {
				studentsToRemove.push(itemId);
			} else if(itemCategory === "teachers") {
				teachersToRemove.push(itemId);
			}
		});
	}

	removeById(entity, ids, mainItem, that) {
		// note entity should be Student or Teacher
		var plEntity = entity.toLowerCase() + 's';
		mainItem[plEntity] = mainItem[plEntity].filter(function(item) {
			let shouldKeep = ids.indexOf(item._id) == -1;
			if(!shouldKeep) {
				that.removeCourseFromEntity(entity, item, mainItem);
			}
			return shouldKeep;
		});
		var updateObj = {};
		updateObj[plEntity] = mainItem[plEntity];
		Course.update(mainItem._id, updateObj);
	}

	removeCourseFromEntity(entity, obj, mainItem) {
		obj.courses = obj.courses.filter(function(course) {
			return mainItem._id.indexOf(course) == -1;
		});
		window[entity].update(obj._id, {courses: obj.courses});
	}
}
