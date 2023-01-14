const mongoose = require('mongoose')

const launchSchema = new mongoose.Schema({

    flightNumber: {
        type: Number,
        required: true
    },
    mission: {
        type: String,
        required: true
    },
    rocket: {
        type: String,
        required: true
    },
    launchDate: {
        type: Date,
        required: true

    },
    target: {
        type: String,
        required: true

        //    type: mongoose.ObjectId,
        // ref: 'planet'
    },
    customers: [String],
    upcoming: {
        type: Boolean,
        required: true
    },
    success: {
        type: Boolean,
        required: true,
        default: true,
    }


}, {
    timestamps: true
})


module.exports = mongoose.model('Launch', launchSchema)