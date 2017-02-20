var adminSearchHashMap =  {};

class AdminSearch {

	constructor(dbType) {
		this.dbType = dbType;
		this.container = $('.admin-search-container');
	}

	init() {
		this.container.off();
		this.dbSchema = this.getDbSchema();
		adminSearchHashMap = {};
		this.filter = new AdminFilter(this.dbType, this.dbSchema);

		$('.admin-result-container').empty();
		this.container.empty().template('admin-search', {
			title: this.getTitleFromDbType(),
			type: this.dbType
		});

		this.filter.run('', this.displayItems, this);

		new AdminEdit(this.dbSchema, (elem) => {
			return this.getItemIdFromElement(elem);
		});

		new AdminCreate(this.dbSchema, this.dbType);

		this.addEventListeners();
	}

	addEventListeners() {
		let that = this;

		// on item click
		this.container.on('click', '.search-list li', onItemClick);
		function onItemClick(e) {
    		if(e.target != $(this).children('a')[0])
				return;

			let item = that.getItemIdFromElement($(this));

			$('.admin-search-container item').remove();

			$(this).template('admin-edit', {
				type: that.dbType,
				item: item
			});
		}

		// search box
		let oldInputLength = 0;
		let delayTimeout = null;

		this.container.on('keyup', 'input[type="search"]', onKeyUp);
		function onKeyUp() {
			let input = $(this).val().trim();

			// abort if the input.length hasn't changed.
			if (oldInputLength == input.length) return;
			oldInputLength = input.length;

			// Abort the old Timeout if there's one active.
			if (delayTimeout !== null) clearTimeout(delayTimeout);

			// Wait a few milliseconds for more input
			delayTimeout = setTimeout(()=>{
				that.filter.run(input, that.displayItems, that);
				delayTimeout = null;
			}, 300);
		}

		$('body').on('click', 'a.increase-limit', onIncreaseLimit);
		function onIncreaseLimit() {
			that.filter.increaseLimit();
			that.filter.run($('input[type="search"]').val().trim(), that.displayItems, that);
		}
	}

	displayItems(that) {
		let listElement = that.container.find('.search-list');

		listElement.empty().template('admin-search-list', {
			itemObj: adminSearchHashMap,
			type: that.dbType
		});
	}

	getItemIdFromElement(elem) {
		let correctElem = elem.closest('[item-id]');
		if (!correctElem)
			console.log('getItemIdFromElement failed on', elem);

		return adminSearchHashMap[correctElem.attr('item-id')];
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
