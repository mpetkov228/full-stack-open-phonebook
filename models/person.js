const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

mongoose.connect(url)
    .then(result => {
        console.log('connecting to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB', error.message);
    });

const personSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        required: true,
        validate: {
            validator: val => {
                return /^[0-9]{2,3}-[0-9]*$/.test(val) 
            },
            message: props => `Invalid number format`
        }
    }
});

personSchema.set('toJSON', {
    transform: (doc, returnedObj) => {
        returnedObj.id = returnedObj._id.toString();
        delete returnedObj._id;
        delete returnedObj.__v;
    }
});

module.exports = mongoose.model('Person', personSchema);