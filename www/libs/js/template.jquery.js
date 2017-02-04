// Ironboy, 2017

// load and use templates written as ES6 template literals,
// provide simple repeat and if functionality
// as well of includes of templates in templates

// see https://developer.mozilla.org/sv-SE/docs/
// Web/JavaScript/Reference/Template_literals
// for a basic explanation of template literals

// USAGE

// Load all templates
// $.loadTemplates(fileNames[Array], callback);

// Apply a template
// $('.selector').template(templateName[String],object);

// Repeats inside templates (for arrays)
// [repeat varName,iteratorVarName] ... html ... [endrepeat]

// Repeats inside templates (for object)
// [repeat varName,keyProp,valProp] ... html ... [endrepeat]

// Ifs inside templates
// [if condition]
//    ... html ...
// [else if condition]
//    ...html...
// [else]
//   ...html...
// [endif]

// Include a template in a template
// [template templateName]

// Include a template in a template, give it a new scope
// [template templateName, scopeObject]

// Note: repeat, if and template directives
// are converted into pure  template literal syntax
// using a few basic regular expressions


// apply a template (as a jQuery module)
(function ($) {

  var templates = {};

  function replacements(x){

    // Template include with scope object
    x = x.replace(
      /\[template\s*([a-zA-Z0-9-_.$]*)\s*,([^\]]*)\]/g,
      '${_template((t)=>{' +
      'var scope = t;' +
      'for(var i in t){eval("var " + i + "=t[i]");}' +
      'return eval("`" + templates["$1"] + "`")},$2)}'
    );

    // Template include
    x = x.replace(
      /\[template\s*([a-zA-Z0-9-_.$]*)\s*\]/g,
      '${_template(()=>{return eval("`" + templates["$1"] + "`")})}'
    );

    // Object repeat
    x = x.replace(
      /\[repeat\s{1,}([a-zA-Z0-9-_.$]*)\s*,\s*([a-zA-Z0-9-_.$]*)\s*,\s*([a-zA-Z0-9-_.$]*)\s*\]/g,
      '${_repeat_obj($1,($2,$3)=>{return `'
    );

    // Array repeat
    x = x.replace(
      /\[repeat\s{1,}([a-zA-Z0-9-_.$]*)\s*,\s*([a-zA-Z0-9-_.$]*)\s*\]/g,
      '${_repeat($1,($2)=>{return `'
    );
    x = x.replace(/\[endrepeat\]/g,'`})}');

    // Ifs
    x = x.replace(/\[if([^\]]*)\]/g,'${_if($1,()=>{return `');
    x = x.replace(/\[else\s*if([^\]]*)\]/g,'`})}${_else_if($1,()=>{return `');
    x = x.replace(/\[else\]/g,'`})}${_else(()=>{return `');
    x = x.replace(/\[endif\]/g,'`})}${_endif()}');

    return x;
  }

	$.loadTemplates = (
		fileNames,
		callback,
		folderPath = "templates",
		extension = "html"
	) => {
		let co = 0;
		fileNames.forEach((tname)=>{
			$.get(folderPath + '/' + tname + '.' + extension,(data)=>{
				co++;
				templates[nameWithoutFolder(tname)] = replacements(data);
				if(co == fileNames.length){
					callback();
				}
			});
		});
	};

	function nameWithoutFolder(name) {
		let names = name.split('/');
		return names[names.length - 1];
	}

  var ifscopes = [];

  function _repeat(arr,func){
    return arr.map(func).join('');
  }

  function _repeat_obj(obj,func){
    var arr = [];
    for(var key in obj){
      arr.push(func(key,obj[key]));
    }
    return arr.join('');
  }

  function _if(condition,func){
    ifscopes.push(condition);
    return condition ? func() : '';
  }

  function _else_if(condition,func){
    if(ifscopes[ifscopes.length-1]){ return ''; }
    ifscopes[ifscopes.length-1] = condition;
    return condition ? func() : '';
  }

  function _else(func){
    if(ifscopes[ifscopes.length-1]){ return ''; }
    return func();
  }

  function _endif(){
    ifscopes.pop();
    return '';
  }

  function _template(html,scopeObj){
    return html(scopeObj);
  }

  $.fn.template = function(templateName,t) {
    // evaluating a template as a template literal
    var scope = t;
    for(var i in t){
      eval("var " + i + '=t[i]');
    }
    var tliteral;
	eval('tliteral = `' + templates[templateName] + '`');

	// Run regexp again after applying a 2nd level of templates.
	eval('tliteral = `' + replacements(tliteral) + '`');

    // using it for output
    $(this).append(tliteral);
    return this;
  };

}(jQuery));
