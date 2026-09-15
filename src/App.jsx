import { useState, useEffect, createContext, useContext, useCallback, useMemo } from 'react'
import { BrowserRouter, Routes, Route, Navigate, NavLink, Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { BUSINESS, CATEGORIES, PRODUCTS, BRANDS, filterProducts } from './data.js'
import './styles.css'

const AppContext = createContext(null)
const useApp = () => useContext(AppContext)

function AppProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('dreamz_cart') || '[]') } catch { return [] }
  })
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [toast, setToast] = useState('')
  useEffect(() => { localStorage.setItem('dreamz_cart', JSON.stringify(cart)) }, [cart])
  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
    setToast(`${product.name} added to cart`)
    setTimeout(() => setToast(''), 1800)
  }, [])
  const removeFromCart = useCallback((id) => setCart((prev) => prev.filter((i) => i.id !== id)), [])
  const updateQty = useCallback((id, qty) => {
    if (qty <= 0) return removeFromCart(id)
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, qty } : i))
  }, [removeFromCart])
  const clearCart = useCallback(() => setCart([]), [])
  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const value = useMemo(() => ({
    cart, cartCount, cartTotal, addToCart, removeFromCart, updateQty, clearCart, user, setUser, orders, setOrders, toast,
  }), [cart, cartCount, cartTotal, addToCart, removeFromCart, updateQty, clearCart, user, orders, toast])
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

function AgeGate() {
  const [show, setShow] = useState(() => !localStorage.getItem('dreamz_age_ok'))
  const [dob, setDob] = useState('')
  const [error, setError] = useState('')
  if (!show) return null
  const submit = (e) => {
    e.preventDefault()
    if (!dob) { setError('Enter your date of birth'); return }
    const birth = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const md = today.getMonth() - birth.getMonth()
    if (md < 0 || (md === 0 && today.getDate() < birth.getDate())) age--
    if (age < 21) { setError('You must be 21 or older'); return }
    localStorage.setItem('dreamz_age_ok', 'yes')
    setShow(false)
  }
  return (
    <div className="age-gate-overlay">
      <div className="age-gate-box">
        <h2>21+ only</h2>
        <p>DREAMZ DC Compound sells cannabis to adults 21 and over in Washington, DC.</p>
        <form onSubmit={submit}>
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
          {error && <p className="gate-error">{error}</p>}
          <div className="gate-actions">
            <button type="submit" className="age-gate-btn">I am 21+</button>
            <a className="age-gate-btn secondary" href="https://www.google.com">Leave</a>
          </div>
        </form>
      </div>
    </div>
  )
}

function AnnouncementBar() {
  const text = BUSINESS.announcements.join('   ·   ')
  return (
    <div className="announcement-bar" role="status">
      <div className="announcement-track">
        <span>{text}</span>
        <span aria-hidden="true">{text}</span>
      </div>
    </div>
  )
}

const SHOP_DROPDOWN = [
  { to: '/shop', label: 'All Products' },
  { to: '/flower', label: 'Flower' },
  { to: '/flower/whole-flower', label: 'Whole Flower' },
  { to: '/flower/shake', label: 'Shake' },
  { to: '/flower/small-buds', label: 'Small Buds' },
  { to: '/vapes', label: 'Vapes' },
  { to: '/vapes/disposables', label: 'Disposable Vapes' },
  { to: '/vapes/510-cartridges', label: '510 Cartridges' },
  { to: '/prerolls', label: 'Pre-Rolls' },
  { to: '/edibles', label: 'Edibles' },
]
const CATEGORY_DROPDOWN = [
  { to: '/categories', label: 'All Categories' },
  { to: '/flower', label: 'Flower' },
  { to: '/flower/whole-flower/premium', label: 'Premium Flower ($40–45)' },
  { to: '/flower/whole-flower/top-shelf', label: 'Top Shelf ($50–55)' },
  { to: '/flower/whole-flower/exclusives', label: 'Exclusives ($60+)' },
  { to: '/vapes/disposables', label: 'Disposable Vapes' },
  { to: '/vapes/510-cartridges', label: '510 Cartridges' },
  { to: '/prerolls', label: 'Pre-Rolls' },
  { to: '/edibles', label: 'Edibles' },
  { to: '/concentrates', label: 'Concentrates' },
  { to: '/tinctures', label: 'Tinctures' },
  { to: '/topicals', label: 'Topicals' },
  { to: '/accessories', label: 'Accessories' },
  { to: '/merch', label: 'Merch' },
]
const BRAND_DROPDOWN = BRANDS.map((b) => ({ to: `/brands/${b.name.toLowerCase().replace(/\s+/g, '-')}`, label: b.name }))

