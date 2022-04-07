const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}
const password = process.argv[2];
const url = `mongodb+srv://mystack:${password}@cluster0.i9n7b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(url);

const personName = process.argv[3];
const personNumber = process.argv[4];

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: personName,
  number: personNumber,
});
if (process.argv.length === 5) {
  const personName = process.argv[3];
  const personNumber = process.argv[4];
  person
    .save()
    .then((result) => {
      console.log(`Added ${personName} to the database `);
      mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((el) => {
      console.log(el);
    });
    mongoose.connection.close();
  });
}
