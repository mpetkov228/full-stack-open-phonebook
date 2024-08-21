const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as an argument');
    process.exit(1);
}


const password = process.argv[2];

const url = `mongodb+srv://mihailpetkov120:${password}@cluster0.yx57u.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const personSchema = mongoose.Schema({
    name: String,
    number: String
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length < 5) {
    Person.find({}).then(response => {
        console.log('phonebook:');
        response.forEach(person => {
            console.log(person.name, person.number);
        });
        mongoose.connection.close();
        process.exit(0);
    });
} else {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    });
    
    person.save().then(response => {
        console.log(`added ${response.name} number ${response.number} to phonebook`);
        mongoose.connection.close();
    });
}