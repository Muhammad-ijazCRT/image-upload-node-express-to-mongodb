const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/my_image", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("connection successful"))
    .catch((err) => console.log(err));


// schema define the structure of a document
var personSchema = new mongoose.Schema({
    image: { type: String, default: "anonymous" }
});


// interference between schema and database
var personModel = mongoose.model('Person', personSchema);

module.exports = personModel