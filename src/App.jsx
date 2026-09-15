import { useState, useEffect, createContext, useContext, useCallback, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import './styles.css';

// === BUSINESS CONFIG ===
const BUSINESS = {
    name: 'DREAMZ DC',
    displayName: 'DREAMZ DC Compound',
    tagline: 'Premium Cannabis Dispensary & Delivery',
    phone: '(202) 709-8944',
    email: 'info@dreamzdccompound.shop',
    website: 'https://dreamzdccompound.shop',
    address: '611 Pennsylvania Ave SE, 2nd Floor',
    city: 'Washington',
    state: 'DC',
    zip: '20003',
    selfCertUrl: 'https://octo.quickbase.com/db/bscn22va8?a=dbpage&pageID=39',
    hours: [
        { day: 'Sunday', open: '10:00 AM', close: '12:00 AM' },
        { day: 'Monday', open: '10:00 AM', close: '12:00 AM' },
        { day: 'Tuesday', open: '10:00 AM', close: '12:00 AM' },
        { day: 'Wednesday', open: '10:00 AM', close: '12:00 AM' },
        { day: 'Thursday', open: '10:00 AM', close: '3:00 AM' },
        { day: 'Friday', open: '10:00 AM', close: '3:00 AM' },
        { day: 'Saturday', open: '10:00 AM', close: '3:00 AM' },
    ],
};

const CATEGORIES = [
    { slug: 'flower', name: 'Flower', icon: 'mdi:cannabis' },
    { slug: 'preroll', name: 'Pre-Rolls', icon: 'mdi:flower' },
    { slug: 'cartridge', name: 'Vaporizers', icon: 'mdi:vape' },
    { slug: 'edibles', name: 'Edibles', icon: 'mdi:pill' },
    { slug: 'concentrate', name: 'Concentrates', icon: 'mdi:droplet' },
    { slug: 'topical', name: 'Topicals', icon: 'mdi:band-aid' },
    { slug: 'tincture', name: 'Tinctures', icon: 'mdi:bottle-tonic-outline' },
    { slug: 'accessories', name: 'Merch', icon: 'mdi:hat-wizard' },
];

const BRANDS = [
    { name: 'DREAMZ COMPOUND', logo: 'https://dreamzdccompound.shop/images/logo.jpg', blurb: 'Our signature line — flower, vapes, edibles, topicals.' },
    { name: 'Cookies', logo: '/images/Blueberry Banana by Cookies.jpg', blurb: 'Premium flower and genetics.' },
    { name: 'Ganjavores', logo: '/images/ganjavores-store.jpg', blurb: 'DC favorite — Green Crack, Sour Diesel.' },
    { name: 'Jeeter Juice', logo: '/images/Jeeter Juice - Ice Cream Banana (Indica)  - Disposable Straw Vape - 1G - Live Resin.jpg', blurb: 'Premium disposables and vapes.' },
    { name: 'Muha Meds', logo: '/images/DeVour Gummy Edibles - High Crawlers- 1500mg (10 pc x 150mg ea pc).jpg', blurb: 'Heavy hitter gummies and carts.' },
    { name: 'Rythm', logo: '/images/OG Kush Breath by Rhythm.jpg', blurb: 'London Poundcake and OG Kush Breath.' },
    { name: 'Cultivation Labs', logo: '/images/Jenny Kush by Cultivation Labs - Top Shelf Whole Flower.jpg', blurb: 'Jenny Kush and premium genetics.' },
    { name: 'Jungle Boys', logo: '/images/Gelato 33 by Jungle Boys - Premium Flower.jpg', blurb: 'Gelato 33 and premium strains.' },
    { name: 'BackpackBoyz', logo: '/images/BackPackBoyz Lemon & Cherriez disposable vape, 2g, All-In-One, Live Resin, Melted Diamonds.jpg', blurb: 'Lemon & Cherriez disposables.' },
    { name: 'Trulieve', logo: '/images/Cultivar Collection by Trulieve - Bubble Gum Kush - Premium Whole Flower.jpg', blurb: 'Bubble Gum Kush and more.' },
];

// === PRODUCTS DATA (simplified for demo) ===
const PRODUCTS = [
    { id: 1, name: 'DREAMZ Compound Flower', brand: 'DREAMZ COMPOUND', category: 'Flower', type: 'flower', strain: 'Hybrid', thc: '27%', terps: '2.5%', price: 54.00, oldPrice: 58.00, badge: 'sale', description: 'Premium DREAMZ Compound flower — a balanced hybrid with rich terpene profile. Perfect for any occasion. Lab-tested, high potency.', image: '/images/Frozen Black Cherry by DREAMZ - Top Shelf Whole Flower.jpg' },
    { id: 2, name: 'DREAMZ Vape Cartridge', brand: 'DREAMZ COMPOUND', category: 'Vapes', type: 'cartridge', strain: 'Indica', thc: '76%', terps: '2.9%', price: 72.00, oldPrice: null, badge: 'new', description: 'DREAMZ Vape Cartridge 1g — high-purity distillate with natural terpenes. Smooth, potent, and reliable.', image: '/images/storefront.jpg' },
    { id: 3, name: 'DREAMZ Gummies 1000mg', brand: 'DREAMZ COMPOUND', category: 'Edibles', type: 'edibles', strain: 'Hybrid', thc: '~85-90%', terps: 'N/A', price: 60.00, oldPrice: 75.00, badge: 'sale', description: 'DREAMZ Gummies 1000mg — delicious gummies with 1000mg total THC. Perfect for experienced users.', image: '/images/DeVour Gummy Edibles - Watermelon Slices - 1500mg (150mg ea pc).jpg' },
    { id: 4, name: 'Ganjavores Green Crack', brand: 'Ganjavores', category: 'Flower', type: 'flower', strain: 'Sativa', thc: '24%', terps: '<1%', price: 45.00, oldPrice: null, badge: null, description: 'Ganjavores Green Crack — uplifting sativa with earthy diesel notes. Perfect for daytime use.', image: '/images/Green Crack by Ganjavores - Premium Flower.jpg' },
    { id: 5, name: 'Ganjavores Sour Diesel', brand: 'Ganjavores', category: 'Flower', type: 'flower', strain: 'Sativa', thc: '26%', terps: '<1%', price: 45.00, oldPrice: null, badge: null, description: 'Ganjavores Sour Diesel — classic NYC diesel strain. Energizing and flavorful.', image: '/images/Sour Diesel by Ganjavores - Hybrid - 3.5G Jars - Top Shelf Whole Flower.jpg' },
    { id: 6, name: 'DREAMZ Pre-Roll Pack', brand: 'DREAMZ COMPOUND', category: 'Pre-Rolls', type: 'preroll', strain: 'Hybrid', thc: '25-28%', terps: '2.5%', price: 18.00, oldPrice: 16.20, badge: 'sale', description: 'DREAMZ Pre-Roll Pack — premium pre-rolls with our signature blend.', image: '/images/bulk-flower.jpg' },
    { id: 7, name: 'DREAMZ Concentrates', brand: 'DREAMZ COMPOUND', category: 'Concentrates', type: 'cartridge', strain: 'Hybrid', thc: '71-88%', terps: '3.6%', price: 72.00, oldPrice: null, badge: null, description: 'DREAMZ Concentrates — potent extracts with 71-88% THC. For experienced users.', image: '/images/storefront.jpg' },
    { id: 8, name: 'DREAMZ Edibles Sampler', brand: 'DREAMZ COMPOUND', category: 'Edibles', type: 'edibles', strain: 'Mixed', thc: '1500mg', terps: 'N/A', price: 65.00, oldPrice: null, badge: 'new', description: 'DREAMZ Edibles Sampler — variety pack of our best gummies and chocolates.', image: '/images/DeVour Gummy Edibles - High Crawlers- 1500mg (10 pc x 150mg ea pc).jpg' },
    { id: 9, name: 'Jeeter Juice Ice Cream Banana', brand: 'Jeeter Juice', category: 'Vapes', type: 'cartridge', strain: 'Indica', thc: '70%+', terps: 'N/A', price: 50.00, oldPrice: null, badge: null, description: 'Jeeter Juice Ice Cream Banana — 1G disposable with classic Banana strain.', image: '/images/Jeeter Juice - Ice Cream Banana (Indica)  - Disposable Straw Vape - 1G - Live Resin.jpg' },
    { id: 10, name: 'Jeeter Juice Wedding Cake', brand: 'Jeeter Juice', category: 'Vapes', type: 'cartridge', strain: 'Hybrid', thc: '70%+', terps: 'N/A', price: 50.00, oldPrice: null, badge: null, description: 'Jeeter Juice Wedding Cake — 1G disposable with sweet Wedding Cake strain.', image: '/images/Jeeter Juice - Wedding Cake (Hybrid) - Disposable Straw Vape - 1G - Live Resin.jpg' },
    { id: 11, name: 'Cookies Blueberry Banana', brand: 'Cookies', category: 'Flower', type: 'flower', strain: 'Hybrid', thc: '28%', terps: '2.0%', price: 55.00, oldPrice: null, badge: null, description: 'Cookies Blueberry Banana — award-winning hybrid with sweet berry flavors.', image: '/images/Blueberry Banana by Cookies.jpg' },
    { id: 12, name: 'Rythm London Poundcake', brand: 'Rythm', category: 'Flower', type: 'flower', strain: 'Hybrid', thc: '30%', terps: '2.2%', price: 50.00, oldPrice: null, badge: null, description: 'Rythm London Poundcake — 7G jar of premium hybrid with sweet vanilla notes.', image: '/images/London Poundcake (Hybrid) by Rythm - 7G Jars - Premium Whole Flower.jpg' },
    { id: 13, name: 'Cultivation Labs Jenny Kush', brand: 'Cultivation Labs', category: 'Flower', type: 'flower', strain: 'Indica', thc: '26%', terps: '1.8%', price: 48.00, oldPrice: null, badge: null, description: 'Cultivation Labs Jenny Kush — premium indica with relaxing effects.', image: '/images/Jenny Kush by Cultivation Labs - Top Shelf Whole Flower.jpg' },
    { id: 14, name: 'Jungle Boys Gelato 33', brand: 'Jungle Boys', category: 'Flower', type: 'flower', strain: 'Hybrid', thc: '27%', terps: '2.4%', price: 52.00, oldPrice: null, badge: null, description: 'Jungle Boys Gelato 33 — sweet and creamy hybrid with relaxing effects.', image: '/images/Gelato 33 by Jungle Boys - Premium Flower.jpg' },
    { id: 15, name: 'BackpackBoyz Lemon & Cherriez', brand: 'BackpackBoyz', category: 'Vapes', type: 'cartridge', strain: 'Hybrid', thc: '80%+', terps: 'N/A', price: 55.00, oldPrice: null, badge: null, description: 'BackpackBoyz Lemon & Cherriez — 2G disposable with citrus and cherry flavors.', image: '/images/BackPackBoyz Lemon & Cherriez disposable vape, 2g, All-In-One, Live Resin, Melted Diamonds.jpg' },
    { id: 16, name: 'Muha Meds Gummies', brand: 'Muha Meds', category: 'Edibles', type: 'edibles', strain: 'Mixed', thc: '1000mg', terps: 'N/A', price: 55.00, oldPrice: null, badge: null, description: 'Muha Meds Gummies — 1000mg gummies with tropical fruit flavors.', image: '/images/DeVour Gummy Edibles - Watermelon Slices - 1500mg (150mg ea pc).jpg' },
    { id: 17, name: 'OG Kush Breath', brand: 'DREAMZ COMPOUND', category: 'Flower', type: 'flower', strain: 'Indica', thc: '28%', terps: '2.8%', price: 55.00, oldPrice: null, badge: null, description: 'OG Kush Breath [OGKB 2.1] by DREAMZ — powerful indica with earthy OG flavor.', image: '/images/OG Kush Breath [OGKB 2.1] by DREAMZ - Premium Whole Flower.jpg' },
    { id: 18, name: 'DREAMZ Topicals', brand: 'DREAMZ COMPOUND', category: 'Topicals', type: 'topical', strain: 'Balanced', thc: '<1%', terps: 'N/A', price: 35.00, oldPrice: null, badge: null, description: 'DREAMZ Topicals — CBD-infused balms and lotions for localized relief.', image: '/images/bulk-flower.jpg' },
    { id: 19, name: 'DREAMZ Tincture', brand: 'DREAMZ COMPOUND', category: 'Tinctures', type: 'tincture', strain: 'Hybrid', thc: '1000mg', terps: 'N/A', price: 55.00, oldPrice: null, badge: null, description: 'DREAMZ Tincture — fast-acting liquid extract with 1000mg THC.', image: '/images/bulk-flower.jpg' },
    { id: 20, name: 'Trulieve Bubble Gum Kush', brand: 'Trulieve', category: 'Flower', type: 'flower', strain: 'Indica', thc: '25%', terps: '1.5%', price: 45.00, oldPrice: null, badge: null, description: 'Cultivar Collection by Trulieve — Bubble Gum Kush with sweet berry flavor.', image: '/images/Cultivar Collection by Trulieve - Bubble Gum Kush - Premium Whole Flower.jpg' },
];

// === CATEGORY ICON MAP ===
const CATEGORY_ICONS = {
    flower: 'mdi:cannabis',
    preroll: 'mdi:flower',
    cartridge: 'mdi:vape',
    edibles: 'mdi:pill',
    concentrate: 'mdi:droplet',
    topical: 'mdi:band-aid',
    tincture: 'mdi:bottle-tonic-outline',
    accessories: 'mdi:hat-wizard',
};

// === CONTEXT ===
const AppContext = createContext();

function AppProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [ageVerified, setAgeVerified] = useState(false);
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [promos, setPromos] = useState([]);
    const [notifications, setNotifications] = useState([]);

    const addToCart = useCallback((product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
            return [...prev, { ...product, qty: 1 }];
        });
    }, []);

    const removeFromCart = useCallback((productId) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    }, []);

    const updateQty = useCallback((productId, qty) => {
        if (qty <= 0) { removeFromCart(productId); return; }
        setCart(prev => prev.map(item => item.id === productId ? { ...item, qty } : item));
    }, [removeFromCart]);

    const cartCount = cart.reduce((s, i) => s + i.qty, 0);
    const cartTotal = cart.reduce((s, i) => s + (i.price * i.qty), 0);

    const value = useMemo(() => ({
        BUSINESS, CATEGORIES, BRANDS, PRODUCTS, CATEGORY_ICONS,
        cart, cartCount, cartTotal, addToCart, removeFromCart, updateQty,
        ageVerified, setAgeVerified, user, setUser,
        orders, setOrders, promos, setPromos, notifications, setNotifications,
    }), [cart, cartCount, cartTotal, addToCart, removeFromCart, updateQty, ageVerified, user, orders, promos, notifications]);

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

