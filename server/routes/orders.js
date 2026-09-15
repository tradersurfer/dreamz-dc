const express = require('express');
const router = express.Router();

const orders = [];

router.post('/orders', (req, res) => {
    const body = req.body || {};
    const customer = body.customer || {};
    if (!customer.firstName || !customer.lastName || !customer.email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    if (body.fulfillment === 'delivery') {
        const d = body.delivery || {};
        if (!d.address || !d.city || !d.state || !d.zip) {
            return res.status(400).json({ error: 'Delivery address is required' });
        }
    }
    const order = {
        orderId: 'DZ' + Date.now().toString().slice(-8),
        ...body,
        receivedAt: new Date().toISOString()
    };
    orders.unshift(order);
    res.json({ ok: true, orderId: order.orderId });
});

router.get('/orders', (req, res) => {
    res.json({ orders });
});

module.exports = router;
