const mongoose = require('mongoose');


if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url= `mongodb+srv://ezhdeha123:${password}@cluster0.qicqgza.mongodb.net/Phonebbok?retryWrites=true&w=majority&appName=Cluster0`


mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
const Person = mongoose.model('Person', personSchema)
const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
})
if (process.argv.length === 5) {
    person.save().then(() => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}
else if (process.argv.length === 3) {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
} else {
    console.log('Please provide the name and number as arguments')
    process.exit(1)
}

