class AdminSearch {

	constructor(dbType) {
		var dbSchema = getDbSchema(dbType);
		if (!dbSchema)
			return;

		let container = $('.search-list');
		let itemHashMap = {};

		dbSchema.find('', function(data, err) {
			var itemsDisplayed = data;

			container.empty().template('admin-search', getTemplateObject(itemsDisplayed));

			// Make an array mapping the _id as an index for each item.
			itemsDisplayed.forEach(function(item, index) {
				itemHashMap[item._id] = item;
			});
		});

		container.on('click', '.search-list a', function() {
			let item = itemHashMap[$(this).attr('item-id')];

			$('.edit-area').empty().template('admin-edit', {
				type: dbType,
				item: item
			});
		});

		$('body').on('click', 'button.delete-item', function() {
			let item = itemHashMap[$(this).attr('item-id')];
			dbSchema.delete(item._id, () => {
				location.reload();
			});
		});

		function getTemplateObject(itemsDisplayed) {
			return {
				title: getTitleFromDbType(dbType),
				type: dbType,
				items: itemsDisplayed,
			};
		}

		function getDbSchema(dbType) {
			let schemas = {
				education: Education,
				course: Course,
				room: Room,
				teacher: Teacher,
				student: Student
			};

			return schemas[dbType];
		}

		function getTitleFromDbType(dbType) {
			// Replace first letter with UpperCase
			// Add missing s at end
			// Replace -y with ies
			// Replace -fe with ves

			dbType = dbType[0].toUpperCase() + dbType.substr(1);

			if (dbType.lastIndexOf('y') == dbType.length - 1) {
				dbType = dbType.substr(0, dbType.length - 1) + 'ies';
			} else if (dbType.lastIndexOf('fe') == dbType.length - 2) {
				dbType = dbType.substr(1, dbType.length - 2) + 'ves';
			} else if (dbType.lastIndexOf('s') != dbType.length - 1) {
				dbType += 's';
			}
			
			return dbType;
		}
	}
}
