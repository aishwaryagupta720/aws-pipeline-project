const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Import your configuration from bconfig.js
const app = express();

const path = './bconfig';

try {
    fs.accessSync(path, fs.constants.R_OK);
    console.log('bconfig.js is readable.');
} catch (err) {
    console.error('bconfig.js is not readable:', err.message);
}

const bconfig = require('./bconfig');
// MySQL Connection using bconfig
const db = mysql.createConnection(bconfig.database);

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
});

app.use(cors());
app.use(express.json());

// Get all products
app.get('/products', (req, res) => {
    db.query('SELECT * FROM products', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// Get a single product by ID
app.get('/products/:id', (req, res) => {
    db.query('SELECT * FROM products WHERE product_id = ?', [req.params.id], (error, results) => {
        if (error) throw error;
        res.json(results[0]);
    });
});

// Add a new product
app.post('/products', (req, res) => {
    const { product_name, description, price, units, status } = req.body;
    db.query('INSERT INTO products (product_name, description, price, units, status) VALUES (?, ?, ?, ?, ?)',
        [product_name, description, price, units, status], (error, results) => {
            if (error) throw error;
            res.status(201).send(`Product added with ID: ${results.insertId}`);
        });
});

// Update an existing product
app.put('/products/:id', (req, res) => {
    const { product_name, description, price, units, status } = req.body;
    db.query(
        'UPDATE products SET product_name = ?, description = ?, price = ?, units = ?, status = ? WHERE product_id = ?',
        [product_name, description, price, units, status, req.params.id],
        (error, results) => {
            if (error) throw error;
            res.send('Product updated successfully.');
        }
    );
});

app.listen(bconfig.server.port, () => {
    console.log(`Server running on http://localhost:${bconfig.server.port}`);
});
