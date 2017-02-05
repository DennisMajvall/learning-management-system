class AdminFilter {

	constructor(dbType, dbSchema) {
		this.dbType = dbType;
		this.dbSchema = dbSchema;
	}

	admin(input, callback) {
		return [
			() => { this.queryWrapper(Admin, `find/{ username: { $regex: /.*` + input + `.*/, $options: "i" } }`, callback); }
		];
	}

	course(input, callback) {
		return [
			() => { this.queryWrapper(Course, '', callback); }
		];
	}

	education(input, callback) {
		return [
			() => { this.queryWrapper(Education, '', callback); }
		];
	}

	room(input, callback) {
		return [
			() => { this.queryWrapper(Room, '', callback); }
		];
	}

	student(input, callback) {
		return [
			() => { this.queryWrapper(Student, this._TeacherAndStudent(input), callback); },
			() => { this.queryWrapperPopulated(Course, `find/{ 'name': { $regex: /.*` + input + `.*/, $options: "i" } }`, 'students', callback); }
		];
	}

	teacher(input, callback) {
		return [
			() => { this.queryWrapper(Teacher, this._TeacherAndStudent(input), callback); }
		];
	}

	queryWrapper(dbSchema, query, callback) {
		dbSchema.find(query, (items) => {
			if (items.hasOwnProperty('_error')) {
				console.log('error', items._error);
			} else {
				this.removeDuplicateItems(items, this.itemHashMap);
				items.map(item => this.itemHashMap[item._id] = item);
			}
			callback();
		});
	}

	queryWrapperPopulated(dbSchema, query, populationName, callback) {
		dbSchema.find(query, (items) => {
			if (items.hasOwnProperty('_error')) {
				console.log('error', items._error);
			} else {
				items = items.map(item => item[populationName]);
				items.forEach((itemArray) => {
					this.removeDuplicateItems(itemArray, this.itemHashMap);
					itemArray.map(item => this.itemHashMap[item._id] = item);
				});
			}
			callback();
		});
	}

	_TeacherAndStudent(input) {
		let inputAsArray = input.trim().replace(/\s{2,}/g, ' ').split(' ');
		let result = '';

		if (inputAsArray.length == 1 && inputAsArray[0].length) {
			result = `find/{ 
				$or: [
					{ username: { $regex: /.*` + input + `.*/, $options: "i" } },
					{ firstname: { $regex: /.*` + input + `.*/, $options: "i" } },
					{ lastname: { $regex: /.*` + input + `.*/, $options: "i" } },
					{ phonenumber: { $regex: /.*` + input + `.*/, $options: "i" } }
				] 
			}`;
		} else if (inputAsArray.length > 1) {
			result = `find/{ 
				$and: [
					{ firstname: { $regex: /.*` + inputAsArray[0] + `.*/, $options: "i" } },
					{ lastname: { $regex: /.*` + inputAsArray[1] + `.*/, $options: "i" } }
				] 
			}`;
		}

		return result;
	}

	// Internal functions

	run(input, callback, adminSearch) {
		let that = this;
		this.itemHashMap = {};
		let queries = [];

		if (!input.length) {
			queries.push(() => { this.queryWrapper(this.dbSchema, '', whenDone); });
		} else {
			queries = this[this.dbType].call(this, input, whenDone);
		}

		let numQueries = queries.length;

		queries.forEach((doQueryFunc) => {
			doQueryFunc();
		});

		function whenDone() {
			if (--numQueries === 0) {
				callback(that.itemHashMap, adminSearch);
			}
		}
	}

	removeDuplicateItems(items, itemHashMap) {
		for (var value in itemHashMap) {
			if (items.hasOwnProperty(value)) {
				delete items[value];
			}
		}
	}
}
