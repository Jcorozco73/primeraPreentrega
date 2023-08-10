const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');




const cartsRouter = express.Router();

cartsRouter.post('/', (req, res) => {
   
    const cart = JSON.parse(fs.readFileSync('carrito.json', 'utf8'));
  
   
    const cartId = uuidv4();
  
 
    const newCart = {
      id: cartId,
      products: [],
    };
  
 
    fs.writeFileSync('carrito.json', JSON.stringify(newCart, null, 2));
  
    res.json(newCart);
  });
  

  cartsRouter.get('/:cid', (req, res) => {
    const cartId = req.params.cid;
  

    const cart = JSON.parse(fs.readFileSync('carrito.json', 'utf8'));
  
    if (cart.id === cartId) {
      res.json(cart.products);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  });
  
 
  cartsRouter.post('/:cid/product/:pid', (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const { quantity } = req.body;
  
 
    const cart = JSON.parse(fs.readFileSync('carrito.json', 'utf8'));
  
    if (cart.id === cartId) {
      const existingProductIndex = cart.products.findIndex((p) => p.product === productId);
  
      if (existingProductIndex !== -1) {
       
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        
        cart.products.push({ product: productId, quantity: 1 });
      }
  

      fs.writeFileSync('carrito.json', JSON.stringify(cart, null, 2));
  
      res.json(cart.products);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  });
  

  module.exports = cartsRouter
  
  
    