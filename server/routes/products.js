const express = require('express');
const router = express.Router();
const { PRODUCTS, BUSINESS, CATEGORIES, FLOWER_SUBCATEGORIES } = require('../data/products');

// GET all products
router.get('/products', (req, res) => {
    const { category, brand, type, search, page = 1, limit = 20 } = req.query;
    let filtered = [...PRODUCTS];
    
    if (category) filtered = filtered.filter(p => p.category?.toLowerCase().includes(category.toLowerCase()));
    if (brand) filtered = filtered.filter(p => p.brand?.toLowerCase().includes(brand.toLowerCase()));
    if (type) filtered = filtered.filter(p => p.type?.toLowerCase().includes(type.toLowerCase()));
    if (search) filtered = filtered.filter(p => p.name?.toLowerCase().includes(search.toLowerCase()) || p.brand?.toLowerCase().includes(search.toLowerCase()));
    
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const paginated = filtered.slice(startIndex, startIndex + limitNum);
    
    res.json({
        products: paginated,
        total: filtered.length,
        page: pageNum,
        pages: Math.ceil(filtered.length / limitNum),
        categories: CATEGORIES,
        flowerSubcategories: FLOWER_SUBCATEGORIES
    });
});

// GET single product
router.get('/products/:id', (req, res) => {
    const product = PRODUCTS.find(p => p.id === req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
});

// GET business info
router.get('/business', (req, res) => {
    res.json(BUSINESS);
});

// GET categories
router.get('/categories', (req, res) => {
    res.json(CATEGORIES);
});

// GET flower subcategories
router.get('/flower-subcategories', (req, res) => {
    res.json(FLOWER_SUBCATEGORIES);
});

module.exports = router;
