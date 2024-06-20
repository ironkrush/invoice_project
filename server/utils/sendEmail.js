
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const sendInvoiceEmail = async (invoice) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'process.env.EMAIL',
            pass: 'process.env.EMAIL_PASSWORD'
        }
    });

    const mailOptions = {
        from: 'process.env.EMAIL',
        to: invoice.clientEmail,
        subject: 'Invoice Details',
        text: `Invoice for ${invoice.clientName}: ${invoice.totalAmount}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendInvoiceEmail;
