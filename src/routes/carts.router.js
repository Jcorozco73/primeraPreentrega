const express = require('express');
const cartRouter = express.Router();



const fs = require('fs');

let cartDatabase = [];


const loadCartDatabase = () => {
    const data = fs.readFileSync('carrito.json');
    cartDatabase = JSON.parse(data);
};


const saveCartDatabase = () => {
    fs.writeFileSync('carrito.json', JSON.stringify(cartDatabase));
};


loadCartDatabase();

cartRouter.post('/', (req, res) => {
    const id = 'cart' + cartDatabase.length;
    const newCart = { id: id, products: [] };
    cartDatabase.push(newCart);
    saveCartDatabase();
    res.json(newCart);
});

cartRouter.get('/:cid', (req, res) => {
    const cart = cartDatabase.find(c => c.id === req.params.cid);
    if (!cart) {
        return res.sendStatus(404);
    }
    return res.json(cart.products);
});

cartRouter.post('/:cid/product/:pid', (req, res) => {
    const cart = cartDatabase.find(c => c.id === req.params.cid);
    if (!cart) {
        return res.sendStatus(404);
    }
    const product = { productId: req.params.pid, quantity: 1 };
    const productInCart = cart.products.find(p => p.productId === product.productId);
    if (productInCart) {
        productInCart.quantity += 1;
    } else {
        cart.products.push(product);
    }
    saveCartDatabase();
    
    res.json(cart);
});


module.exports = cartRouter;


