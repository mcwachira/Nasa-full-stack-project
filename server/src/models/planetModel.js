const mongoose = require('mongoose')

const planetSchema = new mongoose.Schema({

    keplerName: {
        type: String,
        required: true
    },



}, {
    timestamps: true
})


module.exports = mongoose.model('Planets', planetSchema)