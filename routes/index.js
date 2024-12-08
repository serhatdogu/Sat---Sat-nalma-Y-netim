const express = require('express');
const router = express.Router();
const Product = require('../modules/dbModel'); // Importing product model
const SalesInvoice = require('../modules/salesInvoice'); // Importing sales invoice model

// Route to get products and display them
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.render('index', { products }); // Rendering index view and passing products data
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Search route to find sales invoices by product name

router.get('/search-sales', async (req, res) => {
    const { product_name } = req.query;  // Extract product_name from query params
    console.log("Searching for:", product_name);  // Debugging line

    const searchTerm = product_name ? product_name.trim() : "";

    if (!searchTerm) {
        return res.json([]); // If no search term, return an empty array
    }

    try {
        const results = await SalesInvoice.find({
            product_name: { $regex: searchTerm, $options: 'i' } // Case-insensitive search
        });

        res.json(results); // Return found results in JSON format
    } catch (error) {
        console.error('Error during search query:', error);
        res.status(500).json({ error: 'Database query failed. Please try again later.' });
    }
});


module.exports = router;
