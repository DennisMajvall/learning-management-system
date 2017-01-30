// Our rest entitites

var Teacher = new RestEntity('teacher');
var Course = new RestEntity('course');


// Example: Creating a new Teacher

// Teacher.create({
// 	firstname: "Svenne",
// 	lastname: "Banan",
// 	email:"info@hshhs.com",
// 	password: "12345"
// }, function(data, err){
// 	console.log("Created!", data);
// });


// Example: Creating a Course

// Course.create({
// 	name: "The Web According to Krug",
// }, function(data, err){
// 	console.log("Created!", data);
// });


// Example: Adding a Course to a Teacher

// Teacher.update(
// "588f6537e9282b3780a171cb",
// {
// 	courses: ["588f5e8a205b985ee4187f9b"]
// }, function(data, err){
// 	console.log("Updated!", data);
// });





// More Useable Code from Thomas Rest-entity

// 		Kitten.delete('find/{name:/Pelle.*/}', next);

// 		Kitten.create({name:"Pelle Svanslös", age:8}, next);

// 		Kitten.find('find/{name:/Pelle.*/}', next);

// 		mem.kitten = kittens[0];
// 		Kitten.update(kittens[0]._id,{age:11}, next);

// 		Kitten.find(mem.kitten._id, next);

// 		Kitten.update(mem.kitten._id,{owner:owner._id}, next);

// 		Kitten.find(mem.kitten._id, next);

// 		Owner.find('find/{name:/Kalle.*/}', next);

// 		mem.owner = owners[0];
// 		Owner.update(owners[0]._id,{age:80}, next);

// 		Owner.find(mem.owner._id, next);

// 		Owner.delete(owner._id, next);

// 		Kitten.delete(mem.kitten._id, next);

// // Run all tests
// function next(data) {
// 	if(!tests.length) { return; }
// 	tests.shift()(data);
// }
// next();