function useApp() { return useContext(AppContext); }

// === AGE GATE ===
function AgeGate() {
    const [show, setShow] = useState(!localStorage.getItem('dreamz_age_ok'));
    const [dob, setDob] = useState('');
    const [error, setError] = useState('');
    const { setAgeVerified } = useApp();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!dob) { setError('Please enter your date of birth'); return; }
        const birth = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--;
        if (age < 21) { setError('You must be 21 or older'); return; }
        localStorage.setItem('dreamz_age_ok', 'yes');
        setShow(false);
        setAgeVerified(true);
    };

    if (!show) return null;
    return (
        <div className="age-gate-overlay">
            <div className="age-gate-box">
                <h2>🚬 21+ Only</h2>
                <p>This website contains adult content. You must be 21 or older to enter.</p>
                <form onSubmit={handleSubmit}>
                    <input type="date" value={dob} onChange={e => setDob(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: 'none', marginBottom: '12px', width: '100%', maxWidth: '300px' }} />
                    <br />
                    {error && <p style={{ color: 'var(--accent-glow)', marginBottom: '8px', fontSize: '0.85rem' }}>{error}</p>}
                    <button type="submit" className="age-gate-btn">Enter</button>
                    <button type="button" className="age-gate-btn secondary" onClick={() => window.close()}>Leave</button>
                </form>
            </div>
        </div>
    );
}

