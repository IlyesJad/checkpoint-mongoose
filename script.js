
const mongoose = require('mongoose');

mongoose.set("strictQuery", false);
let connection = "mongodb+srv://IlyesJad:Azerty147+@cluster0.q5slz96.mongodb.net/?retryWrites=true&w=majority"
// Connect to the database
mongoose.connect(connection, { useNewUrlParser: true,
     useUnifiedTopology: true },
     (err)=>{
        if(err){
            console.log("error hello")
        }else{
            console.log("success")
        }
     }
    );

// Define the Person schema
const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

// Create the Person model
const Person = mongoose.model('Person', PersonSchema);

// Create a document instance using the Person constructor
const person = new Person({
  name: 'John',
  age: 30,
  favoriteFoods: ['pizza', 'hamburger']
});

//Save the document instance to the database
person.save(function(err, data) {
  if (err) {
    console.error(err);
  } else {
    console.log('Person saved successfully:', data);
  }
});

// // Create multiple documents with model.create
const arrayOfPeople = [
  {
    name: 'Jane',
    age: 25,
    favoriteFoods: ['sushi', 'steak']
  },
  {
    name: 'Bob',
    age: 28,
    favoriteFoods: ['pasta', 'chicken']
  }
];

Person.create(arrayOfPeople, function(err, data) {
  if (err) {
    console.error(err);
  } else {
    console.log('People saved successfully:', data);
  }
});

// //Search the database using model.find

Person.find({ name: 'Bob' }, function(err, data) {
  if (err) {
    console.error(err);
  } else {
    console.log('People found with name John:', data);
  }
});

// //Search the database for a single document using model.findOne

Person.findOne({ favoriteFoods: 'pizza' }, function(err, data) {
  if (err) {
    console.error(err);
  } else {
    console.log('Person found with favorite food pizza:', data);
  }
});

// //Search the database by _id using model.findById

const personId0 = '63eba77ccca4cb0a379f5064';

Person.findById(personId0, function(err, data) {
  if (err) {
    console.error(err);
  } else {
    console.log('Person found with id', personId0, ':', data);
  }
});
// //Search update and save

const personId1 = '63eba77ccca4cb0a379f5064';

Person.findById(personId1, (err, person) => {
  if (err) throw err;

  person.favoriteFoods.push('hamburger');

  person.save((err) => {
    if (err) throw err;
    console.log(`Person with id ${personId1} updated successfully`);
  });
});

// // Perform using Model.finOneAndUpdate()
const personName = 'John';

Person.findOneAndUpdate(
  { name: personName },
  { age: 20 },
  { new: true },
  (err, person) => {
    if (err) throw err;
    console.log(`Person with name ${personName} updated successfully`);
  }
);

// // Delete one document using model.findAndRemove()
const personId2 = '5f7f4a49d4c7cf055734f9a7';

Person.findByIdAndRemove(personId2, (err, person) => {
  if (err) throw err;

  console.log(`Person with id ${personId2} deleted successfully`);
});

// // Delete many documents with model.remove

Person.remove({ name: 'Jane' }, (err, result) => {
  if (err) throw err;
  console.log(`${result.deletedCount} person(s) deleted successfully`);
  // done(err,result.deletedCount);
});

// // Chain search query to narrow search resulat

Person.find({ favoriteFoods: 'pasta' })
  .sort({ name: 1 })
  .limit(2)
  .select('-age')
  .exec((err, data) => {
    if (err) throw err;

    console.log(data);
    // done(err,data);
    // exec();
  });