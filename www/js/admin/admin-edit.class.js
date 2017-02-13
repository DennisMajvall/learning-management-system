class AdminEdit {

	constructor(dbSchema, findItemFunc) {

		$('.edit-area').on('click', 'button.delete-item', function() {
			let item = findItemFunc($(this));

			dbSchema.delete(item._id, () => {
				location.reload();
			});
		});

		$('.edit-area').on('click', 'button.save-item', function() {
			let item = findItemFunc($(this));
			let objectToSave = Object.assign({}, item);

			delete objectToSave._id;

			if (objectToSave.password && objectToSave.password == "[secret]")
				delete objectToSave.password;

			dbSchema.update(item._id, objectToSave, () => {
				location.reload();
			});
		});

		$('.edit-area').on('keyup', '[bind-key]', function() {
			let item = findItemFunc($(this));
			let key = $(this).attr('bind-key');

			item[key] = $(this).val().trim();
		});

		// highlight items
		$('.edit-area').on('click', 'a', function() {
			$(this).toggleClass('active');
		});

		// remove marked items
		$('.edit-area').on('click', 'button.remove-items', function() {
			let itemsToRemove = $('.edit-area a.active');

			// use .edit-buttons as a referens point to get course
			let mainItem = findItemFunc($('.edit-area .edit-buttons'));

			itemsToRemove.map(function() {
				let itemCategory = $(this).closest('[item-type]').attr('item-type');
				let itemId = $(this).attr('list-item-id');

				let objectToSave = Object.assign({}, item);

				if(itemCategory === "students") {

					console.log(itemId);
					// Course.update(mainItem._id, objectToSave, () => {
					// 	location.reload();
					// });
				} else if(itemCategory === "teachers") {

					console.log(itemId);
					// Course.update(mainItem._id, objectToSave, () => {
					// 	location.reload();
					// });
				}
			});
		});
	}
}
