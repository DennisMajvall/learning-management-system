module.exports = class Restrouter {

	constructor(expressApp, _class, populate, entityName){

		// populate is optional:
		// use if want to mongoose to populate properties
		// on GET queries

		// entityName is optional:
		// * you must use it if you are using traditional mongoose
		//   models (rather than those created from classes)
		// * you can also use if you want to set a different name
		//   than the class name for the rest route

		this.app = expressApp;
		this.populate = populate;
		this._class = _class;

		// get the class name
		var className = _class.name;

		// for classes created with mongoosefromclass
		// we need to get the class name like this
		if(_class.name == "model" && _class.orgClass){
			className = _class.orgClass.name;
		}

		// If entityName exists then use it as className
		if(entityName){className = entityName;}

		// a base rest route
		this.baseRoute = '/rest/' + className.toLowerCase() + '/';

		// set up routes
		this.post();
		this.get();
		this.put();
		this.delete();
	}


	post(){

		// Since "this" will change inside routes
		var _class = this._class, that = this;

		// Create a new instance
		this.app.post(this.baseRoute, function(req, res){
			var instance = new _class(req.body);
			instance.save(function(err, result){
				if(err){res.json(err);}
				// find again so we can populate it
				that.respond('findOne',{_id:result._id}, res);
			});
		});

	}

	// A response helper for gets
	// (so we can populate things)
	respond(method, query, res){
		var m = this._class[method](query);
		if(this.populate){
			m.populate(this.populate);
		}
		m.exec(function(err, result){
			res.json(err || result);
		});
	}


	get(){

		// Since "this" will change inside routes
		var _class = this._class, that = this;

		// All instances
		this.app.get(this.baseRoute, function(req, res){
			that.respond('find',{}, res);
		});

		// Find an instance using a mongo query object
		this.app.get(this.baseRoute + 'find/*', function(req, res){
			var searchStr = decodeURIComponent(req.url.split('/find/')[1]);
			var searchObj;
			eval('searchObj = ' + searchStr);
			that.respond('find', searchObj, res);
		});

		// One instance by id
		this.app.get(this.baseRoute + ':id', function(req, res){
			that.respond('findOne',{_id:req.params.id}, res);
		});

		// Call the method of an instance
		this.app.get(this.baseRoute + ':id/:method', function(req, res){
			_class.findOne({_id:req.params.id}, function(err, result){
				res.json(err || {returns:result[req.params.method]()});
			});
		});
	}


	put(){

		// Since "this" will change inside routes
		var _class = this._class;

		// Update several instances using a mongo query object
		this.app.put(this.baseRoute + 'find/*', function(req, res){
			var searchStr = decodeURIComponent(req.url.split('/find/')[1]);
			var searchObj;
			eval('searchObj = ' + searchStr);
			_class.update(searchObj, req.body,{multi:true}, function(err, result){
				res.json(err || result);
			});
		});

		// Update one instance by id
		this.app.put(this.baseRoute + ':id', function(req, res){
			_class.update({_id:req.params.id}, req.body, function(err, result){
				res.json(err || result);
			});
		});

	}


	delete(){

		// Since "this" will change inside routes
		var _class = this._class;

		// Delete several instances using a mongo query object
		this.app.delete(this.baseRoute + 'find/*', function(req, res){
			var searchStr = decodeURIComponent(req.url.split('/find/')[1]);
			var searchObj;
			eval('searchObj = ' + searchStr);
			_class.remove(searchObj, function(err, result){
				res.json(err || result);
			});
		});

		// Delete one instance by id
		this.app.delete(this.baseRoute + ':id', function(req, res){
			_class.remove({_id:req.params.id}, function(err, result){
				res.json(err || result);
			});
		});

	}


}