// === HEADER ===
function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { cartCount, user, setUser } = useApp();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.addEventListener('scroll', () => setScrolled(window.scrollY > 50));
        return () => window.removeEventListener('scroll', () => {});
    }, []);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/shop', label: 'Shop' },
        { href: '/brands', label: 'Brands' },
        { href: '/about', label: 'About' },
        { href: '/delivery', label: 'Delivery' },
        { href: '/blog', label: 'Blog' },
        { href: '/faq', label: 'FAQ' },
    ];

    return (
        <>
            <header className={scrolled ? 'header scrolled' : 'header'}>
                <div className="container">
                    <a href="/" className="logo" onClick={() => navigate('/')}>
                        <img src="/images/logo.jpg" alt="DREAMZ DC" />
                        <div>
                            <div className="logo-text">DREAMZ DC</div>
                            <div className="logo-sub">Premium Dispensary</div>
                        </div>
                    </a>
                    <nav className="nav-desktop">
                        {navLinks.map(link => (
                            <a key={link.href} href={link.href} className={location.pathname === link.href ? 'active' : ''}>{link.label}</a>
                        ))}
                    </nav>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button className="cart-btn" onClick={() => navigate('/cart')}>
                            <i className="fas fa-shopping-bag"></i> Cart
                            <span className="cart-count">{cartCount}</span>
                        </button>
                        <button className="mobile-close" onClick={() => setMobileOpen(!mobileOpen)} style={{ display: 'none' }}>
                            <i className="fas fa-bars"></i>
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
}

