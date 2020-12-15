const express = require("express");
const app = express();
const { Pool } = require('pg');
const port = 9000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cyf_ecommerce',
    password: 'migracode20',
    port: 5432
});

app.get("/customers", function(req, res) {
    pool.query('SELECT * FROM customers', (error, result) => {
        res.json(result.rows);
    });
});

app.get("/suppliers", function(req, res) {
    pool.query('SELECT * FROM suppliers', (error, result) => {
        res.json(result.rows);
    });
});

app.get("/products", function(req, res) {
    pool.query('SELECT products.product_name, suppliers.supplier_name FROM products INNER JOIN suppliers ON products.supplier_id=suppliers.id', (error, result) => {
        res.json(result.rows);
    });
});

app.listen(port, function() {
    console.log("Server is listening on port. " + port + " Ready to accept requests!");
});