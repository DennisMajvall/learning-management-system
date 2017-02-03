// ES6 style class that is a factory
// that creates wrappers for REST requests
// to a specific REST entity

class RestEntity {

  constructor(entityName){
    this.baseUrl = '/rest/' + entityName + '/';
  }

  create(properties,callback){

    $.ajax({
      url: this.baseUrl,
      type: "POST",
      dataType: "json",
      // don't process the request body
      processData: false,
      // and tell Node that it is raw json
      headers: {"Content-Type": "application/json"},
      // the request body
      data: JSON.stringify(properties),
      // callback functions
      success: callback,
      error: function(error){
        callback({_error:error.responseJSON});
      }
    });

  }

  find(idOrQuery,callback){

    idOrQuery = idOrQuery || '';

    // if just a callback set id or query
    // to nothing
    if(typeof idOrQuery == "function"){
      callback = idOrQuery;
      idOrQuery = '';
    }

    $.ajax({
      url: this.baseUrl + idOrQuery,
      type: "GET",
      dataType: "json",
      success: callback,
      error: function(error){
        callback({_error:error.responseJSON});
      }
    });

  }

  update(idOrQuery,properties,callback){
    $.ajax({
      url: this.baseUrl + idOrQuery,
      type: "PUT",
      dataType: "json",
      // don't process the request body
      processData: false,
      // and tell Node that it is raw json
      headers: {"Content-Type": "application/json"},
      // the request body
      data: JSON.stringify(properties),
      // callback functions
      success: callback,
      error: function(error){
        callback({_error:error.responseJSON});
      }
    });
  }

  delete(idOrQuery,callback){
    $.ajax({
      url: this.baseUrl + idOrQuery,
      type: "DELETE",
      dataType: "json",
      // callback functions
      success: callback,
      error: function(error){
        callback({_error:error.responseJSON});
      }
    });
  }

}
