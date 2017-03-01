var adminSearchHashMap =  {};
var adminSearchHashMapPopulated =  {};

class AdminSearch {

	constructor(dbType) {
		this.dbType = dbType;
		this.container = $('.admin-search-container');
		this.previousInput = '';
	}

	init() {
		this.container.off();
		this.dbSchema = this.getDbSchema();
		adminSearchHashMap = {};
		this.filter = new AdminFilter(this.dbType);

		this.container.empty().template('admin-search', {
			title: getDbTypeAsPlural(this.dbType),
			type: this.dbType
		});

		this.filter.run('', this.displayItems, this);

		new AdminEdit(this.dbSchema, this.getItemIdFromElement);

		new AdminCreate(this.dbSchema, this.dbType);

		this.addEventListeners();
	}

	addEventListeners() {
		let that = this;

		// on item click
		this.container.on('click', '.search-list li', function(e) {
    		if(e.target != $(this).children('a')[0])
				return;

			let item = that.getItemIdFromElement($(this));

			$('.admin-search-container item').remove();

			// dropdown and courselist creater
			let haveCourses = (item.courses ? true : false);
			let haveEducation = (item.education ? true : false);

			if(haveCourses) {

				let courseIds, queryStringCourses;

				courseIds = item.courses.map( course => '"' + course._id + '"' );
				queryStringCourses = 'find/{ _id: { $nin: [' + courseIds + '] } }';
				
				if(item.role === "Student") {
					let queryStringEducations;

					if(haveEducation) {
						queryStringEducations = 'find/{ _id: { $ne: "' + item.education._id + '" } }';
					} else {
						queryStringEducations = '';
					}

					Course.find(queryStringCourses, (courses, err) => {
						Education.find(queryStringEducations, (educations, err) => {
							$(this).template('admin-edit', {
								type: that.dbType,
								item: item,
								dropdowncourses: courses,
								dropdowneducations: educations
							});
						});
					});
				} else {
					Course.find(queryStringCourses, (courses, err) => {
						$(this).template('admin-edit', {
							type: that.dbType,
							item: item,
							dropdowncourses: courses
						});
					});
				}
			} else {				
				$(this).template('admin-edit', {
					type: that.dbType,
					item: item
				});
			}
		});



		// search box
		let oldInputLength = 0;
		let delayTimeout = null;

		this.container.on('keyup', 'input[type="search"]', function() {
			let input = $(this).val().trim();

			// abort if the input hasn't changed.
			if (that.previousInput == input) return;
			that.previousInput = input;

			// Abort the old Timeout if there's one active.
			if (delayTimeout !== null) clearTimeout(delayTimeout);

			// Wait a few milliseconds for more input
			delayTimeout = setTimeout(()=>{
				that.filter.resetLimit();
				that.filter.run(input, that.displayItems, that);
				delayTimeout = null;
			}, 300);
		});

		$('body').on('click', 'a.increase-limit', function() {
			that.filter.increaseLimit();
			that.filter.run($('input[type="search"]').val().trim(), that.displayItems, that);
		});

		$('body').on('click', 'help-button', function(e) {
			e.stopPropagation();
			$(this).children().toggle();
		});

		$('body').on('click', function(e) {
			e.stopPropagation();
			$('help-button span').hide();
		});
	}

	displayItems(that) {
		let listElement = that.container.find('.search-list');

		listElement.empty().template('admin-search-list', {
			mainItems: adminSearchHashMap,
			populatedItems: adminSearchHashMapPopulated,
			mainType: getDbTypeAsPlural(that.dbType),
			type: that.dbType,
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
			teacher: Teacher,
			booking: Booking
		};

		return schemas[this.dbType];
	}
}


// Replace first letter with UpperCase. Add missing s at end. Replace -y with ies. Replace -fe with ves
function getDbTypeAsPlural(name) {
	name = name.toLowerCase();

	if (name.lastIndexOf('y') == name.length - 1) {
		name = name.substr(0, name.length - 1) + 'ies';
	} else if (name.lastIndexOf('fe') == name.length - 2) {
		name = name.substr(1, name.length - 2) + 'ves';
	} else if (name.lastIndexOf('s') != name.length - 1) {
		name += 's';
	}

	name = name[0].toUpperCase() + name.substr(1);

	return name;
}