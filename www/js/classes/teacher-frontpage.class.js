class Teachermessage {

  constructor(){
    $('body').template('teacher-mess',{
      courses: [
        {name: 'Coursename 1'},
        {name: 'Coursename 2'},
        {name: 'Coursename 3'},
        {name: 'Coursename 4'},
        {name: 'Coursename 5'},
        {name: 'Coursename 6'}
      ]
    });
  }
}