function Dropdown({ label, to, items }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`nav-dropdown ${open ? 'open' : ''}`} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <NavLink to={to} className={({ isActive }) => `dropdown-toggle ${isActive ? 'active' : ''}`} onClick={() => setOpen(false)}>
        {label} <span className="caret">▾</span>
      </NavLink>
      <div className="dropdown-menu">
        {items.map((item) => (
          <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)}>{item.label}</NavLink>
        ))}
      </div>
    </div>
  )
}

function Header() {
  const { cartCount } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => { setMobileOpen(false) }, [location.pathname])
  return (
    <header className={scrolled ? 'header scrolled' : 'header'}>
      <div className="container header-row">
        <Link to="/" className="logo">
          <img src="/images/logo.jpg" alt="DREAMZ DC Compound" />
          <div>
            <div className="logo-text">DREAMZ DC</div>
            <div className="logo-sub">Compound · Dispensary</div>
          </div>
        </Link>
        <nav className="nav-desktop" aria-label="Primary">
          <Dropdown label="Shop" to="/shop" items={SHOP_DROPDOWN} />
          <Dropdown label="Categories" to="/categories" items={CATEGORY_DROPDOWN} />
          <Dropdown label="Brands" to="/brands" items={[{ to: '/brands', label: 'All Brands' }, ...BRAND_DROPDOWN]} />
          <NavLink to="/about">About</NavLink>
          <NavLink to="/delivery">Delivery</NavLink>
          <NavLink to="/faq">FAQ</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/med-reg">Med Reg</NavLink>
        </nav>
        <div className="header-actions">
          <Link className="cart-btn" to="/cart">Cart<span className="cart-count">{cartCount}</span></Link>
          <button className="burger" aria-label="Open menu" onClick={() => setMobileOpen((v) => !v)}>{mobileOpen ? '✕' : '☰'}</button>
        </div>
      </div>
      {mobileOpen && (
        <div className="mobile-panel">
          <Link to="/shop">Shop — All</Link>
          {CATEGORY_DROPDOWN.map((i) => <Link key={i.to} to={i.to}>{i.label}</Link>)}
          <Link to="/brands">Brands</Link>
          <Link to="/about">About</Link>
          <Link to="/delivery">Delivery</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/med-reg">Med Reg</Link>
          <Link to="/cart">Cart ({cartCount})</Link>
        </div>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <img src="/images/logo.jpg" alt="" className="footer-logo" />
          <h3>DREAMZ DC Compound</h3>
          <p>{BUSINESS.address}<br />{BUSINESS.city}, {BUSINESS.state} {BUSINESS.zip}</p>
          <p><a href={`tel:${BUSINESS.phone}`}>{BUSINESS.phone}</a><br /><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></p>
        </div>
        <div>
          <h3>Shop</h3>
          <ul>
            <li><Link to="/flower">Flower</Link></li>
            <li><Link to="/vapes">Vapes</Link></li>
            <li><Link to="/prerolls">Pre-Rolls</Link></li>
            <li><Link to="/edibles">Edibles</Link></li>
            <li><Link to="/shop">Full menu</Link></li>
          </ul>
        </div>
        <div>
          <h3>Info</h3>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/delivery">Delivery</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/med-reg">Self-certify</Link></li>
          </ul>
        </div>
        <div>
          <h3>Hours</h3>
          <ul>{BUSINESS.hours.map((h) => <li key={h.day}><strong>{h.day.slice(0, 3)}</strong> {h.open}–{h.close}</li>)}</ul>
        </div>
      </div>
      <div className="footer-bottom">© 2026 DREAMZ DC Compound. 21+ only.</div>
    </footer>
  )
}

function ProductImage({ src, alt }) {
  const [bad, setBad] = useState(false)
  return <img src={bad || !src ? '/images/storefront.jpg' : src} alt={alt} onError={() => setBad(true)} />
}

function ProductCard({ product }) {
  const { addToCart } = useApp()
  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-image">
          <ProductImage src={product.image} alt={product.name} />
          {product.badge && <span className={`product-badge badge-${product.badge}`}>{product.badge}</span>}
        </div>
        <div className="product-info">
          <div className="product-brand">{product.brand}</div>
          <h3 className="product-name">{product.name}</h3>
          <div className="product-details">{product.strain}{product.thc && product.thc !== '—' ? ` · THC ${product.thc}` : ''}{product.weight ? ` · ${product.weight}` : ''}</div>
        </div>
      </Link>
      <div className="product-price">
        <span className="price">${product.price.toFixed(2)}{product.oldPrice && <span className="price-old">${product.oldPrice.toFixed(2)}</span>}</span>
        <button className="add-cart" type="button" onClick={() => addToCart(product)}>ADD</button>
      </div>
    </article>
  )
}

