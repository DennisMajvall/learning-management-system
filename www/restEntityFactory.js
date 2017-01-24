function restEntityFactory(entityName) {

	var baseUrl = '/rest/' + entityName + '/';

	return {
		create: function(properties,callback) {
			$.ajax({
				url: baseUrl,
				type: "POST",
				dataType: "json",
				// the request body
				data: properties,
				// callback functions
				success: callback,
				error: function(error) {
					throw(error);
				}
			});
		},

		get: function(idOrQuery,callback) {
			idOrQuery = idOrQuery || '';

			$.ajax({
				url: baseUrl + idOrQuery,
				type: "GET",
				dataType: "json",
				success: callback,
				error: function(error) {
					throw(error);
				}
			});
		},

		update: function(idOrQuery,properties,callback) {
			$.ajax({
				url: baseUrl + idOrQuery,
				type: "PUT",
				dataType: "json",
				// the request body
				data: properties,
				// callback functions
				success: callback,
				error: function(error) {
					throw(error);
				}
			});
		},

		delete: function(idOrQuery,callback) {
			$.ajax({
				url: baseUrl + idOrQuery,
				type: "DELETE",
				dataType: "json",
				// callback functions
				success: callback,
				error: function(error) {
					throw(error);
				}
			});
		}
	};
}
