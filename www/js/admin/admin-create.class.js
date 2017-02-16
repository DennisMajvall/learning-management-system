class AdminCreate {

	constructor(dbSchema, dbType) {
		let container = $('.create-area');

		$('#toggle-create').on('click', (e) => {
			$(e.target).hide();
			container.empty().template('admin-create', {
				type: dbType
			});
		});

		container.on('click', '.cancel-button', () => {
			$('#toggle-create').show();
			container.empty();
		});

		container.on('click', '.create-button', (e) => {
			let objToSave = {};

			container
				.find('[bind-key]')
				.each(function() {
					objToSave[$(this).attr('bind-key')] = $(this).val();
				});

			dbSchema.create(objToSave, (resultObj, err) => {
				location.reload();
			});
		});
	}
}
