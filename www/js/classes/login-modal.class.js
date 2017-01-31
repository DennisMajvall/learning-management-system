class LoginModal extends Modal {

  constructor(){

    super();

    var formElements = [
      {
        label: 'Användarnamn',
        type: 'text',
        var: 'username',
        minLength:5,
        maxLength:20
      },
      {
        label: 'Lösenord',
        type: 'password',
        var: 'password',
        minLength:6,
        maxLength:20
      },
    ];

    formHelpers.validate('login',formElements);

    var m = this.show({
      title:'Logga in',
      body:{
        form: {
          name: 'login',
          elements: formElements,
          labelMinWidth: 130
        },
        content: '<a class="register" href="#">Registrera dig</a>'
      },
      closeBtn:'Avbryt',
      saveBtn:'Logga in',
      saveBtnDisabled: true,
      save: function(){
        alert("LOGIN");
      }
    });
    m.find('.register').click(()=>{
      m.modal('hide').on('hidden.bs.modal',()=>{ new RegisterModal(); });
    });
  }

}