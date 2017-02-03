class RegisterModal extends Modal {

  constructor(){

    super();

    var formElements = [
      {
        label: 'Användarnamn',
        type: 'text',
        var: 'username',
        minLength: 5,
        maxLength: 20
      },
      {
        label: 'Lösenord',
        type: 'password',
        var: 'password',
        minLength: 6,
        maxLength:20
      },
      {
        label: 'Lösenord igen',
        type: 'password',
        var: 'passwordMatch',
        minLength: 6,
        maxLength:20
      },
      {
        label: 'Typ av användare',
        type: 'select',
        var: 'role',
        placeholder: "Välj typ",
        options: ['Owner','Kitten']
      },
      {
        label: 'Namn',
        type: 'input',
        var: 'name',
        minLength:3,
        maxLength:25,
      },
      {
        label: 'Ålder',
        type:'number',
        var: 'age',
        min:0,
        max:100
      }
    ];

    formHelpers.validate('register',formElements);

    var m = this.show({
      title:'Skapa konto',
      body:{
        form: {
          name: 'register',
          elements: formElements,
          labelMinWidth: 150
        }
      },
      closeBtn:'Avbryt',
      saveBtn:'Skapa konto',
      saveBtnDisabled: true,
      save: function(){
        var a = collectFormData(m.find('form'));
      }
    });
  }

}