function PageHero({ title, sub }) {
  return <div className="page-hero"><div className="page-container"><h1>{title}</h1>{sub && <p>{sub}</p>}</div></div>
}

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-content">
        <div className="hero-badge">Delivery available · Open 7 days · 10% off first order</div>
        <h1>DREAMZ DC <span>Dispensary</span></h1>
        <p className="lead">Premium cannabis flower, pre-rolls, vapes, edibles, and concentrates delivered to your door in Washington DC — or ready at the curb.</p>
        <div className="hero-buttons">
          <Link className="btn-primary" to="/shop">Shop menu</Link>
          <Link className="btn-secondary" to="/delivery">Order delivery</Link>
        </div>
        <div className="hero-stats">
          <div className="hero-stat"><strong>7 days</strong><span>Open this week</span></div>
          <div className="hero-stat"><strong>~2 hrs</strong><span>Avg delivery</span></div>
          <div className="hero-stat"><strong>{PRODUCTS.length}+</strong><span>Menu items</span></div>
          <div className="hero-stat"><strong>100%</strong><span>Lab tested</span></div>
        </div>
      </div>
    </section>
  )
}

function Home() {
  const featured = PRODUCTS.filter((p) => ['featured', 'sale', 'new', 'exclusive'].includes(p.badge)).slice(0, 6)
  return (
    <>
      <Hero />
      <section className="section">
        <div className="container">
          <div className="section-header text-center"><h2>Shop by category</h2></div>
          <div className="categories-grid">
            {CATEGORIES.map((cat) => (
              <Link key={cat.slug} to={cat.path} className="category-card">
                <img src={cat.image} alt="" onError={(e) => { e.currentTarget.src = '/images/storefront.jpg' }} />
                <h4>{cat.name}</h4>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-alt">
        <div className="container">
          <div className="section-header text-center"><h2>Featured</h2></div>
          <div className="products-grid">{(featured.length ? featured : PRODUCTS.slice(0, 6)).map((p) => <ProductCard key={p.id} product={p} />)}</div>
          <p className="text-center" style={{ marginTop: 28 }}><Link className="btn-primary" to="/shop">View full menu</Link></p>
        </div>
      </section>
    </>
  )
}

function Shop() {
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('all')
  const list = PRODUCTS.filter((p) => (filter === 'all' || p.category === filter) && `${p.name} ${p.brand} ${p.strain}`.toLowerCase().includes(q.toLowerCase()))
  return (
    <>
      <PageHero title="Shop" sub="Full menu. Delivery or curbside at checkout." />
      <section className="section">
        <div className="container">
          <div className="search-row">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search strains, brands…" />
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All categories</option>
              {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
          </div>
          <div className="filter-bar">
            <button className={filter === 'all' ? 'on' : ''} onClick={() => setFilter('all')}>All</button>
            {CATEGORIES.map((c) => <button key={c.slug} className={filter === c.slug ? 'on' : ''} onClick={() => setFilter(c.slug)}>{c.name}</button>)}
          </div>
          <div className="products-grid">{list.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </div>
      </section>
    </>
  )
}

function CategoryPage() {
  const location = useLocation()
  const { list, title } = filterProducts(location.pathname)
  return (
    <>
      <PageHero title={title} sub={`${list.length} product${list.length === 1 ? '' : 's'}`} />
      <section className="section">
        <div className="container">
          {location.pathname.startsWith('/flower') && (
            <div className="filter-bar">
              <Link to="/flower">All flower</Link>
              <Link to="/flower/whole-flower">Whole flower</Link>
              <Link to="/flower/shake">Shake</Link>
              <Link to="/flower/small-buds">Small buds</Link>
              <Link to="/flower/whole-flower/premium">Premium</Link>
              <Link to="/flower/whole-flower/top-shelf">Top shelf</Link>
              <Link to="/flower/whole-flower/exclusives">Exclusives</Link>
            </div>
          )}
          {location.pathname.startsWith('/vapes') && (
            <div className="filter-bar">
              <Link to="/vapes">All vapes</Link>
              <Link to="/vapes/disposables">Disposables</Link>
              <Link to="/vapes/510-cartridges">510 cartridges</Link>
            </div>
          )}
          <div className="products-grid">{list.map((p) => <ProductCard key={p.id} product={p} />)}</div>
          {!list.length && <p>Nothing in this category yet.</p>}
        </div>
      </section>
    </>
  )
}

function ProductPage() {
  const { id } = useParams()
  const { addToCart } = useApp()
  const navigate = useNavigate()
  const product = PRODUCTS.find((p) => String(p.id) === String(id))
  if (!product) return <><PageHero title="Product not found" /><section className="section"><div className="container"><Link to="/shop">Back to shop</Link></div></section></>
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
  return (
    <>
      <PageHero title={product.name} sub={product.brand} />
      <section className="section">
        <div className="container product-layout">
          <div className="product-image tall"><ProductImage src={product.image} alt={product.name} /></div>
          <div>
            <div className="product-brand">{product.brand}</div>
            <h1>{product.name}</h1>
            <p className="product-details">{product.strain} · THC {product.thc} · {product.weight}</p>
            <p>{product.description}</p>
            <p className="price">${product.price.toFixed(2)}</p>
            <button className="checkout-btn" type="button" onClick={() => { addToCart(product); navigate('/cart') }}>Add to cart</button>
          </div>
        </div>
        {related.length > 0 && (
          <div className="container" style={{ marginTop: 48 }}>
            <h2>More in {product.category}</h2>
            <div className="products-grid">{related.map((p) => <ProductCard key={p.id} product={p} />)}</div>
          </div>
        )}
      </section>
    </>
  )
}

function BrandsPage() {
  return (
    <>
      <PageHero title="Brands we carry" sub="House product plus the labels people ask for in DC." />
      <section className="section">
        <div className="container brand-grid">
          {BRANDS.map((b) => (
            <Link key={b.name} to={`/brands/${b.name.toLowerCase().replace(/\s+/g, '-')}`} className="brand-card">
              <img src={b.logo} alt="" className="brand-logo" onError={(e) => { e.currentTarget.src = '/images/logo.jpg' }} />
              <div className="brand-name">{b.name}</div>
              <div className="brand-blurb">{b.blurb}</div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

function BrandDetail() {
  const { slug } = useParams()
  const { list, title } = filterProducts(`/brands/${slug}`)
  return (
    <>
      <PageHero title={title} sub={`${list.length} products`} />
      <section className="section"><div className="container"><div className="products-grid">{list.map((p) => <ProductCard key={p.id} product={p} />)}</div></div></section>
    </>
  )
}

function About() {
  return (
    <>
      <PageHero title="About DREAMZ DC" sub="Washington DC dispensary and delivery." />
      <section className="section">
        <div className="container about-grid">
          <div>
            <p>DREAMZ DC Compound is at {BUSINESS.address}, {BUSINESS.city}, {BUSINESS.state} {BUSINESS.zip}.</p>
            <p>No medical card required. Complete a Visitor Pass and bring a government photo ID.</p>
            <p><a href={BUSINESS.selfCertUrl} target="_blank" rel="noreferrer">Register for a Visitor Pass</a></p>
          </div>
          <img src="/images/storefront.jpg" alt="Storefront" className="about-photo" />
        </div>
      </section>
    </>
  )
}

function DeliveryPage() {
  return (
    <>
      <PageHero title="Delivery & curbside" sub="DC delivery in about two hours. Pickup at the shop." />
      <section className="section">
        <div className="container how-it-works">
          <div className="step-card"><div className="step-number">1</div><h3>Shop the menu</h3><p>Add products, then go to checkout.</p></div>
          <div className="step-card"><div className="step-number">2</div><h3>Pick fulfillment</h3><p>Delivery needs a DC address. Curbside is at {BUSINESS.address}.</p></div>
          <div className="step-card"><div className="step-number">3</div><h3>ID at handoff</h3><p>21+ with photo ID. Average delivery ~2 hours.</p></div>
        </div>
      </section>
    </>
  )
}

function FAQ() {
  const faqs = [
    { q: 'Do I need a medical card?', a: 'No. Adults 21+ with a valid ID can shop after self-certification.' },
    { q: 'Where are you?', a: `${BUSINESS.address}, ${BUSINESS.city}, ${BUSINESS.state} ${BUSINESS.zip}` },
    { q: 'Do you deliver?', a: 'Yes, across Washington DC. Free delivery on orders $75+.' },
    { q: 'Can I pick up?', a: 'Yes — choose curbside at checkout.' },
    { q: 'What payment do you take?', a: 'Cash and debit. No credit cards at this time.' },
  ]
  const [open, setOpen] = useState(0)
  return (
    <>
      <PageHero title="FAQ" />
      <section className="section">
        <div className="container faq-list">
          {faqs.map((f, i) => (
            <div key={f.q} className={`faq-item ${open === i ? 'open' : ''}`}>
              <button type="button" className="faq-question" onClick={() => setOpen(open === i ? -1 : i)}>{f.q} <span>▾</span></button>
              <div className="faq-answer">{f.a}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

function Blog() {
  const posts = [
    { id: '1', title: 'How to buy cannabis in Washington, DC', excerpt: 'Self-certification, Visitor Pass, and what to bring.', image: '/images/storefront.jpg' },
    { id: '2', title: 'How delivery works at DREAMZ DC', excerpt: 'Order online, we confirm, then a runner is at your door.', image: '/images/store inside.jpg' },
    { id: '3', title: 'Indica, sativa, hybrid — a practical split', excerpt: 'Use strain type plus terpenes, not just the label.', image: '/images/Frozen Black Cherry by DREAMZ - Top Shelf Whole Flower.jpg' },
  ]
  return (
    <>
      <PageHero title="Blog" />
      <section className="section">
        <div className="container blog-grid">
          {posts.map((p) => (
            <Link key={p.id} to={`/blog/${p.id}`} className="blog-card">
              <div className="blog-image"><img src={p.image} alt="" /></div>
              <div className="blog-info"><h3 className="blog-title">{p.title}</h3><p className="blog-excerpt">{p.excerpt}</p></div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

function BlogArticle() {
  const { id } = useParams()
  const posts = {
    '1': { title: 'How to buy cannabis in Washington, DC', body: 'You must be 21+. Complete the DC Visitor Pass / self-cert, then shop in store or order delivery with a government photo ID.', image: '/images/storefront.jpg' },
    '2': { title: 'How delivery works at DREAMZ DC', body: 'Place the order, choose delivery, we confirm, then a runner brings it to your DC address. Average time is about two hours.', image: '/images/store inside.jpg' },
    '3': { title: 'Indica, sativa, hybrid — a practical split', body: 'Indica leans body and evening. Sativa leans daytime. Hybrids sit in the middle.', image: '/images/Frozen Black Cherry by DREAMZ - Top Shelf Whole Flower.jpg' },
  }
  const post = posts[id]
  if (!post) return <PageHero title="Article not found" />
  return (
    <>
      <PageHero title={post.title} />
      <section className="section"><div className="container" style={{ maxWidth: 760 }}><img src={post.image} alt="" style={{ width: '100%', borderRadius: 16, marginBottom: 24 }} /><p>{post.body}</p></div></section>
    </>
  )
}

function MedReg() {
  return (
    <>
      <PageHero title="Medical / Visitor Pass" sub="No card? Self-certify before pickup or delivery." />
      <section className="section">
        <div className="container">
          <p>DC allows adult-use purchases for 21+ after you register for a Visitor Pass.</p>
          <p><a className="btn-primary" href={BUSINESS.selfCertUrl} target="_blank" rel="noreferrer">Open self-cert portal</a></p>
        </div>
      </section>
    </>
  )
}

function CartPage() {
  const { cart, cartTotal, updateQty, removeFromCart } = useApp()
  return (
    <>
      <PageHero title="Cart" sub={cart.length ? `${cart.length} line${cart.length === 1 ? '' : 's'}` : 'Empty'} />
      <section className="section">
        <div className="container checkout-grid">
          <div>
            {!cart.length && <p>Your cart is empty. <Link to="/shop">Shop the menu</Link>.</p>}
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt="" />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-qty">{item.brand}</div>
                  <input type="number" min="1" value={item.qty} onChange={(e) => updateQty(item.id, parseInt(e.target.value, 10) || 1)} />
                  <button type="button" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
                <div className="cart-item-price">${(item.price * item.qty).toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className="form-card">
            <h2>Summary</h2>
            <div className="cart-total"><span>Total</span><span>${cartTotal.toFixed(2)}</span></div>
            <Link className="checkout-btn" to="/checkout">Checkout</Link>
          </div>
        </div>
      </section>
    </>
  )
}

function Checkout() {
  const { cart, cartTotal, clearCart, setOrders } = useApp()
  const [method, setMethod] = useState('delivery')
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', street: '', apt: '', city: 'Washington', state: 'DC', zip: '20003', notes: '' })
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  if (done) return <><PageHero title="Order received" /><section className="section"><div className="container"><p>We will confirm by email. Have your ID ready.</p></div></section></>
  const submit = (e) => {
    e.preventDefault()
    setOrders((prev) => [...prev, { id: Date.now(), method, form, cart, total: cartTotal }])
    clearCart()
    setDone(true)
  }
  return (
    <>
      <PageHero title="Checkout" sub="Delivery across DC or curbside at the shop." />
      <section className="section">
        <div className="container checkout-grid">
          <form className="form-card" onSubmit={submit}>
            <h2>Fulfillment</h2>
            <div className="method-row">
              <label className={method === 'delivery' ? 'on' : ''}><input type="radio" name="method" checked={method === 'delivery'} onChange={() => setMethod('delivery')} /> Delivery</label>
              <label className={method === 'curbside' ? 'on' : ''}><input type="radio" name="method" checked={method === 'curbside'} onChange={() => setMethod('curbside')} /> Curbside pickup</label>
            </div>
            <div className="form-grid">
              <div className="form-field"><label>First name <span className="req">*</span></label><input required value={form.firstName} onChange={set('firstName')} /></div>
              <div className="form-field"><label>Last name <span className="req">*</span></label><input required value={form.lastName} onChange={set('lastName')} /></div>
              <div className="form-field full"><label>Email <span className="req">*</span></label><input type="email" required value={form.email} onChange={set('email')} /></div>
              <div className="form-field full"><label>Phone <span className="opt">(optional)</span></label><input value={form.phone} onChange={set('phone')} /></div>
              {method === 'delivery' && (
                <>
                  <div className="form-field full"><label>Delivery street <span className="req">*</span></label><input required value={form.street} onChange={set('street')} /></div>
                  <div className="form-field"><label>Apt <span className="opt">(optional)</span></label><input value={form.apt} onChange={set('apt')} /></div>
                  <div className="form-field"><label>City <span className="req">*</span></label><input required value={form.city} onChange={set('city')} /></div>
                  <div className="form-field"><label>State <span className="req">*</span></label><input required value={form.state} onChange={set('state')} /></div>
                  <div className="form-field"><label>ZIP <span className="req">*</span></label><input required value={form.zip} onChange={set('zip')} /></div>
                </>
              )}
              {method === 'curbside' && <p className="full">Pickup: {BUSINESS.address}, {BUSINESS.city}, {BUSINESS.state} {BUSINESS.zip}</p>}
              <div className="form-field full"><label>Notes <span className="opt">(optional)</span></label><input value={form.notes} onChange={set('notes')} /></div>
            </div>
            <button className="checkout-btn" type="submit" disabled={!cart.length}>Place order · ${cartTotal.toFixed(2)}</button>
          </form>
          <div className="form-card">
            <h2>Bag</h2>
            {cart.map((i) => <div key={i.id} className="bag-line">{i.name} × {i.qty}</div>)}
            {!cart.length && <p>Cart is empty.</p>}
            <div className="cart-total"><span>Total</span><span>${cartTotal.toFixed(2)}</span></div>
          </div>
        </div>
      </section>
    </>
  )
}

function AdminDashboard() {
  const { user, setUser, orders } = useApp()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  if (!user) {
    return (
      <div className="admin-login">
        <form className="form-card" onSubmit={(e) => {
          e.preventDefault()
          if (form.username === 'admin' && form.password === 'DREAMZ2026!') setUser({ name: 'Admin', role: 'admin' })
          else setError('Invalid credentials')
        }}>
          <h1>DREAMZ admin</h1>
          <div className="form-field"><label>Username</label><input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} /></div>
          <div className="form-field"><label>Password</label><input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
          {error && <p className="gate-error">{error}</p>}
          <button className="checkout-btn" type="submit">Sign in</button>
        </form>
      </div>
    )
  }
  return (
    <>
      <PageHero title="Admin" sub={`Signed in as ${user.name}`} />
      <section className="section">
        <div className="container">
          <button type="button" className="add-cart" onClick={() => setUser(null)}>Log out</button>
          <h2 style={{ margin: '24px 0 12px' }}>Orders ({orders.length})</h2>
          {!orders.length && <p>No orders in this browser session yet.</p>}
          {orders.map((o) => (
            <div key={o.id} className="form-card" style={{ marginBottom: 12 }}>
              <strong>#{o.id}</strong> · {o.method} · ${o.total.toFixed(2)} · {o.form.email}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

function Toast() {
  const { toast } = useApp()
  if (!toast) return null
  return <div className="toast">{toast}</div>
}

function AppShell() {
  return (
    <div className="App">
      <AgeGate />
      <AnnouncementBar />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ProductPage />} />
          <Route path="/categories" element={<Shop />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/flower/*" element={<CategoryPage />} />
          <Route path="/flower" element={<CategoryPage />} />
          <Route path="/vapes/*" element={<CategoryPage />} />
          <Route path="/vapes" element={<CategoryPage />} />
          <Route path="/prerolls/*" element={<CategoryPage />} />
          <Route path="/prerolls" element={<CategoryPage />} />
          <Route path="/edibles" element={<CategoryPage />} />
          <Route path="/concentrates" element={<CategoryPage />} />
          <Route path="/tinctures" element={<CategoryPage />} />
          <Route path="/topicals" element={<CategoryPage />} />
          <Route path="/accessories" element={<CategoryPage />} />
          <Route path="/merch" element={<CategoryPage />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/brands/:slug" element={<BrandDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogArticle />} />
          <Route path="/med-reg" element={<MedReg />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <Toast />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </AppProvider>
  )
}
