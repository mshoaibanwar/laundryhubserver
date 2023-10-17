const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const veggieSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please provide a category name!"],
        unique: [true, "Category with that name already exist!"],
        minlength: 2
    },
}, {
    timestamps: true,
});

const Veggie = mongoose.model('Veggie', veggieSchema);

module.exports = Veggie;