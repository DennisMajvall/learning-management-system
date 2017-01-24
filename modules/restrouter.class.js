module.exports = class Restrouter {

	constructor(expressApp,_class,entityName) {
		this.app = expressApp;
		this._class = _class;

		// get the class name
		var className = _class.name;

		// for classes created with mongoosefromclass
		// we need to get the class name like this
		if(_class.name == "model" && _class.orgClass) {
			className = _class.orgClass.name;
		}

		if(entityName) {
			className = entityName;
		}

		// a base rest route
		this.baseRoute = '/rest/' + className.toLowerCase() + '/';

		// set up routes
		this.post();
		this.get();
		this.put();
		this.delete();
	}


	post() {
		// Since "this" will change inside routes
		var _class = this._class;

		// Create a new instance
		this.app.post(this.baseRoute,function(req,res) {
			var instance = new _class(req.body);
			instance.save(function(err,result) {
			res.json(err || result);
			});
		});
	}


	get() {
		// Since "this" will change inside routes
		var _class = this._class;

		// All instances
		this.app.get(this.baseRoute,function(req,res) {
			_class.find(function(err,result) {
				res.json(err || result);
			});
		});

		// Find an instance using a mongo query object
		this.app.get(this.baseRoute + 'find/*',function(req,res) {
			var searchStr = decodeURIComponent(req.url.split('/find/')[1]);
			var searchObj;
			eval('searchObj = ' + searchStr);
			_class.find(searchObj,function(err,result) {
				res.json(err || result);
			});
		});

		// One instance by id
		this.app.get(this.baseRoute + ':id',function(req,res) {
			_class.findOne({_id:req.params.id},function(err,result) {
				res.json(err || result);
			});
		});

		// Call the method of an instance
		this.app.get(this.baseRoute + ':id/:method',function(req,res) {
			_class.findOne({_id:req.params.id},function(err,result) {
				res.json(err || {returns:result[req.params.method]()});
			});
		});
	}


	put() {
		// Since "this" will change inside routes
		var _class = this._class;

		// Update several instances using a mongo query object
		this.app.put(this.baseRoute + 'find/*',function(req,res) {
			var searchStr = decodeURIComponent(req.url.split('/find/')[1]);
			var searchObj;
			eval('searchObj = ' + searchStr);
			_class.update(searchObj,req.body,{multi:true},function(err,result) {
				res.json(err || result);
			});
		});

		// Update one instance by id
		this.app.put(this.baseRoute + ':id',function(req,res) {
			_class.update({_id:req.params.id},req.body,function(err,result) {
				res.json(err || result);
			});
		});
	}


	delete() {
		// Since "this" will change inside routes
		var _class = this._class;

		// Delete several instances using a mongo query object
		this.app.delete(this.baseRoute + 'find/*',function(req,res) {
			var searchStr = decodeURIComponent(req.url.split('/find/')[1]);
			var searchObj;
			eval('searchObj = ' + searchStr);
			_class.remove(searchObj,function(err,result) {
				res.json(err || result);
			});
		});

		// Delete one instance by id
		this.app.delete(this.baseRoute + ':id',function(req,res) {
			_class.remove({_id:req.params.id},function(err,result) {
				res.json(err || result);
			});
		});
	}
}
