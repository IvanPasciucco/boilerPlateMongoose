require('dotenv').config();
const mongoose = require('mongoose');

// --- AGREGA ESTO TEMPORALMENTE ---
console.log("---------------------------------------------------");
console.log("MI URI ES TIPO:", typeof process.env.MONGO_URI);
console.log("VALOR EXACTO:", process.env.MONGO_URI); // ¿Qué imprime esto?
console.log("---------------------------------------------------");
// ---------------------------------
mongoose.connect(process.env.MONGO_URI);
const connection = mongoose.connection;

connection.on('error', console.error.bind(console, '❌ Error de conexión:'));

connection.once('open', function() {
  console.log("✅ ¡CONECTADO EXITOSAMENTE A MONGODB ATLAS!");
});

const personSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Campo obligatorio
  age: Number,
  favoriteFoods: [String] // Un array de textos
});


let Person = mongoose.model('Person', personSchema);
const createAndSavePerson = (done) => {
  done(null /*, data*/);
};

const createManyPeople = (arrayOfPeople, done) => {
  done(null /*, data*/);
};

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
