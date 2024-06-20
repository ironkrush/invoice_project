const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const sendInvoiceEmail = require('../utils/sendEmail');

// Get all invoices
router.get('/', async (req, res) => {
    try {
        const invoices = await Invoice.find();
        res.status(200).json(invoices);
    } catch (err) {
        console.error('Error fetching invoices:', err);
        res.status(500).json({ message: err.message });
    }
});

// Get a single invoice by id
router.get('/:id', async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
        res.status(200).json(invoice);
    } catch (err) {
        console.error('Error fetching invoice:', err);
        res.status(500).json({ message: err.message });
    }
});

// Create a new invoice
router.post('/', async (req, res) => {
    const { clientName, clientEmail, totalAmount } = req.body;
    
    // Validation
    if (!clientName || !clientEmail || !totalAmount) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const invoice = new Invoice(req.body);

    try {
        const newInvoice = await invoice.save();
        await sendInvoiceEmail(newInvoice);
        res.status(201).json(newInvoice);
    } catch (err) {
        console.error('Error creating invoice:', err);
        res.status(400).json({ message: err.message });
    }
});

// Update invoice
router.put('/:id', async (req, res) => {
    const { clientName, clientEmail, totalAmount } = req.body;

    // Validation
    if (!clientName || !clientEmail || !totalAmount) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedInvoice) return res.status(404).json({ message: 'Invoice not found' });
        await sendInvoiceEmail(updatedInvoice);
        res.status(200).json(updatedInvoice);
    } catch (err) {
        console.error('Error updating invoice:', err);
        res.status(400).json({ message: err.message });
    }
});

// Delete invoice
router.delete('/:id', async (req, res) => {
    try {
        const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!deletedInvoice) return res.status(404).json({ message: 'Invoice not found' });
        res.status(200).json({ message: 'Invoice deleted' });
    } catch (err) {
        console.error('Error deleting invoice:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