// === FOOTER ===
function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div>
                        <img src="/images/logo.jpg" alt="DREAMZ DC Logo" style={{ height: 40, marginBottom: 16 }} />
                        <h3>DREAMZ DC Compound</h3>
                        <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: 16 }}>Washington DC's premier cannabis dispensary & delivery service.</p>
                        <div style={{ display: 'flex', gap: 12 }}>
                            <a href="#" style={{ color: '#888', fontSize: '1.2rem' }}><i className="fab fa-instagram"></i></a>
                            <a href="#" style={{ color: '#888', fontSize: '1.2rem' }}><i className="fab fa-x-twitter"></i></a>
                            <a href="#" style={{ color: '#888', fontSize: '1.2rem' }}><i className="fab fa-facebook"></i></a>
                        </div>
                    </div>
                    <div>
                        <h3>SITE</h3>
                        <ul><li><a href="/shop">Shop</a></li><li><a href="/brands">Brands</a></li><li><a href="/about">About</a></li><li><a href="/delivery">Delivery</a></li></ul>
                    </div>
                    <div>
                        <h3>RESOURCES</h3>
                        <ul><li><a href="/faq">FAQ</a></li><li><a href="/blog">Blog</a></li><li><a href={BUSINESS.selfCertUrl}>Self-Certify</a></li></ul>
                    </div>
                    <div>
                        <h3>CONTACT</h3>
                        <ul><li><a href={`tel:${BUSINESS.phone}`}>{BUSINESS.phone}</a></li><li><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></li></ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2026 DREAMZ DC Compound. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

// === ANNOUNCEMENT BAR ===
function AnnouncementBar() {
    return (
        <div className="announcement-bar">
            <div className="announcement-content">
                🔥 <strong>LIMITED TIME:</strong> 10% OFF first order! Free delivery on orders $75+. 🌿 Lab-tested products. 🚚 Delivery 7 days a week. Call (202) 709-8944.
            </div>
        </div>
    );
}

