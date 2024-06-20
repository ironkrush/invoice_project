import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InvoiceForm = ({ invoiceId, onSuccess }) => {
    const [clientName, setClientName] = useState('');
    const [clientEmail, setClientEmail] = useState('');
    const [items, setItems] = useState([{ description: '', quantity: 1, price: 0 }]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        if (invoiceId) {
            axios.get(`/api/invoices/${invoiceId}`)
                .then(response => {
                    const invoice = response.data;
                    setClientName(invoice.clientName);
                    setClientEmail(invoice.clientEmail);
                    setItems(invoice.items);
                    setTotalAmount(invoice.totalAmount);
                })
                .catch(error => console.error('Error fetching invoice:', error));
        } else {
            setClientName('');
            setClientEmail('');
            setItems([{ description: '', quantity: 1, price: 0 }]);
            setTotalAmount(0);
        }
    }, [invoiceId]);

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
        calculateTotal(newItems);
    };

    const calculateTotal = (items) => {
        const total = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
        setTotalAmount(total);
    };

    const addItem = () => {
        setItems([...items, { description: '', quantity: 1, price: 0 }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const invoice = { clientName, clientEmail, items, totalAmount };
        try {
            if (invoiceId) {
                await axios.put(`/api/invoices/${invoiceId}`, invoice);
            } else {
                await axios.post('/api/invoices', invoice);
            }
            onSuccess();
        } catch (error) {
            console.error('Error creating/updating invoice:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-4">
                <label className="block text-gray-700">Client Name</label>
                <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="mt-1 block w-full"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Client Email</label>
                <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="mt-1 block w-full"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Items</label>
                {items.map((item, index) => (
                    <div key={index} className="flex space-x-4">
                        <input
                            type="text"
                            placeholder="Description"
                            value={item.description}
                            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                            className="mt-1 block w-1/2"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Quantity"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                            className="mt-1 block w-1/4"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={item.price}
                            onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                            className="mt-1 block w-1/4"
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={addItem} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                    Add Item
                </button>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Total Amount</label>
                <input
                    type="number"
                    value={totalAmount}
                    readOnly
                    className="mt-1 block w-full bg-gray-200"
                />
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                {invoiceId ? 'Update Invoice' : 'Create Invoice'}
            </button>
        </form>
    );
};

export default InvoiceForm;
