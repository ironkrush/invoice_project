const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    items: [
        {
            description: String,
            quantity: Number,
            price: Number,
        }
    ],
    totalAmount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Invoice = mongoose.model('Invoice', InvoiceSchema);

module.exports = Invoice;
