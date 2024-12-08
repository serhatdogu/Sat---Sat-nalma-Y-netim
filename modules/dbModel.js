const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: String,
    brand: String,
    category: String,
    description: String,
    imgUrl: String,
    price: Number,
    quantity: String,
    size: String
});

module.exports = mongoose.model('Product', productSchema);
