const express = require('express');
const app = express();
const mongoose = require('mongoose');
const invoiceRoutes = require('./routes/invoices');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const PORT = process.env.PORT || 5000;

dotenv.config();


app.use(express.static(path.join(__dirname, '../client/build')));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});






app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error(err);
});

// Routes
app.use('/api/invoices', invoiceRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  };
  
  app.use(cors(corsOptions));
  