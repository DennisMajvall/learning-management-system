class MainNavbar {

  constructor(){
    $('body').template('navbar',{
      brand: 'Owners &amp; kittens',
      links: [
        {name: 'REST tests', active:true},
        {name: 'Dummy'},
        {name: 'Dummy 2'},
      ],
      userStatus: 'Ej inloggad',
      userOptions: ['Logga in', 'Skapa konto']
    });
    $('li a:contains("Logga in")').click(()=>{new LoginModal();});
    $('li a:contains("Skapa konto")').click(()=>{new RegisterModal();});

  }

}
