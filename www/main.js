var Kitten = restEntityFactory('kitten');
var Owner = restEntityFactory('owner');

// testWithKitten(); // will trigger test with owner when done

function testWithKitten() {
	Kitten.create({name:"Pelle Svanslös",age:8},function(cat) {
		console.log('Kitten created',cat);
		Kitten.get('find/{name:/Pelle.*/}',function(cats) {
			console.log('All cats named Pelle',cats);
			Kitten.update(cats[0]._id,{age:11},function(result) {
				console.log("Update result", result);
				Kitten.get(cats[0]._id,function(cat) {
					console.log("The updated Pelle",cat);
					Kitten.delete(cat._id,function(result) {
						console.log("Delete result",result);
						testWithOwner();
					});
				});
			});
		});
	});
}

function testWithOwner() {
	Owner.create({
			name:"Kalle Kattälskare",
			age:75,
			phoneNumber:'+46-040-312255'
		},function(owner) {
		console.log('Owner created',owner);
		Owner.get('find/{name:/Kalle.*/}',function(owners) {
			console.log('All owners named Kalle',owners);
			Owner.update(owners[0]._id,{age:80},function(result) {
				console.log("Update result", result);
				Owner.get(owners[0]._id,function(owner) {
					console.log("The updated Kalle",owner);
					Owner.delete(owner._id,function(result) {
						console.log("Delete result",result);
					});
				});
			});
		});
	});
};

