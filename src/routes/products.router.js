
const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');





const productsRouter = express.Router();


productsRouter.get('/', (req, res) => {
 
  const products = JSON.parse(fs.readFileSync('productos.json', 'utf8'));
  res.json(products);
});


productsRouter.get('/:pid', (req, res) => {
  const productId = req.params.pid;
  const products = JSON.parse(fs.readFileSync('productos.json', 'utf8'));
  const product = products.find((p) => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});


productsRouter.post('/', (req, res) => {
  const { title, description, code, price, status, stock, category, thumbnails } = req.body;


  const products = JSON.parse(fs.readFileSync('productos.json', 'utf8'));

 
  const productId = uuidv4();


  const newProduct = {
    id: productId,
    title,
    description,
    code,
    price,
    status: status || true,
    stock,
    category,
    thumbnails,
  };

  products.push(newProduct);

  fs.writeFileSync('productos.json', JSON.stringify(products, null, 2));

  res.json(newProduct);
});


productsRouter.put('/:pid', (req, res) => {
  const productId = req.params.pid;
  const updatedFields = req.body;


  const products = JSON.parse(fs.readFileSync('productos.json', 'utf8'));
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex !== -1) {

    products[productIndex] = {
      ...products[productIndex],
      ...updatedFields,
      id: productId, 
    };


    fs.writeFileSync('productos.json', JSON.stringify(products, null, 2));

    res.json(products[productIndex]);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});


productsRouter.delete('/:pid', (req, res) => {
  const productId = req.params.pid;


  const products = JSON.parse(fs.readFileSync('productos.json', 'utf8'));
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex !== -1) {
   
    products.splice(productIndex, 1);

   
    fs.writeFileSync('productos.json', JSON.stringify(products, null, 2));

    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

module.exports = productsRouter
