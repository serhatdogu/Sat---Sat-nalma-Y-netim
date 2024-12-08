const express = require('express');
const mongoose = require('mongoose');
const app = express();
const indexRoutes = require('./routes/index'); // Import routes

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Middleware for serving static files
app.use(express.static('public'));

// Built-in middleware for parsing URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/productsDB')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Use routes from the routes folder
app.use('/', indexRoutes);


// Assuming you're using Express and Mongoose

// Route for searching sales_invoice based on the product name (or any other criteria)
app.get('/search-sales', async (req, res) => {
    try {
        const searchTerm = req.query.product_name;  // Use `product_name` as the query param
        if (!searchTerm) return res.json([]);  // If no search term, return an empty array

        // Search for invoices where `product_name` matches the search term (case-insensitive)
        const invoices = await SalesInvoice.find({
            product_name: { $regex: searchTerm, $options: 'i' }  // Case-insensitive regex search
        });

        // Return the invoices as a JSON response
        res.json(invoices);
    } catch (error) {
        console.error('Error in search-sales route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});






// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
