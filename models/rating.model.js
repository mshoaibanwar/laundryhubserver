const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ratigSchema = new Schema({
    rating: {
        type: Number,
        required: [true, "Please provide rating!"],
        unique: false,
    },
    review: {
        type: String,
        required: false,
        unique: false,
    },
    uname: {
        type: String,
        required: [true, "Please provide user name!"],
        unique: false,
    },
    uid: {
        type: String,
        required: [true, "Please provide user id!"],
        unique: false,
    },
    shopid: {
        type: String,
        required: [true, "Please provide shop id!"],
        unique: false,
    },
    feedback: {
        type: String,
        required: false,
        unique: false,
        default: "",
    },
    orderid: {
        type: String,
        required: [true, "Please provide order id!"],
        unique: [true, "Order id already exists!"],
    },
    services: mongoose.Schema.Types.Mixed,
}, {
    timestamps: true,
});

const Rating = mongoose.model('Rating', ratigSchema);

module.exports = Rating;