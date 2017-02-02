class RestTests {

    constructor() {

         // Example Create a Teacher

        // Teacher.create({
        //     username: "info@ttt.com",
        //     password: "1234",
        //     firstname: "Miles",
        //     lastname: "Davis",
        //     phonenumber: "070-4453456",
        //     role: 'teacher',
        //     courses: ["588f5e8a205b985ee4187f9b"]
        // }, next);

        // Announcement.create({
        //     author: "teacher id 1",
        //     message: 'Start working, you lazy unflappable morons!',
        //     courses: ["588f5e8a205b985ee4187f9b"]
        // }, next);


        // Test communication with the server
        // through the Kitten and Owner objects

        var mem = {},
            tests = [
                // Clean the database
                () => {
                    Kitten.delete('find/{name:/Pelle.*/}', next);
                },
                () => {
                    Owner.delete('find/{name:/Kalle.*/}', next);
                },
                // Tests with Kitten
                () => {
                    Kitten.create({
                        username: "pesv",
                        password: "1234",
                        name: "Pelle Svanslös",
                        age: 8
                    }, next);
                },
                (kitten) => {
                    log('Kitten created', kitten);
                    Kitten.find('find/{name:/Pelle.*/}', next);
                },
                (kittens) => {
                    log('All kittens named Pelle', kittens);
                    mem.kitten = kittens[0];
                    Kitten.update(kittens[0]._id, { age: 11 }, next);
                },
                (result) => {
                    log("Updating kitten Pelle", result);
                    Kitten.find(mem.kitten._id, next);
                },
                (kitten) => {
                    log("The updated Pelle", kitten);
                    next();
                },
                // Test with owner
                () => {
                    Owner.create({
                        username: "kallecool",
                        password: "1234",
                        name: "Kalle Kattälskare",
                        age: 75,
                        phoneNumber: '+46-040-312255',
                        kittens: [mem.kitten._id],
                    }, next);
                },
                (owner) => {
                    log('Owner created', owner);
                    Kitten.update(mem.kitten._id, { owner: owner._id }, next);
                },
                (result) => {
                    log("Added the owner to Pelle...", result);
                    Kitten.find(mem.kitten._id, next);
                },
                (kitten) => {
                    log("Now Pelle knows about his owners", kitten);
                    Owner.find('find/{name:/Kalle.*/}', next);
                },
                (owners) => {
                    log('All owners named Kalle', owners);
                    mem.owner = owners[0];
                    Owner.update(owners[0]._id, { age: 80 }, next);
                },
                (result) => {
                    log("Updating owner Kalle", result);
                    Owner.find(mem.owner._id, next);
                },
                (owner) => {
                    log("The updated Kalle", owner);
                    next();
                    // DO NOT RUN THE DELETE TESTS
                    // Owner.delete(owner._id,next);
                },
                /*(result) => {
                  log("Deleting owner Kalle",result);
                  Kitten.delete(mem.kitten._id,next);
                },
                (result) => {
                  log("Deleting kitten Pelle",result);
                }*/
            ];

        // Run all tests
        function next(data) {
            if (!tests.length) {
                testOutput();
                return;
            }
            if (data && data._error) {
                log("Error", data._error);
                $('pre code').last().css({ backgroundColor: '#ffe6e6' });
                testOutput();
            } else {
                tests.shift()(data);
            }
        }
        next();

        // Log
        var logMem = [];

        function log(explanation, result) {
            console.log(explanation, result);
            logMem.push({ explanation: explanation, result: result });
        }


        // Output
        function testOutput() {
            $('body').template('header', { appName: 'REST tests' });
            $('body').template('restTestOutput', { results: logMem });
            // syntax highlighting
            $('pre code').each(function(i, block) {
                hljs.highlightBlock(block);
            });
        }

    }

}
