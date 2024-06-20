import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InvoiceList = ({ onEdit }) => {
    const [invoices, setInvoices] = useState([]);


    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await axios.get('/api/invoices');
                setInvoices(response.data);
            } catch (error) {
                console.error('Error fetching invoices:', error);
            }
        };

        fetchInvoices();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/invoices/${id}`);
            fetchInvoices(); 
        } catch (error) {
            console.error('Error deleting invoice:', error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold my-4">Invoices</h2>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th>Client Name</th>
                        <th>Client Email</th>
                        <th>Total Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.length > 0 ? (
                        invoices.map((invoice) => (
                            <tr key={invoice._id}>
                                <td>{invoice.clientName}</td>
                                <td>{invoice.clientEmail}</td>
                                <td>{invoice.totalAmount}</td>
                                <td>
                                    <button
                                        onClick={() => onEdit(invoice._id)}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(invoice._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">
                                No invoices found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default InvoiceList;
