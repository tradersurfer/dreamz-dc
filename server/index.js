const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
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
}));
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'public'), {
    maxAge: '1d',
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
        if (filePath.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

// API Routes
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');
app.use('/api', productsRouter);
app.use('/api', cartRouter);

// Health check
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
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 DREAMZ DC Server running on port ${PORT}`);
    console.log(`📍 http://localhost:${PORT}`);
    console.log(`🌐 DREAMZ DC Dispensary - Washington DC\n`);
});
