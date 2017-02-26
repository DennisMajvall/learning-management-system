class AdminFilter {

	constructor(dbType, dbSchema) {
		this.dbType = dbType;
		this.dbSchema = dbSchema;
		this.limit = 20;
	}

	increaseLimit() {
		this.limit += 10;
	}

	admin(input, callback) {
		return [
			() => { this.queryWrapper(Admin, `find/{ username: { $regex: /.*` + input + `.*/, $options: "i" } }`, callback); }
		];
	}

	course(input, callback) {
		return [
			() => { this.queryWrapper(Course, `find/{ $or: [
				{ name: { $regex: /.*` + input + `.*/, $options: "i" } },
				{ description: { $regex: /.*` + input + `.*/, $options: "i" } },
				{ period: { $regex: /.*` + input + `.*/, $options: "i" } }
			]}`, callback); },
			() => { this.queryWrapperPopulated(Student, 'courses', this._TeacherAndStudent(input), callback); },
			() => { this.queryWrapperPopulated(Teacher, 'courses', this._TeacherAndStudent(input), callback); },
			() => { this.queryWrapperPopulated(Education, 'courses', `find/{ name: { $regex: /.*` + input + `.*/, $options: "i" } }`, callback); }
		];
	}

	education(input, callback) {
		return [
			() => { this.queryWrapper(Education, `find/{ $or: [
				{ name: { $regex: /.*` + input + `.*/, $options: "i" } },
				{ startYear: "` + this.toNumber(input) + `" }
			]}`, callback); }
		];
	}

	room(input, callback) {
		return [
			() => { this.queryWrapper(Room, `find/{ $or: [
				{ name: { $regex: /.*` + input + `.*/, $options: "i" } },
				{ bookedTime: { $regex: /.*` + input + `.*/, $options: "i" } },
				{ bookedBy: { $regex: /.*` + input + `.*/, $options: "i" } }
			]}`, callback); }
		];
	}

	student(input, callback) {
		return [
			() => { this.queryWrapper(Student, this._TeacherAndStudent(input), callback); },
			() => { this.queryWrapperPopulated(Course, 'students', `find/{ name: { $regex: /.*` + input + `.*/, $options: "i" } }`, callback); }
		];
	}

	teacher(input, callback) {
		return [
			() => { this.queryWrapper(Teacher, this._TeacherAndStudent(input), callback); },
			() => { this.queryWrapperPopulated(Course, 'teachers', `find/{ name: { $regex: /.*` + input + `.*/, $options: "i" } }`, callback); }
		];
	}

	toNumber(input) {
		var result = Number.parseInt(input);

		return isNaN(result) ? '' : result;
	}

	queryWrapper(dbSchema, query, callback) {
		dbSchema.find(query, (items) => {
			if (items.hasOwnProperty('_error')) {
				console.log('error', items._error);
			} else {
				this.removeDuplicateItems(items, adminSearchHashMap);
				items.map(item => adminSearchHashMap[item._id] = item);
			}
			callback();
		});
	}

	queryWrapperPopulated(dbSchema, populationName, query, callback) {
		dbSchema.find(query, (items) => {
			if (items.hasOwnProperty('_error')) {
				console.log('error', items._error);
			} else {
				items = items.map(item => item[populationName]);
				if (items.indexOf(undefined) != -1) {
					console.log('Error, wrong populationName has been sent to queryWrapperPopulated:', populationName);
					items = [];
				}
				items.forEach((itemArray) => {
					this.removeDuplicateItems(itemArray, adminSearchHashMap);
					itemArray.map(item => adminSearchHashMap[item._id] = item);
				});
			}
			callback();
		});
	}

	_TeacherAndStudent(input) {
		let inputAsArray = input.trim().replace(/\s{2,}/g, ' ').split(' ');
		let result = '';

		if (inputAsArray.length == 1 && inputAsArray[0].length) {
			result = `find/{ $or: [
				{ username: { $regex: /.*` + input + `.*/, $options: "i" } },
				{ firstname: { $regex: /.*` + input + `.*/, $options: "i" } },
				{ lastname: { $regex: /.*` + input + `.*/, $options: "i" } },
				{ phonenumber: { $regex: /.*` + input + `.*/, $options: "i" } }
			] }`;
		} else if (inputAsArray.length > 1) {
			result = `find/{ $and: [
				{ firstname: { $regex: /.*` + inputAsArray[0] + `.*/, $options: "i" } },
				{ lastname: { $regex: /.*` + inputAsArray[1] + `.*/, $options: "i" } }
			] }`;
		}

		return result;
	}

	// Internal functions

	run(input, callback, adminSearch) {
		let that = this;
		let queries = [];
		adminSearchHashMap = [];

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
				callback(adminSearch);
			}
		}
	}

	removeDuplicateItems(items) {
		for (var value in adminSearchHashMap) {
			if (items.hasOwnProperty(value)) {
				delete items[value];
			}
		}
	}
}
