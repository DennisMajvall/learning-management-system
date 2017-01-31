class FormHelpers {
//http://bootsnipp.com/snippets/featured/input-validation-colorful-input-groups
  constructor(){

    this.validationMem = {};

    if(!FormHelpers.eventsRegistered){
      // only run once, ever
      this.events();
      FormHelpers.eventsRegistered = true;
    }

  }

  events(){
    var that = this;

    $(document).on('focus','form .select-trigger',function(){
      $(this).parent().find('.dropdown-toggle').click();
    });
    $(document).on('click','form .dropdown-menu li a',function(){
      $(this).parents('.input-group').find('input').val($(this).text());
    });
    $(document).on('keyup change','form input, form textarea',function(){
      var formEl = $(this).parents('form').first();
      var formName = formEl.attr('name');
      var myName = $(this).attr('name');
      var myVal = $(this).val();
      that.validator(formEl,formName,myName,myVal);
    });
  }

  collectFormData(form){
    var data = {};
    form.find('input').each(function(){
      var key = $(this).attr('name');
      var val = $(this).val();
      data[key] = val;
    });
    return data;
  }

  validate(formName,elementDef){
    // register a form for validation
    var hash = {};
    elementDef.forEach((x)=>{
      hash[x.var] = x;
    });
    this.validationMem[formName] = hash;
  }

  validator(formEl,formName,elName,elVal){

    // check if we have some defs to validate against
    if(!this.validationMem[formName]){ return; }
    var def = this.validationMem[formName];
    var rule = def[elName];
    if(!rule){ return; }

    // check values
    var error = false;
    error = error || (rule.minLength && elVal.length < rule.minLength);
    error = error || (rule.maxLength && elVal.length > rule.maxLength);
    error = error || (rule.type == "number" && elVal.length < 1);
    error = error || (rule.type == "number" && rule.min !== undefined && elVal/1 < rule.min);
    error = error || (rule.type == "number" && rule.max !== undefined && elVal/1 > rule.max);
    error = error && (!rule.optional);

    // change display
    var iconEl = formEl.find('.validation-state-' + elName + ' span');
    iconEl.removeClass('glyphicon-asterix glyphicon-remove glyphicon-ok');
    iconEl.parent().removeClass('danger success info');

    if(rule.optional){
      iconEl.addClass('glyphicon-asterix');
      iconEl.parent().addClass('info');
    }
    else {
      iconEl.addClass(error ? 'glyphicon-remove' : 'glyphicon-ok');
      iconEl.parent().addClass(error ? 'danger' : 'success');
    }

    // any errors left?
    var errorCo = formEl.find('.danger .glyphicon-remove').length;

    // disable enable saveBtn
    var saveBtn = formEl.find('.save-btn');
    // if no save btn in form, look for it in modal
    if(saveBtn.length === 0){
      saveBtn = formEl.parents('.modal').first().find('.save-btn');
    }
    saveBtn.prop('disabled',errorCo);
  }

}