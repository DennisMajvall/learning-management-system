module.exports = class Kitten extends User {

  schema(){
    return Object.assign({},super.schema(),{
      name: {type: String, required: true},
      age: {type: Number, min:0, max:30, required:true},
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner'
      }
    });
  }

  populate(){
    return 'owner';
  }

  speak(){
    var greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    return greeting;
  }

}