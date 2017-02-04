class AdminSearch {

	constructor(dbType) {
		this.dbType = dbType;
		this.itemHashMap = {};
		this.container = $('.search-list');
	}

	init() {
		this.dbSchema = this.getDbSchema();

		this.container.empty().template('admin-search', {
			title: this.getTitleFromDbType()
		});

		this.findItems(new AdminFilter().defaultQuery);

		new AdminEdit (this.dbSchema, (elem) => {
			return this.getItemIdFromElement(elem);
		});

		this.addEventListeners();
	}

	addEventListeners() {
		let that = this;

		// on item click
		that.container.on('click', '.search-list a', function() {
			let item = that.getItemIdFromElement($(this));

			$('.edit-area').empty().template('admin-edit', {
				type: that.dbType,
				item: item
			});
		});

		// search box
		let oldInputLength = 0;
		let delayTimeout = null;
		
		that.container.on('keyup', 'input[type="search"]', function() {
			let input = $(this).val();

			// abort if the input.length hasn't changed.
			if (oldInputLength == input.length) return;
			oldInputLength = input.length;

			// Abort the old Timeout if there's one active.
			if (delayTimeout !== null) clearTimeout(delayTimeout);

			// Wait a few milliseconds for more input
			delayTimeout = setTimeout(()=>{
				console.log(input);
				that.findItems(new AdminFilter(input).dbType, input);
				delayTimeout = null;
			}, 300);
		});
	}

	findItems(query, input = '') {
		if (!this.dbSchema) {
			console.log('AdminSearch.findItems failed due to missing dbSchema.');
			return;
		}

		this.dbSchema.find(query, (data, err) => {
			var itemsDisplayed = data;

			this.container.find('.search-list').empty().template('admin-search-list', {
				items: itemsDisplayed,
				type: this.dbType
			});

			// Make an array mapping the _id as an index for each item.
			this.itemHashMap = {};
			itemsDisplayed.forEach((item) => {
				this.itemHashMap[item._id] = item;
			});
		});
	}
	
	getItemIdFromElement(elem) {
		let correctElem = elem.closest('[item-id]');

		if (!correctElem)
			console.log('getItemIdFromElement failed on', elem);

		return this.itemHashMap[correctElem.attr('item-id')];
	}

	getDbSchema() {
		let schemas = {
			admin: Admin,
			course: Course,
			education: Education,
			room: Room,
			student: Student,
			teacher: Teacher
		};

		return schemas[this.dbType];
	}

	// Replace first letter with UpperCase. Add missing s at end. Replace -y with ies. Replace -fe with ves
	getTitleFromDbType() {
		let name = this.dbType;
		name = name[0].toUpperCase() + name.substr(1);

		if (name.lastIndexOf('y') == name.length - 1) {
			name = name.substr(0, name.length - 1) + 'ies';
		} else if (name.lastIndexOf('fe') == name.length - 2) {
			name = name.substr(1, name.length - 2) + 'ves';
		} else if (name.lastIndexOf('s') != name.length - 1) {
			name += 's';
		}

		return name;
	}
}
