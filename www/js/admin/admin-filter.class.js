class AdminFilter {

	constructor(dbType, dbSchema) {
		this.dbType = dbType;
		this.dbSchema = dbSchema;
	}

	admin(input, whenDone) {
		let result = [];
		result.push(() => { this.queryWrapper(Admin, `find/{ username: { $regex: /.*` + input + `.*/, $options: "i" } }`, whenDone); });

		return result;
	}

	course(input, whenDone) {
		let result = [];
		result.push(() => { this.queryWrapper(Course, '', whenDone); });

		return result;
	}

	education(input, whenDone) {
		let result = [];
		result.push(() => { this.queryWrapper(Education, '', whenDone); });

		return result;
	}

	room(input, whenDone) {
		let result = [];
		result.push(() => { this.queryWrapper(Room, '', whenDone); });

		return result;
	}

	student(input, whenDone) {
		let result = [];
		result.push(() => { this.queryWrapper(Student, this._TeacherAndStudent(input), whenDone); });

		return result;
	}

	teacher(input, whenDone) {
		let result = [];
		result.push(() => { this.queryWrapper(Teacher, this._TeacherAndStudent(input), whenDone); });

		return result;
	}

	queryWrapper(dbSchema, query, findCallback) {
		dbSchema.find(query, (items) => {
			this.removeDuplicateItems(items, this.itemHashMap);
			items.map(item => this.itemHashMap[item._id] = item);
			findCallback();
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