// === HERO ===
function Hero() {
    const { CATEGORIES, CATEGORY_ICONS } = useApp();
    return (
        <section className="hero" id="hero">
            <div className="container">
                <div className="hero-content">
                    <AnnouncementBar />
                    <div className="hero-badge">🚚 Delivery Available • Open 7 Days • 10% Off First Order</div>
                    <h1>DREAMZ <span>DC</span> Dispensary</h1>
                    <p className="lead">Premium flower, pre-rolls, vapes, edibles, and concentrates in Washington DC. Quality you can see, smell, and taste — delivered or ready at the curb.</p>
                    <div className="hero-buttons">
                        <a className="btn-primary" href="/shop"><i className="fas fa-shopping-bag"></i> Shop Menu</a>
                        <a className="btn-secondary" href={BUSINESS.selfCertUrl} target="_blank" rel="noopener"><i className="fas fa-id-card"></i> Self-Certify</a>
                    </div>
                    <div className="hero-stats">
                        <div className="hero-stat"><strong>7 Days</strong><span>Open This Week</span></div>
                        <div className="hero-stat"><strong>~2 hrs</strong><span>Avg Delivery</span></div>
                        <div className="hero-stat"><strong>30+</strong><span>Menu Items</span></div>
                        <div className="hero-stat"><strong>100%</strong><span>Lab Tested</span></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// === CATEGORY SECTION ===
function CategorySection({ title, icon, products }) {
    const { CATEGORY_ICONS } = useApp();
    return (
        <section className="section">
            <div className="container">
                <div className="section-header">
                    <h2><Icon icon={icon || CATEGORY_ICONS[products[0]?.category?.toLowerCase()] || 'mdi:cannabis'} style={{ marginRight: 8 }} />{title}</h2>
                </div>
                <div className="products-grid">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}

// === PRODUCT CARD — CLICKABLE ===
function ProductCard({ product }) {
    const { addToCart } = useApp();
    return (
        <a href={`/product/${product.id}`} className="product-card">
            <div className="product-image">
                <img src={product.image} alt={product.name} />
                {product.badge && <span className={`product-badge badge-${product.badge}`}>{product.badge}</span>}
            </div>
            <div className="product-info">
                <div className="product-brand">{product.brand}</div>
                <div className="product-name">{product.name}</div>
                <div className="product-details">{product.strain} • {product.thc} • {product.terps !== 'N/A' ? `${product.terps} terpenes` : ''}</div>
                <div className="product-price">
                    <span className="price">${product.price}{product.oldPrice && <span className="price-old">${product.oldPrice}</span>}</span>
                    <button className="add-cart" onClick={(e) => { e.preventDefault(); addToCart(product); }}>ADD</button>
                </div>
            </div>
        </a>
    );
}

// === HOMEPAGE ===
function Home() {
    const { PRODUCTS, CATEGORIES, CATEGORY_ICONS } = useApp();
    const [showAge, setShowAge] = useState(!localStorage.getItem('dreamz_age_ok'));
    const [ageVerified, setAgeVerified] = useState(!!localStorage.getItem('dreamz_age_ok'));

    const handleAgeVerify = () => {
        localStorage.setItem('dreamz_age_ok', 'yes');
        setShowAge(false);
        setAgeVerified(true);
    };

    if (showAge && !ageVerified) {
        return <AgeGate />;
    }

    return (
        <>
            {showAge && <AgeGate onVerify={handleAgeVerify} />}
            <Hero />
            {/* Category sections — first 7 products each */}
            <section className="section">
                <div className="container">
                    <div className="section-header text-center"><h2>SHOP BY CATEGORY</h2></div>
                    <div className="categories-grid">
                        {CATEGORIES.map(cat => (
                            <a key={cat.slug} href={`/shop#${cat.slug}`} className="category-card">
                                <Icon icon={CATEGORY_ICONS[cat.slug]} style={{ fontSize: '2rem', marginBottom: '8px', color: 'var(--accent)' }} />
                                <h4>{cat.name}</h4>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
            {CATEGORIES.map((cat, idx) => {
                const catProducts = PRODUCTS.filter(p => p.category.toLowerCase() === cat.slug).slice(0, 7);
                if (catProducts.length === 0) return null;
                return <CategorySection key={cat.slug} title={cat.name} icon={CATEGORY_ICONS[cat.slug]} products={catProducts} />;
            })}
            <section className="section section-alt">
                <div className="container">
                    <div className="how-it-works">
                        <div className="step-card"><div className="step-number">1</div><h3>Browse & Select</h3><p>Filter by category, brand, or strain type and add to cart.</p></div>
                        <div className="step-card"><div className="step-number">2</div><h3>Self-Certify (21+)</h3><p>No medical card needed. Register for a Visitor Pass via our <a href={BUSINESS.selfCertUrl} target="_blank" style={{ color: 'var(--gold)' }}>self-cert portal</a>.</p></div>
                        <div className="step-card"><div className="step-number">3</div><h3>Delivery or Curbside</h3><p>Checkout with delivery to your DC address or curbside pickup.</p></div>
                    </div>
                </div>
            </section>
        </>
    );
}

// === SHOP PAGE ===
function Shop() {
    const { PRODUCTS, CATEGORIES, CATEGORY_ICONS } = useApp();
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const filtered = PRODUCTS.filter(p => {
        const matchCat = filter === 'all' || p.category.toLowerCase() === filter;
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });
    return (
        <div>
            <div className="page-hero"><div className="page-container"><h1>Shop</h1><p>Full menu. Add to cart, then checkout for delivery or curbside pickup.</p></div></div>
            <section className="section">
                <div className="container">
                    <div className="search-row" style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
                        <input type="search" placeholder="Search strains, brands..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, padding: '10px 16px', borderRadius: 8, border: '1px solid var(--border)', minWidth: 200 }} />
                        <select value={filter} onChange={e => setFilter(e.target.value)} style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid var(--border)' }}>
                            <option value="all">All Categories</option>
                            {CATEGORIES.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                        </select>
                    </div>
                    <div className="filter-bar" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                        {CATEGORIES.map(c => (
                            <button key={c.slug} onClick={() => setFilter(c.slug)} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid var(--border)', background: filter === c.slug ? 'var(--gold)' : 'transparent', color: filter === c.slug ? 'var(--dark)' : 'var(--text)', fontWeight: 600, cursor: 'pointer' }}><Icon icon={CATEGORY_ICONS[c.slug]} style={{ marginRight: 4 }} />{c.name}</button>
                        ))}
                    </div>
                    <div className="products-grid">{filtered.map(p => <ProductCard key={p.id} product={p} />)}</div>
                </div>
            </section>
        </div>
    );
}

// === PRODUCT DETAIL PAGE ===
function ProductPage() {
    const { PRODUCTS } = useApp();
    const { id } = useParams();
    const product = PRODUCTS.find(p => p.id === parseInt(id));
    if (!product) return <div className="page-container"><h1>Product not found</h1></div>;
    return (
        <div>
            <div className="page-hero"><div className="page-container"><h1>{product.name}</h1></div></div>
            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
                        <div className="product-image" style={{ height: 400 }}><img src={product.image} alt={product.name} style={{ objectFit: 'cover' }} /></div>
                        <div>
                            <div className="product-brand">{product.brand}</div>
                            <h1 style={{ fontSize: '2rem', marginBottom: 8 }}>{product.name}</h1>
                            <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
                                <span style={{ background: 'var(--accent)', color: '#fff', padding: '4px 12px', borderRadius: 6, fontSize: '0.85rem', fontWeight: 600 }}>{product.strain}</span>
                                <span style={{ color: 'var(--text-light)' }}>THC: {product.thc}</span>
                                <span style={{ color: 'var(--text-light)' }}>Terps: {product.terps}</span>
                            </div>
                            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: 16 }}>{product.description}</p>
                            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20, marginBottom: 20 }}>
                                <h3 style={{ marginBottom: 12 }}>Product Details</h3>
                                <p style={{ color: 'var(--text-light)' }}>Category: <strong>{product.category}</strong></p>
                                <p style={{ color: 'var(--text-light)' }}>Weight: {product.weight || 'N/A'}</p>
                                <p style={{ color: 'var(--text-light)' }}>Available: {product.available ? '✅ In Stock' : '❌ Out of Stock'}</p>
                            </div>
                            <div className="product-price" style={{ marginBottom: 20 }}>
                                <span className="price" style={{ fontSize: '2rem' }}>${product.price}{product.oldPrice && <span className="price-old" style={{ fontSize: '1.3rem' }}>${product.oldPrice}</span>}</span>
                            </div>
                            <button className="checkout-btn" onClick={() => { addToCart(product); navigate('/cart'); }}><i className="fas fa-shopping-bag"></i> Add to Cart</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

// === BRANDS PAGE ===
function Brands() {
    const { BRANDS } = useApp();
    return (
        <div>
            <div className="page-hero"><div className="page-container"><h1>Featured Brands</h1><p>House product plus the labels people actually ask for in DC.</p></div></div>
            <section className="section">
                <div className="container">
                    <div className="brand-grid">
                        {BRANDS.map(brand => (
                            <div key={brand.name} className="brand-card">
                                <img src={brand.logo} alt={brand.name} className="brand-logo" style={{ borderRadius: '50%' }} />
                                <div className="brand-name">{brand.name}</div>
                                <div className="brand-blurb">{brand.blurb}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

// === ABOUT PAGE ===
function About() {
    return (
        <div>
            <div className="page-hero"><div className="page-container"><h1>About DREAMZ DC</h1></div></div>
            <section className="section">
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 28, alignItems: 'start' }}>
                    <div>
                        <h2 style={{ marginBottom: 12 }}>The shop</h2>
                        <p style={{ color: 'var(--text-light)' }}>DREAMZ DC Compound is a Washington DC cannabis dispensary built around lab-tested flower, vapes, edibles, and an in-house DREAMZ COMPOUND line.</p>
                        <p style={{ color: 'var(--text-light)', marginTop: 12 }}>We keep the menu tight on purpose: recognizable brands, clear potency data, and staff who can point you to the right strain.</p>
                    </div>
                    <div>
                        <img src="/images/storefront.jpg" alt="DREAMZ DC storefront" style={{ borderRadius: 16, marginBottom: 14 }} />
                        <img src="/images/store inside.jpg" alt="Inside the dispensary" style={{ borderRadius: 16 }} />
                    </div>
                </div>
            </section>
        </div>
    );
}

// === FAQ PAGE ===
function FAQ() {
    const [openIdx, setOpenIdx] = useState(null);
    const faqs = [
        { q: 'Where is DREAMZ DC?', a: '611 Pennsylvania Ave SE, 2nd Floor, Washington, DC 20003.' },
        { q: 'What are the hours?', a: 'Sun–Wed 10AM–12AM. Thu–Sat 10AM–3AM EST.' },
        { q: 'Do I need a medical card?', a: 'Not if you are 21+. Register for a Visitor Pass at our self-cert portal.' },
        { q: 'Do you deliver?', a: 'Yes. Choose delivery at checkout. Curbside pickup is the other option.' },
        { q: 'Are products lab-tested?', a: 'Yes. Menu items include potency and terpene data.' },
    ];
    return (
        <div>
            <div className="page-hero"><div className="page-container"><h1>FAQ</h1><p>Hours, self-cert, delivery, and what to expect.</p></div></div>
            <section className="section">
                <div className="container">
                    <div className="faq-list">
                        {faqs.map((faq, i) => (
                            <div key={i} className={`faq-item ${openIdx === i ? 'open' : ''}`} onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                                <div className="faq-question">{faq.q} <i className="fas fa-chevron-down"></i></div>
                                <div className="faq-answer"><p>{faq.a}</p></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

// === DELIVERY PAGE ===
function Delivery() {
    return (
        <div>
            <div className="page-hero"><div className="page-container"><h1>Delivery & Curbside</h1></div></div>
            <section className="section">
                <div className="container">
                    <div className="how-it-works">
                        <div className="step-card"><div className="step-number">1</div><h3>Order Online</h3><p>Browse our menu and add items to your cart.</p></div>
                        <div className="step-card"><div className="step-number">2</div><h3>Choose Delivery</h3><p>Pick delivery or curbside at checkout.</p></div>
                        <div className="step-card"><div className="step-number">3</div><h3>Get Your Order</h3><p>Average delivery time is ~2 hours across DC.</p></div>
                    </div>
                </div>
            </section>
        </div>
    );
}

// === BLOG PAGE ===
function Blog() {
    const articles = [
        { id: 1, title: 'How to buy cannabis in Washington, DC', excerpt: 'Self-certification, Visitor Pass, and what to bring.', image: '/images/Code_Generated_Image (12).jpg', tag: 'Guide' },
        { id: 2, title: 'How delivery works at DREAMZ DC', excerpt: 'Order online, we confirm, then a runner is at your door.', image: '/images/storefront.jpg', tag: 'Delivery' },
        { id: 3, title: 'Indica, sativa, hybrid — a practical split', excerpt: 'Use strain type plus terpenes, not just the label.', image: '/images/Frozen Black Cherry by DREAMZ - Top Shelf Whole Flower.jpg', tag: 'Education' },
    ];
    return (
        <div>
            <div className="page-hero"><div className="page-container"><h1>From the blog</h1><p>How buying works in DC, delivery, strains, and shop notes.</p></div></div>
            <section className="section">
                <div className="container">
                    <div className="blog-grid">
                        {articles.map(article => (
                            <a key={article.id} href={`/blog/${article.id}`} style={{ textDecoration: 'none', color: 'inherit' }} className="blog-card">
                                <div className="blog-image"><img src={article.image} alt={article.title} /></div>
                                <div className="blog-info">
                                    <span className="blog-tag" style={{ background: 'var(--accent)', color: '#fff' }}>{article.tag}</span>
                                    <h3 className="blog-title">{article.title}</h3>
                                    <p className="blog-excerpt">{article.excerpt}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

// === BLOG ARTICLE PAGE ===
function BlogArticle() {
    const { id } = useParams();
    const articles = [
        { id: 1, title: 'How to buy cannabis in Washington, DC', body: 'Buying cannabis in Washington, DC is straightforward once you know the process. First, you must be 21 or older. Next, complete the self-certification process at the DC Visitor Pass portal (https://octo.quickbase.com/db/bscn22va8?a=dbpage&pageID=39). This gives you instant approval without needing a medical card. Once certified, you can visit any dispensary or order online for delivery. Make sure to bring a valid government-issued photo ID. DC has a vibrant cannabis scene with hundreds of products available, from flower and vapes to edibles and concentrates. Prices vary by brand and potency, but expect to pay $30-75 for premium flower and $45-72 for vapes. Always look for lab-tested products to ensure quality and safety.', image: '/images/Code_Generated_Image (12).jpg' },
        { id: 2, title: 'How delivery works at DREAMZ DC', excerpt: 'Order online, we confirm, then a runner is at your door.', body: 'Delivery at DREAMZ DC is fast, discreet, and reliable. After placing your order online, our team reviews and confirms your order within minutes. We then dispatch a runner to your verified DC address. Average delivery time is approximately 2 hours across the Washington DC metropolitan area. At checkout, you can choose between home delivery or curbside pickup. All orders require age verification upon delivery — our runner will check your ID before handing over your package. Delivery is available 7 days a week, with Sunday–Wednesday hours from 10AM to midnight and Thursday–Saturday from 10AM to 3AM EST.', image: '/images/storefront.jpg' },
        { id: 3, title: 'Indica, sativa, hybrid — a practical split', body: 'Understanding the difference between indica, sativa, and hybrid strains is essential for finding the right cannabis product. Indica strains are known for their relaxing, body-high effects — ideal for evening use, pain relief, and sleep. Sativa strains provide uplifting, cerebral effects — great for daytime use, creativity, and socializing. Hybrids combine both, offering a balanced experience. At DREAMZ DC, we label every product with its strain type and terpene profile so you can make informed decisions. Remember, THC percentage is not the only factor — terpenes play a crucial role in the experience. Our staff can help you navigate the menu based on your preferences and desired effects.', image: '/images/Frozen Black Cherry by DREAMZ - Top Shelf Whole Flower.jpg' },
    ];
    const article = articles.find(a => a.id === parseInt(id));
    if (!article) return <div className="page-container"><h1>Article not found</h1></div>;
    return (
        <div>
            <div className="page-hero"><div className="page-container"><h1>{article.title}</h1></div></div>
            <section className="section">
                <div className="container" style={{ maxWidth: 800 }}>
                    <img src={article.image} alt={article.title} style={{ width: '100%', borderRadius: 16, marginBottom: 24 }} />
                    <div style={{ lineHeight: 2, fontSize: '1.05rem', color: 'var(--text)' }}>
                        {article.body.split('\n').map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                </div>
            </section>
        </div>
    );
}

// === ADMIN LOGIN ===
function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setUser, setNotifications } = useApp();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'DREAMZ2026!') {
            setUser({ name: 'Admin', role: 'admin' });
            setNotifications([
                { id: 1, type: 'order', message: 'New order #1001 — 3 items, $142.00', time: '2 min ago' },
                { id: 2, type: 'promo', message: 'Summer Sale: 20% off all flower', time: '1 hr ago' },
                { id: 3, type: 'lowstock', message: 'Ganjavores Green Crack — only 2 left', time: '3 hrs ago' },
            ]);
            navigate('/admin');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}>
            <div style={{ background: '#fff', borderRadius: 20, padding: 48, maxWidth: 400, width: '100%' }}>
                <h1 style={{ textAlign: 'center', marginBottom: 8 }}>🚬 DREAMZ DC</h1>
                <p style={{ textAlign: 'center', color: 'var(--text-light)', marginBottom: 32 }}>Admin Dashboard</p>
                <form onSubmit={handleLogin}>
                    <div className="form-field" style={{ marginBottom: 16 }}>
                        <label>Username</label>
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="admin" required />
                    </div>
                    <div className="form-field" style={{ marginBottom: 16 }}>
                        <label>Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" required />
                    </div>
                    {error && <p style={{ color: 'var(--accent)', marginBottom: 8, fontSize: '0.85rem' }}>{error}</p>}
                    <button type="submit" className="checkout-btn" style={{ width: '100%', marginTop: 8 }}>Sign In</button>
                </form>
                <p style={{ textAlign: 'center', marginTop: 16, fontSize: '0.8rem', color: 'var(--text-light)' }}>Credentials: admin / DREAMZ2026!</p>
            </div>
        </div>
    );
}

// === ADMIN DASHBOARD ===
function AdminDashboard() {
    const { user, setUser, orders, setOrders, promos, setPromos, notifications, setNotifications } = useApp();
    const navigate = useNavigate();
    const [tab, setTab] = useState('overview');

    if (!user) return <AdminLogin />;

    const handleLogout = () => { setUser(null); navigate('/admin'); };

    return (
        <div>
            <header className="header scrolled"><div className="container">
                <a href="/" className="logo"><img src="/images/logo.jpg" alt="" /><div><div className="logo-text">DREAMZ DC</div></div></a>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ color: '#fff' }}>Welcome, {user.name}</span>
                    <button className="cart-btn" onClick={handleLogout}>Logout</button>
                </div>
            </div></header>
            <div className="page-hero" style={{ paddingTop: 80 }}><div className="page-container"><h1>Admin Dashboard</h1></div></div>
            <section className="section">
                <div className="container">
                    <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                        {['overview', 'orders', 'promos', 'notifications'].map(t => (
                            <button key={t} onClick={() => setTab(t)} style={{ padding: '8px 20px', borderRadius: 8, border: 'none', background: tab === t ? 'var(--accent)' : 'var(--border)', color: tab === t ? '#fff' : 'var(--text)', fontWeight: 600, cursor: 'pointer' }}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
                        ))}
                    </div>
                    {tab === 'overview' && (
                        <div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
                                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
                                    <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>Total Orders</div>
                                    <div style={{ fontSize: '2rem', fontWeight: 700 }}>{orders.length}</div>
                                </div>
                                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
                                    <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>Active Promos</div>
                                    <div style={{ fontSize: '2rem', fontWeight: 700 }}>{promos.length}</div>
                                </div>
                                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
                                    <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>Revenue</div>
                                    <div style={{ fontSize: '2rem', fontWeight: 700 }}>$0.00</div>
                                </div>
                                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
                                    <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>Notifications</div>
                                    <div style={{ fontSize: '2rem', fontWeight: 700 }}>{notifications.length}</div>
                                </div>
                            </div>
                        </div>
                    )}
                    {tab === 'orders' && (
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
                            <h2 style={{ marginBottom: 16 }}>Orders</h2>
                            <p style={{ color: 'var(--text-light)' }}>No orders yet.</p>
                        </div>
                    )}
                    {tab === 'promos' && (
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
                            <h2 style={{ marginBottom: 16 }}>Active Promotions</h2>
                            <p style={{ color: 'var(--text-light)' }}>No active promotions.</p>
                        </div>
                    )}
                    {tab === 'notifications' && (
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
                            <h2 style={{ marginBottom: 16 }}>Notifications</h2>
                            {notifications.map(n => (
                                <div key={n.id} style={{ padding: '12px 0', borderBottom: '1px solid var(--border)' }}>{n.message} <span style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>({n.time})</span></div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

// === CART PAGE ===
function Cart() {
    const { cart, cartCount, cartTotal, removeFromCart, updateQty } = useApp();
    const navigate = useNavigate();
    return (
        <div>
            <div className="page-hero"><div className="page-container"><h1>Your Cart</h1><p>{cartCount} items — Total: ${cartTotal.toFixed(2)}</p></div></div>
            <section className="section">
                <div className="container">
                    <div className="checkout-grid">
                        <div>
                            {cart.length === 0 ? <p>Your cart is empty</p> : cart.map(item => (
                                <div key={item.id} className="cart-item">
                                    <img src={item.image} alt={item.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }} />
                                    <div className="cart-item-info">
                                        <div className="cart-item-name">{item.name}</div>
                                        <div className="cart-item-qty">{item.brand} • Qty: {item.qty}</div>
                                    </div>
                                    <div>
                                        <div className="cart-item-price">${(item.price * item.qty).toFixed(2)}</div>
                                        <input type="number" value={item.qty} onChange={e => updateQty(item.id, parseInt(e.target.value) || 1)} min="1" style={{ width: 60, padding: 4, marginTop: 8 }} />
                                        <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', marginLeft: 8 }}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="form-card">
                                <h2 style={{ marginBottom: 16 }}>Order Summary</h2>
                                <div className="cart-total"><span>Total</span><span>${cartTotal.toFixed(2)}</span></div>
                                <button className="checkout-btn" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

// === CHECKOUT PAGE ===
function Checkout() {
    const { cart, cartTotal } = useApp();
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' });
    const [orderPlaced, setOrderPlaced] = useState(false);

    if (orderPlaced) return <div className="page-container" style={{ textAlign: 'center', padding: 80 }}><h1>Order Placed! ✅</h1><p>Thank you for your order. We'll confirm via email.</p></div>;

    const handleSubmit = (e) => {
        e.preventDefault();
        setOrderPlaced(true);
    };

    return (
        <div>
            <div className="page-hero"><div className="page-container"><h1>Checkout</h1><p>Delivery across DC or curbside pickup.</p></div></div>
            <section className="section">
                <div className="container">
                    <div className="checkout-grid">
                        <form className="form-card" onSubmit={handleSubmit}>
                            <h2 style={{ marginBottom: 16 }}>Your details</h2>
                            <div className="form-grid">
                                <div className="form-field"><label>First name <span className="req">*</span></label><input value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} required /></div>
                                <div className="form-field"><label>Last name <span className="req">*</span></label><input value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} required /></div>
                                <div className="form-field full"><label>Email <span className="req">*</span></label><input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required /></div>
                                <div className="form-field full"><label>Phone <span className="opt">(optional)</span></label><input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
                            </div>
                            <button type="submit" className="checkout-btn" style={{ marginTop: 16 }}>Place Order</button>
                        </form>
                        <div className="form-card">
                            <h2 style={{ marginBottom: 16 }}>Order Summary</h2>
                            <div className="cart-total"><span>Total</span><span>${cartTotal.toFixed(2)}</span></div>
                            {cart.map(item => <div key={item.id} style={{ padding: '8px 0', borderBottom: '1px solid var(--border)' }}>{item.name} x{item.qty}</div>)}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

// === APP ===
function AppContent() {
    return (
        <div className="App">
            <AgeGate />
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/shop/:id" element={<ProductPage />} />
                    <Route path="/brands" element={<Brands />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/delivery" element={<Delivery />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:id" element={<BlogArticle />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </AppProvider>
    );
}
