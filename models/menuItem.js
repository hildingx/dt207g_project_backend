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
    }
});

const menuItem = mongoose.model("menuItem", menuItemSchema);
module.exports = menuItem;