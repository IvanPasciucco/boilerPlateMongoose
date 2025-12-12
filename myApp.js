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
  // 1. Creamos la instancia (el documento) usando el Modelo 'Person'
  // Puedes cambiar los datos "Ivan", 30, etc. por lo que quieras.
  let ivan = new Person({
    name: "Ivan",
    age: 30,
    favoriteFoods: ["Asado", "Pizza", "Empanadas"]
  });

  // 2. Guardamos en la base de datos
  // IMPORTANTE: Usamos .then() y .catch() porque tu versión de Mongoose es moderna.
  ivan.save()
    .then(data => {
      // Si todo sale bien, llamamos a done() con null (sin error) y la data guardada
      done(null, data);
    })
    .catch(err => {
      // Si falla, llamamos a done() con el error
      console.error(err);
      done(err);
    });
};
const createManyPeople = (arrayOfPeople, done) => {
  // Pasamos el array completo a .create()
  Person.create(arrayOfPeople)
    .then(people => {
      // Si todo sale bien, devolvemos la lista de personas creadas
      done(null, people);
    })
    .catch(err => {
      // Si falla, devolvemos el error
      console.log(err);
      done(err);
    });
};
const findPeopleByName = (personName, done) => {
  // Buscamos a todas las personas donde el campo 'name' coincida con la variable 'personName'
  Person.find({ name: personName })
    .then(peopleFound => {
      // Devolvemos la lista encontrada (Array)
      done(null, peopleFound);
    })
    .catch(err => {
      console.log(err);
      done(err);
    });
};

const findOneByFood = (food, done) => {
  // Use Model.findOne() to find a single document matching the criteria
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return done(err);
    return done(null, data);
  });
};

const findPersonById = (personId, done) => {
  // findById acepta el ID directamente como primer argumento
  Person.findById(personId, (err, data) => {
    if (err) return done(err);
    return done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  // 1. Buscar a la persona por ID
  Person.findById(personId, (err, person) => {
    if (err) return done(err);

    // 2. Editar el documento (agregar la comida al array)
    person.favoriteFoods.push(foodToAdd);

    // 3. Guardar el documento actualizado
    person.save((err, updatedPerson) => {
      if (err) return done(err);
      return done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName }, // Criterio de búsqueda
    { age: ageToSet },    // Campos a actualizar
    { new: true },        // Opción para devolver el documento actualizado
    (err, updatedDoc) => {
      if (err) return done(err);
      return done(null, updatedDoc);
    }
  );
};
const removeById = (personId, done) => {
  // findByIdAndRemove busca por _id y elimina el documento
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
    if (err) return done(err);
    return done(null, removedDoc);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  // Person.remove elimina todos los documentos que coincidan con el criterio
  Person.remove({ name: nameToRemove }, (err, response) => {
    if (err) return done(err);
    return done(null, response);
  });
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
