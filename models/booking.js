/**
 * Användarschema för bokning
 */

const mongoose = require("mongoose");

//Användarschema
const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true,
    },
    numberOfPeople: {
        type: Number,
        required: true,
        min: 1
    },
    specialRequests: {
        type: String,
        trim: true
    },
    created_at: { 
        type: Date, 
        default: Date.now
    }
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;