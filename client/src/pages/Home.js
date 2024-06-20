import React, { useState } from 'react';
import InvoiceForm from '../components/InvoiceForm';
import InvoiceList from '../components/InvoiceList';

const Home = () => {
    const [currentInvoiceId, setCurrentInvoiceId] = useState(null);

    const handleEdit = (invoiceId) => {
        setCurrentInvoiceId(invoiceId);
    };

    const handleSuccess = () => {
        setCurrentInvoiceId(null);
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold my-4">Invoice System</h1>
            <InvoiceForm invoiceId={currentInvoiceId} onSuccess={handleSuccess} />
            <InvoiceList onEdit={handleEdit} />
        </div>
    );
};

export default Home;
