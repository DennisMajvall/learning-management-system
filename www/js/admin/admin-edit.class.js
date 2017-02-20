class AdminEdit {

	constructor(dbSchema, findItemFunc) {

		let that = this;

		$('.admin-result-container').on('click', 'button.delete-item', function() {
			let item = findItemFunc($(this));

			dbSchema.delete(item._id, () => {
				location.reload();
			});
		});

		$('.admin-result-container').on('click', 'button.save-item', function() {
			let item = findItemFunc($(this));
			let objectToSave = Object.assign({}, item);

			delete objectToSave._id;

			if (objectToSave.password && objectToSave.password == "[secret]")
				delete objectToSave.password;

			dbSchema.update(item._id, objectToSave, () => {
				location.reload();
			});
		});

		$('.admin-result-container').on('keyup', '[bind-key]', function() {
			let item = findItemFunc($(this));
			let key = $(this).attr('bind-key');

			item[key] = $(this).val().trim();
		});

		// highlight items
		$('.admin-result-container').on('click', 'a', function() {
			$(this).toggleClass('active');
		});

		// remove marked items
		$('.admin-result-container').on('click', 'button.remove-item', function() {
			let studentsToRemove = [];
			let teachersToRemove = [];
			let coursesToRemove = [];
			let educationsToRemove = [];
			let itemsToRemove = $('.admin-result-container a.active');

			// use .edit-buttons as a referens point to get course
			let mainItem = findItemFunc($('.admin-result-container .delete-item'));

			that.sortItemsToRemove(itemsToRemove, studentsToRemove, teachersToRemove, coursesToRemove, educationsToRemove);

			if(studentsToRemove.length > 0){
				that.removeById("Student", studentsToRemove, mainItem, that);
			}
			if(teachersToRemove.length > 0){
				that.removeById("Teacher", teachersToRemove, mainItem, that);
			}
			if(educationsToRemove.length > 0){
				that.removeById("Education", educationsToRemove, mainItem, that);
			}
			if(coursesToRemove.length > 0){
				that.removeById("Course", coursesToRemove, mainItem, that);
			}
		});
	}

	sortItemsToRemove(itemsToRemove, studentsToRemove, teachersToRemove, coursesToRemove, educationsToRemove){
		itemsToRemove.each(function(){
			let itemCategory = $(this).closest('[item-type]').attr('item-type');
			let itemId = $(this).attr('list-item-id');

			if(itemCategory === "Student"){
				studentsToRemove.push(itemId);
			} else if(itemCategory === "Teacher"){
				teachersToRemove.push(itemId);
			} else if(itemCategory === "Education"){
				educationsToRemove.push(itemId);
			} else if(itemCategory === "Course"){
				coursesToRemove.push(itemId);
			}
		});
	}

	removeById(entity, ids, mainItem, that){
		var plEntity = entity.toLowerCase() + 's';
		mainItem[plEntity] = mainItem[plEntity].filter(function(item){
			let shouldKeep = ids.indexOf(item._id) == -1;
			if(!shouldKeep){
				that.removeFromEntity(entity, item, mainItem);
			}
			return shouldKeep;
		});
		var updateObj = {};
		updateObj[plEntity] = mainItem[plEntity];
		if(entity === "Student" || entity === "Teacher"){
			Course.update(mainItem._id, updateObj, function(){
				$('.admin-result-container').empty().template('admin-edit', {
					type: "course",
					item: mainItem
				});
			});
		} else if(entity === "Course"){
			Student.update(mainItem._id, updateObj, function(){
				$('.admin-result-container').empty().template('admin-edit', {
					type: "student",
					item: mainItem
				});
			});
			Teacher.update(mainItem._id, updateObj, function(){
				$('.admin-result-container').empty().template('admin-edit', {
					type: "teacher",
					item: mainItem
				});				
			});
		} else if(entity === "Education"){
			Course.update(mainItem._id, updateObj, function(){
				$('.admin-result-container').empty().template('admin-edit', {
					type: "course",
					item: mainItem
				});
			});
		}
	}

	removeFromEntity(entity, obj, mainItem){
		if(entity === "Student" || entity === "Teacher"){
			obj.courses = obj.courses.filter(function(course){
				return mainItem._id.indexOf(course) == -1;
			});
			window[entity].update(obj._id, {courses: obj.courses});
		}

		if(entity === "Course"){
			obj.students = obj.students.filter(function(student){
				return mainItem._id.indexOf(student) == -1;
			});
			obj.teachers = obj.teachers.filter(function(teacher){
				return mainItem._id.indexOf(teacher) == -1;
			});
			window[entity].update(obj._id, {students: obj.students});
			window[entity].update(obj._id, {teachers: obj.teachers});
		}

		if(entity === "Education"){
			obj.courses = obj.courses.filter(function(course){
				return mainItem._id.indexOf(course) == -1;
			});
			window[entity].update(obj._id, {courses: obj.courses});
		}
	}
}