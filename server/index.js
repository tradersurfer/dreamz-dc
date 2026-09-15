const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, '..', 'public');

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"],
        }
    }
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

// Serve all HTML pages
const allowedPages = ['index', 'shop', 'product', 'brands', 'about', 'delivery', 'faq', 'blog', 'checkout', 'med-reg'];
app.get('/:page', (req, res) => {
    const page = req.params.page;
    if (allowedPages.includes(page)) {
        res.sendFile(path.join(__dirname, '..', 'public', `${page}.html`));
    } else {
        res.status(404).sendFile(path.join(__dirname, '..', 'public', 'index.html'));
    }
});

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Blog route
app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'blog.html'));
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
