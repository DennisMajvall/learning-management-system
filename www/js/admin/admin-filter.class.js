class AdminFilter {

	constructor(dbType, dbSchema) {
		this.dbType = dbType;
		this.dbSchema = dbSchema;
	}

	admin(input, whenDone) {
		return [
			() => { this.queryWrapper(Admin, `find/{ username: { $regex: /.*` + input + `.*/, $options: "i" } }`, whenDone); }
		];
	}

	course(input, whenDone) {
		return [
			() => { this.queryWrapper(Course, '', whenDone); }
		];
	}

	education(input, whenDone) {
		return [
			() => { this.queryWrapper(Education, '', whenDone); }
		];
	}

	room(input, whenDone) {
		return [
			() => { this.queryWrapper(Room, '', whenDone); }
		];
	}

	student(input, whenDone) {
		return [
			() => { this.queryWrapper(Student, this._TeacherAndStudent(input), whenDone); }
		];
	}

	teacher(input, whenDone) {
		return [
			() => { this.queryWrapper(Teacher, this._TeacherAndStudent(input), whenDone); }
		];
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
