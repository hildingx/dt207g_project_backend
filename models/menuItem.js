/**
 * Användarschema meny
 */

const mongoose = require("mongoose");

//Användarschema
const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: ['starter', 'main course', 'dessert', 'drink'],
        required: true,
        trim: true
    },
    created_at: { 
        type: Date, 
        default: Date.now
    }
});

const menuItem = mongoose.model("menuItem", menuItemSchema);
module.exports = menuItem;