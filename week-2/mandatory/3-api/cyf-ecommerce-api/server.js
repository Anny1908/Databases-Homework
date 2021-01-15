const express = require("express");
const app = express();
const { Pool } = require('pg');
const port = 9500;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cyf_ecommerce',
    password: 'migracode20',
    port: 5432
});

app.use(express.json());

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

app.get("/customers/:customerId", function(req, res) {
    const { customerId } = req.params;

    pool.query("SELECT * FROM customers WHERE id=$1", [customerId])

    .then((result) => console.log(res.json(result.rows)))
        .catch((e) => console.error(e));
});

app.post("/customers/:customer_id/orders", function(req, res) {
    const { order_date, order_reference } = req.body;
    const { customer_id } = req.params;
    pool
        .query("SELECT * FROM customers WHERE id = $1", [customer_id])
        .then((result) => {
            if (result.rows.length = 0) {
                return res
                    .status(400)
                    .send("A customer doesn't exist!");
            } else {
                const query =
                    "INSERT INTO orders (order_date, order_reference, customer_id) VALUES ($1, $2, $3)"
                pool
                    .query(query, [order_date, order_reference, customer_id])
                    .then(() => res.send("Order created!"))
                    .catch((e) => console.error(e));
            };
        });
});

const postCustomer = (req, res) => {
    const { newName, newAddress, newCity, newCountry } = req.body;
    const query = 'INSERT INTO customers (customer_name, address, city, country)  VALUES ($1, $2, $3, $4)';
    pool
        .query(query, [newName, newAddress, newCity, newCountry])
        .then(() => res.send('Student created!'))
        .catch(error => {
            console.log(error);
            res.send('Oops.We did it again.')
        })
}
app.post("/customers", postCustomer);


const postProduct = (req, res) => {
    const { product_name, unit_price, supplier_id } = req.body;
    const query = 'INSERT INTO products (product_name, unit_price, supplier_id)  VALUES ($1, $2, $3)';

    if (!Number.isInteger(unit_price) || unit_price < 0) {
        return res
            .status(400)
            .send("The product_price should be a positive integer.");
    } else {
        pool
            .query("SELECT * FROM suppliers WHERE id=$1", [supplier_id])
            .then((result) => {
                if (result.rows.length = 0) {
                    return res
                        .status(400)
                        .send("Can't add product, supplier doesn't exist");
                } else {
                    pool
                        .query(query, [product_name, unit_price, supplier_id])
                        .then(() => res.send('product created!'))
                        .catch(error => {
                            console.log(error);
                            res.send('Error')
                        });
                };
            });
    };
};
app.post("/products", postProduct);

app.post("/suppliers", function(req, res) {
    const { newSupplier, newCountry } = req.body;
    pool.query('INSERT INTO suppliers (supplier_name, country) VALUES ($1, $2)', [newSupplier, newCountry])
        .then(() => res.send("Supplier created!"))
        .catch((e) => console.error(e))
});

app.put("/customers/:customerId", function(req, res) {
    const { customerId } = req.params;
    const { newName, newAddress, newCity, newCountry } = req.body;

    pool
        .query("UPDATE customers SET customer_name=$1, address=$2, city=$3, country=$4 WHERE id=$5", [newName, newAddress, newCity, newCountry, customerId])
        .then(() => res.send(`Customer ${customerId} updated!`))
        .catch((e) => console.error(e));
});

app.delete("/orders/:orderId", function(req, res) {
    const { orderId } = req.params;

    pool
        .query("DELETE FROM orders WHERE id=$1", [orderId])
        .then(() => res.send(`Customer ${orderId} deleted!`))
        .catch((e) => console.error(e));
});

app.delete("/customers/:customerId", function(req, res) {
    const { customerId } = req.params;

    pool
        .query("SELECT * FROM orders WHERE customer_id=$1", [customerId])
        .then((result) => {
            if (result.rows.length > 0) {
                return res
                    .status(400)
                    .send("Can't delete Customer has an order");
            } else {
                pool
                    .query("DELETE FROM customers WHERE id=$1", [customerId])
                    .then(() => res.send(`Customer ${customerId} deleted!`))
                    .catch((e) => console.error(e));
            };
        });
});

app.get("/customers/:customerId/orders", function(req, res) {
    const { customerId } = req.params;
    pool.query('select c.customer_name, o.order_reference, o.order_date, p.product_name, p.unit_price,s.supplier_name,oi.quantity from products p join suppliers s on s.id = p.supplier_id join order_items oi on oi.product_id = p.id join orders o on o.id = oi.order_id join customers c on c.id = o.customer_id where c.id = $1', [customerId])
        .then((result) => console.log(res.json(result.rows)))
        .catch((e) => console.error(e));
});

app.listen(port, function() {
    console.log("Server is listening on port. " + port + " Ready to accept requests!");
});