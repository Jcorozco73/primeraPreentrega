 const express = require('express');
const productRouter = express.Router();


const fs = require('fs');

let productDatabase = [];

// Load database from file
const loadDatabase = () => {
    const data = fs.readFileSync('productos.json');
    productDatabase = JSON.parse(data);
};

// Write database to file
const saveDatabase = () => {
    fs.writeFileSync('productos.json', JSON.stringify(productDatabase));
};

// Initialize
loadDatabase();


productRouter.get('/', (req, res) => {
    res.json(productDatabase);
});

productRouter.get('/:pid', (req, res) => {
    const product = productDatabase.find(p => p.id === req.params.pid);
    if (!product) {
        return res.sendStatus(404);
    }
    return res.json(product);
});

productRouter.post('/', (req, res) => {
    const id = productDatabase.length;
    const newProduct = req.body;
    newProduct.id = id;
    productDatabase.push(newProduct);
    saveDatabase();
    res.json(newProduct);
});

productRouter.put('/:pid', (req, res) => {
    const id = req.params.pid;
    const updatedProduct = req.body;
    const index = productDatabase.findIndex(p => p.id === id);
    if (index === -1) {
        return res.sendStatus(404);
    }
    productDatabase[index] = {...productDatabase[index], ...updatedProduct};
    saveDatabase();
    res.json(productDatabase[index]);
});

productRouter.delete('/:pid', (req, res) => {
    const id = req.params.pid;
    const index = productDatabase.findIndex(p => p.id === id);
    if (index === -1) {
        return res.sendStatus(404);
    }
    const deletedProduct = productDatabase.splice(index, 1);
    saveDatabase();
    return res.json(deletedProduct);
}); 


module.exports = productRouter;