const express = require('express');
const router = express.Router();

let cart = [];

// GET cart
router.get('/cart', (req, res) => {
    res.json({ cart, total: cart.reduce((s, i) => s + (i.price * i.qty), 0), itemCount: cart.reduce((s, i) => s + i.qty, 0) });
});

// POST to cart
router.post('/cart', (req, res) => {
    const { productId, name, price, type, strain, image } = req.body;
    if (!productId || !name) return res.status(400).json({ error: 'Missing required fields' });
    
    const existing = cart.find(item => item.productId === productId);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ productId, name, price, type, strain, image, qty: 1 });
    }
    
    res.json({ cart, total: cart.reduce((s, i) => s + (i.price * i.qty), 0), itemCount: cart.reduce((s, i) => s + i.qty, 0) });
});

// PATCH cart item qty
router.patch('/cart/:productId', (req, res) => {
    const { productId } = req.params;
    const { qty } = req.body;
    const item = cart.find(i => i.productId === productId);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    if (qty <= 0) {
        cart = cart.filter(i => i.productId !== productId);
    } else {
        item.qty = qty;
    }
    res.json({ cart, total: cart.reduce((s, i) => s + (i.price * i.qty), 0), itemCount: cart.reduce((s, i) => s + i.qty, 0) });
});

// DELETE from cart
router.delete('/cart/:productId', (req, res) => {
    const { productId } = req.params;
    cart = cart.filter(i => i.productId !== productId);
    res.json({ cart, total: cart.reduce((s, i) => s + (i.price * i.qty), 0), itemCount: cart.reduce((s, i) => s + i.qty, 0) });
});

// CLEAR cart
router.delete('/cart', (req, res) => {
    cart = [];
    res.json({ cart, total: 0, itemCount: 0 });
});

module.exports = router;
