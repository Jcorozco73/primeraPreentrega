const express = require('express');
const app = express();
const path = require('path');
const productsRouter = require('./src/routes/products.router')
const cartsRouter = require('./src/routes/carts.router')
const port = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
