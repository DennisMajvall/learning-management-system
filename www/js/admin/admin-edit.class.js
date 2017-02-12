class AdminEdit {

	constructor(dbSchema, findItemFunc) {

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
		$('.edit-area').on('click', 'button.remove-items', function() {
			let itemsToRemove = $('.edit-area a.active');

			itemsToRemove.map(function(){
				let itemCategory = $(this).closest('[item-type]').attr('item-type');
				let itemId = $(this).attr('item-id');

				if(itemCategory === "students"){
					
					Student.delete(itemId, () => {
						location.reload();
					});
				} else if(itemCategory === "teachers"){

					Teacher.delete(itemId, () => {
						location.reload();
					});
				} else if(itemCategory === "courses"){

					Course.delete(itemId, () => {
						location.reload();
					});
				} else if(itemCategory === "educations"){

					Education.delete(itemId, () => {
						location.reload();
					});
				}
			});
		});
	}
}
