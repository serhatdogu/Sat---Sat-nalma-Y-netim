


const mongoose = require('mongoose');

const salesInvoiceSchema = new mongoose.Schema({
    product_name: String,
    amount: Number,
    brand: String,
    customer: String,
    description: String,
    price: Number,
    unit: String,
    dateOfSales: { type: Date, default: Date.now }  // Default value for date
});

const SalesInvoice = mongoose.model('SalesInvoice', salesInvoiceSchema);

module.exports = SalesInvoice;
