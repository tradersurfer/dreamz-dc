const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, '..', 'public');

app.use(helmet({
    contentSecurityPolicy: false
}));
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicDir, { maxAge: '1d' }));

app.use('/api', require('./routes/products'));
app.use('/api', require('./routes/cart'));
app.use('/api', require('./routes/orders'));

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'DREAMZ DC' });
});

const pages = {
    '/': 'index.html',
    '/shop': 'shop.html',
    '/product': 'product.html',
    '/checkout': 'checkout.html',
    '/about': 'about.html',
    '/brands': 'brands.html',
    '/delivery': 'delivery.html',
    '/faq': 'faq.html',
    '/blog': 'blog.html',
    '/cart': 'checkout.html'
};

app.get(Object.keys(pages), (req, res) => {
    res.sendFile(path.join(publicDir, pages[req.path] || 'index.html'));
});

app.listen(PORT, () => {
    console.log(`DREAMZ DC running on http://localhost:${PORT}`);
});
