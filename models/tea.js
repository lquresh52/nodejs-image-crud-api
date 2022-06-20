const mongoose = require("mongoose");

const TeaSchema = new mongoose.Schema({

    name: {type: String, required: true},
    image: String,
    description: String,
    keywords: String,
    origin: String,
    brew_time: Number,
    temprature: Number,
    comment: [{text: String, date: {type: String, default: new Date()}}]

});

const Tea = mongoose.model('Tea', TeaSchema);

module.exports = Tea;