import { useMemo, useState, createContext, useContext, useCallback } from 'react'
import { Link, NavLink, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { PRODUCTS, BRANDS, CATEGORIES } from './data.js'

const NAV = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/products', label: 'Products' },
  { to: '/admin/orders', label: 'Orders' },
  { to: '/admin/brands', label: 'Brands' },
  { to: '/admin/categories', label: 'Categories' },
  { to: '/admin/announcements', label: 'Announcements & Deals' },
  { to: '/admin/reviews', label: 'Reviews' },
  { to: '/admin/messages', label: 'Messages' },
]

const ORDER_STATUSES = ['received', 'confirmed', 'out_for_delivery', 'ready_for_pickup', 'completed', 'cancelled']
const CATS = ['flower', 'vapes', 'prerolls', 'edibles', 'concentrates', 'topicals', 'tinctures', 'accessories', 'merch']

const AdminContext = createContext()

export const AdminProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [catalog, setCatalog] = useState(PRODUCTS)
  const [orders, setOrders] = useState([])
  const [reviews, setReviews] = useState([
    { id: 1, productName: 'DREAMZ Compound Flower', author: 'Mike T.', rating: 5, title: 'Amazing', body: 'Best flower in DC', approved: true },
    { id: 2, productName: 'Cookies Blueberry Banana', author: 'Sarah K.', rating: 4, title: 'Great', body: 'Love the flavor', approved: false },
  ])
  const [brands, setBrands] = useState(BRANDS)
  const [categories, setCategories] = useState(CATEGORIES)
  const [announcements, setAnnouncements] = useState([
    { id: Date.now(), title: '10% OFF first order', subtitle: 'Free delivery on $75+', link: '/shop', active: true },
  ])
  const [messages, setMessages] = useState([])

  const upsertProduct = useCallback((product) => {
    setCatalog(prev => {
      const filtered = prev.filter(p => String(p.id) !== String(product.id))
      return [...filtered, product]
    })
  }, [])
  const deleteProduct = useCallback((id) => {
    setCatalog(prev => prev.filter(p => String(p.id) !== String(id)))
  }, [])
  const upsertBrand = useCallback((brand) => {
    setBrands(prev => {
      const filtered = prev.filter(b => b.name !== brand.name)
      return [...filtered, brand]
    })
  }, [])
  const deleteBrand = useCallback((name) => {
    setBrands(prev => prev.filter(b => b.name !== name))
  }, [])
  const upsertCategory = useCallback((cat) => {
    setCategories(prev => {
      const filtered = prev.filter(c => c.slug !== cat.slug)
      return [...filtered, cat]
    })
  }, [])
  const deleteCategory = useCallback((slug) => {
    setCategories(prev => prev.filter(c => c.slug !== slug))
  }, [])
  const addAnnouncement = useCallback((a) => {
    setAnnouncements(prev => [...prev, a])
  }, [])
  const toggleAnnouncement = useCallback((id) => {
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a))
  }, [])
  const deleteAnnouncement = useCallback((id) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id))
  }, [])
  const setOrderStatus = useCallback((id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
  }, [])
  const setReviewApproved = useCallback((id, approved) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, approved } : r))
  }, [])
  const deleteReview = useCallback((id) => {
    setReviews(prev => prev.filter(r => r.id !== id))
  }, [])
  const markMessageRead = useCallback((id) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m))
  }, [])

  const value = useMemo(() => ({
    user, setUser, catalog, orders, reviews, brands, categories, announcements, messages,
    upsertProduct, deleteProduct, upsertBrand, deleteBrand, upsertCategory, deleteCategory,
    addAnnouncement, toggleAnnouncement, deleteAnnouncement, setOrderStatus,
    setReviewApproved, deleteReview, markMessageRead,
  }), [user, catalog, orders, reviews, brands, categories, announcements, messages])

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

function useApp() { return useContext(AdminContext) }

function slugify(s) {
  return String(s || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export { useApp, slugify, NAV, ORDER_STATUSES, CATS }

function Stat({ label, value, warn }) {
  return (
    <div className={`adm-stat ${warn ? 'warn' : ''}`}>
      <p>{label}</p>
      <strong>{value}</strong>
    </div>
  )
}

function Dashboard() {
  const { catalog, orders, reviews } = useApp()
  const active = catalog.filter((p) => p.available !== false)
  const low = catalog.filter((p) => (p.stock ?? 12) <= 5)
  const pending = reviews.filter((r) => !r.approved)
  const recent = [...orders].slice(-8).reverse()
  return (
    <div>
      <h1 className="adm-h1">Dashboard</h1>
      <div className="adm-stats">
        <Stat label="Active Products" value={active.length} />
        <Stat label="Orders" value={orders.length} />
        <Stat label="Low Stock" value={low.length} warn={low.length > 0} />
        <Stat label="Reviews Awaiting Approval" value={pending.length} warn={pending.length > 0} />
      </div>
      <div className="adm-grid-2">
        <div>
          <div className="adm-row-head">
            <h2>Recent Orders</h2>
            <Link to="/admin/orders">View all →</Link>
          </div>
          <div className="adm-card">
            {!recent.length && <p className="adm-muted">No orders yet.</p>}
            {recent.map((o) => (
              <div key={o.id} className="adm-line">
                <div>
                  <b>#{o.id}</b>
                  <div className="adm-muted">{o.form?.firstName} {o.form?.lastName} · {o.method}</div>
                </div>
                <div className="adm-right">
                  <b>${Number(o.total || 0).toFixed(2)}</b>
                  <div className="adm-muted">{o.status || 'received'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2>Low Stock</h2>
          <div className="adm-card">
            {!low.length && <p className="adm-muted">Nothing running low right now.</p>}
            {low.map((p) => (
              <div key={p.id} className="adm-line">
                <div>
                  <b>{p.name}</b>
                  <div className="adm-muted">{p.brand} · {p.weight}</div>
                </div>
                <span className={(p.stock || 0) === 0 ? 'adm-danger' : 'adm-warn'}>{p.stock ?? 0} left</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductsList() {
  const { catalog } = useApp()
  const [q, setQ] = useState('')
  const list = catalog.filter((p) => `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(q.toLowerCase()))
  return (
    <div>
      <div className="adm-row-head">
        <h1 className="adm-h1">Products</h1>
        <Link className="adm-btn" to="/admin/products/new">+ New Product</Link>
      </div>
      <input className="adm-input" style={{ maxWidth: 360, marginBottom: 16 }} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products..." />
      <div className="adm-card adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr><th>Product</th><th>Brand</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th /></tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="adm-prod">
                    <img src={p.image} alt="" />
                    <Link to={`/admin/products/${p.id}`}>{p.name}</Link>
                  </div>
                </td>
                <td>{p.brand}</td>
                <td>{p.category}</td>
                <td>${Number(p.price).toFixed(2)}</td>
                <td className={(p.stock ?? 12) <= 5 ? 'adm-warn' : ''}>{p.stock ?? 12}</td>
                <td>{p.available === false ? 'Hidden' : 'Active'}</td>
                <td><Link to={`/admin/products/${p.id}`}>Edit</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
        {!list.length && <p className="adm-muted" style={{ padding: 24, textAlign: 'center' }}>No products found.</p>}
      </div>
    </div>
  )
}

function emptyProduct() {
  return {
    id: '', name: '', brand: 'DREAMZ COMPOUND', category: 'flower', price: 45, oldPrice: '',
    weight: '3.5g', thc: '', terps: '', strain: 'Hybrid', image: '/images/logo.jpg',
    description: '', badge: '', available: true, stock: 12,
    flowerKind: 'whole-flower', vapeKind: 'disposables', prerollKind: 'standard',
  }
}

function ProductForm({ initial, onSave, title }) {
  const [form, setForm] = useState(initial)
  const nav = useNavigate()
  const set = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.type === 'number' ? Number(e.target.value) : e.target.value
    setForm((f) => ({ ...f, [k]: v }))
  }
  return (
    <form className="adm-card adm-form" onSubmit={(e) => {
      e.preventDefault()
      const id = form.id || slugify(form.name)
      onSave({ ...form, id, price: Number(form.price) || 0, oldPrice: form.oldPrice ? Number(form.oldPrice) : null, stock: Number(form.stock) || 0 })
      nav('/admin/products')
    }}>
      <h1 className="adm-h1">{title}</h1>
      <label>Name<input className="adm-input" required value={form.name} onChange={set('name')} /></label>
      <label>ID / slug<input className="adm-input" value={form.id} onChange={set('id')} placeholder="auto from name if blank" /></label>
      <label>Brand<input className="adm-input" value={form.brand} onChange={set('brand')} /></label>
      <label>Category
        <select className="adm-input" value={form.category} onChange={set('category')}>
          {CATS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </label>
      {form.category === 'flower' && (
        <label>Flower kind
          <select className="adm-input" value={form.flowerKind} onChange={set('flowerKind')}>
            <option value="whole-flower">whole-flower</option>
            <option value="shake">shake</option>
            <option value="small-buds">small-buds</option>
          </select>
        </label>
      )}
      {form.category === 'vapes' && (
        <label>Vape kind
          <select className="adm-input" value={form.vapeKind} onChange={set('vapeKind')}>
            <option value="disposables">disposables</option>
            <option value="510-cartridges">510-cartridges</option>
          </select>
        </label>
      )}
      {form.category === 'prerolls' && (
        <label>Pre-roll kind
          <select className="adm-input" value={form.prerollKind} onChange={set('prerollKind')}>
            <option value="standard">standard</option>
            <option value="premium">premium</option>
            <option value="top-shelf">top-shelf</option>
            <option value="branded">branded</option>
          </select>
        </label>
      )}
      <div className="adm-form-2">
        <label>Price<input className="adm-input" type="number" step="0.01" value={form.price} onChange={set('price')} /></label>
        <label>Compare-at<input className="adm-input" type="number" step="0.01" value={form.oldPrice || ''} onChange={set('oldPrice')} /></label>
        <label>Weight<input className="adm-input" value={form.weight} onChange={set('weight')} /></label>
        <label>Stock<input className="adm-input" type="number" value={form.stock} onChange={set('stock')} /></label>
        <label>THC<input className="adm-input" value={form.thc} onChange={set('thc')} /></label>
        <label>Terps<input className="adm-input" value={form.terps} onChange={set('terps')} /></label>
      </div>
      <label>Strain<input className="adm-input" value={form.strain} onChange={set('strain')} /></label>
      <label>Image URL <span className="adm-muted">(/images/your-file.jpg)</span>
        <input className="adm-input" value={form.image} onChange={set('image')} />
      </label>
      <label>Badge
        <select className="adm-input" value={form.badge || ''} onChange={set('badge')}>
          <option value="">none</option>
          <option value="new">new</option>
          <option value="sale">sale</option>
          <option value="featured">featured</option>
          <option value="exclusive">exclusive</option>
        </select>
      </label>
      <label>Description<textarea className="adm-input" rows={4} value={form.description} onChange={set('description')} /></label>
      <label className="adm-check"><input type="checkbox" checked={form.available !== false} onChange={set('available')} /> Active (visible on shop)</label>
      <div className="adm-actions">
        <button className="adm-btn" type="submit">Save product</button>
        <Link to="/admin/products">Cancel</Link>
      </div>
    </form>
  )
}

function ProductNew() {
  const { upsertProduct } = useApp()
  return <ProductForm title="New Product" initial={emptyProduct()} onSave={upsertProduct} />
}

function ProductEdit() {
  const { id } = useParams()
  const { catalog, upsertProduct, deleteProduct } = useApp()
  const nav = useNavigate()
  const product = catalog.find((p) => String(p.id) === String(id))
  if (!product) return <p>Product not found. <Link to="/admin/products">Back</Link></p>
  return (
    <div>
      <ProductForm title="Edit Product" initial={{ ...emptyProduct(), ...product }} onSave={upsertProduct} />
      <button className="adm-btn danger" type="button" onClick={() => { if (confirm('Delete this product?')) { deleteProduct(product.id); nav('/admin/products') }}}>Delete product</button>
    </div>
  )
}

function OrdersPage() {
  const { orders, setOrderStatus } = useApp()
  const [status, setStatus] = useState('all')
  const list = status === 'all' ? orders : orders.filter((o) => (o.status || 'received') === status)
  return (
    <div>
      <h1 className="adm-h1">Orders</h1>
      <div className="adm-pills">
        {['all', ...ORDER_STATUSES].map((s) => (
          <button key={s} type="button" className={status === s ? 'on' : ''} onClick={() => setStatus(s)}>{s.replace(/_/g, ' ')}</button>
        ))}
      </div>
      {!list.length && <p className="adm-muted">No orders in this view.</p>}
      {[...list].reverse().map((o) => (
        <div key={o.id} className="adm-card" style={{ marginBottom: 12 }}>
          <div className="adm-line">
            <div>
              <b>#{o.id}</b>
              <div className="adm-muted">{o.form?.firstName} {o.form?.lastName} · {o.form?.email} · {o.form?.phone}</div>
              <div className="adm-muted">{o.method}{o.form?.street ? ` — ${o.form.street}, ${o.form.city} ${o.form.zip}` : ''}</div>
              {o.form?.notes && <div className="adm-muted">Notes: {o.form.notes}</div>}
            </div>
            <div className="adm-right">
              <b>${Number(o.total || 0).toFixed(2)}</b>
              <select className="adm-input" value={o.status || 'received'} onChange={(e) => setOrderStatus(o.id, e.target.value)}>
                {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
              </select>
            </div>
          </div>
          <div className="adm-items">
            {(o.cart || []).map((i) => (
              <p key={i.id}>{i.qty}× {i.name} — ${(i.price * i.qty).toFixed(2)}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function BrandsPageAdmin() {
  const { brands, upsertBrand, deleteBrand } = useApp()
  const [form, setForm] = useState({ name: '', logo: '/images/logo.jpg', blurb: '' })
  return (
    <div className="adm-narrow">
      <h1 className="adm-h1">Brands</h1>
      <p className="adm-muted">House line plus every manufacturer on the shelf. Shown on /brands.</p>
      <div className="adm-stack">
        {brands.map((b) => (
          <div key={b.name} className="adm-card adm-line">
            <img src={b.logo} alt="" className="adm-thumb" />
            <div style={{ flex: 1 }}>
              <b>{b.name}</b>
              <div className="adm-muted">{b.blurb}</div>
            </div>
            <button type="button" onClick={() => deleteBrand(b.name)}>Remove</button>
          </div>
        ))}
      </div>
      <form className="adm-card adm-form" onSubmit={(e) => { e.preventDefault(); upsertBrand(form); setForm({ name: '', logo: '/images/logo.jpg', blurb: '' }) }}>
        <h2>New Brand</h2>
        <label>Name<input className="adm-input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
        <label>Logo URL<input className="adm-input" value={form.logo} onChange={(e) => setForm({ ...form, logo: e.target.value })} /></label>
        <label>Blurb<input className="adm-input" value={form.blurb} onChange={(e) => setForm({ ...form, blurb: e.target.value })} /></label>
        <button className="adm-btn" type="submit">Add Brand</button>
      </form>
    </div>
  )
}

function CategoriesPageAdmin() {
  const { categories, upsertCategory, deleteCategory } = useApp()
  const [form, setForm] = useState({ slug: '', name: '', path: '', image: '/images/categories/flower.jpg' })
  return (
    <div className="adm-narrow">
      <h1 className="adm-h1">Categories</h1>
      <p className="adm-muted">Drives the homepage grid and shop filters.</p>
      {(categories.length ? categories : CATEGORIES).map((c) => (
        <div key={c.slug} className="adm-card adm-line">
          <img src={c.image || '/images/logo.jpg'} alt="" className="adm-thumb" />
          <div style={{ flex: 1 }}><b>{c.name}</b><div className="adm-muted">{c.path || `/${c.slug}`}</div></div>
          <button type="button" onClick={() => deleteCategory(c.slug)}>Remove</button>
        </div>
      ))}
      <form className="adm-card adm-form" onSubmit={(e) => {
        e.preventDefault()
        const slug = form.slug || slugify(form.name)
        upsertCategory({ ...form, slug, path: form.path || `/${slug}` })
        setForm({ slug: '', name: '', path: '', image: '/images/categories/flower.jpg' })
      }}>
        <h2>New Category</h2>
        <label>Name<input className="adm-input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
        <label>Slug<input className="adm-input" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></label>
        <label>Image URL<input className="adm-input" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} /></label>
        <button className="adm-btn" type="submit">Add Category</button>
      </form>
    </div>
  )
}

function AnnouncementsPage() {
  const { announcements, addAnnouncement, toggleAnnouncement, deleteAnnouncement } = useApp()
  const [form, setForm] = useState({ title: '', subtitle: '', link: '', active: true })
  return (
    <div className="adm-narrow">
      <h1 className="adm-h1">Announcements & Deals</h1>
      {announcements.map((a) => (
        <div key={a.id} className="adm-card adm-line">
          <div style={{ flex: 1 }}>
            <b>{a.title}</b>
            {a.subtitle && <div className="adm-muted">{a.subtitle}</div>}
            <div className="adm-muted">{a.active ? 'Active' : 'Hidden'}</div>
          </div>
          <button type="button" onClick={() => toggleAnnouncement(a.id)}>{a.active ? 'Hide' : 'Show'}</button>
          <button type="button" onClick={() => deleteAnnouncement(a.id)}>Delete</button>
        </div>
      ))}
      <form className="adm-card adm-form" onSubmit={(e) => {
        e.preventDefault()
        addAnnouncement({ ...form, id: Date.now() })
        setForm({ title: '', subtitle: '', link: '', active: true })
      }}>
        <h2>New Announcement</h2>
        <label>Title<input className="adm-input" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
        <label>Subtitle<input className="adm-input" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} /></label>
        <label>Link<input className="adm-input" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="/shop" /></label>
        <label className="adm-check"><input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} /> Active immediately</label>
        <button className="adm-btn" type="submit">Create Announcement</button>
      </form>
    </div>
  )
}

function ReviewsPage() {
  const { reviews, setReviewApproved, deleteReview } = useApp()
  const pending = reviews.filter((r) => !r.approved)
  return (
    <div className="adm-narrow">
      <h1 className="adm-h1">Reviews Awaiting Approval</h1>
      {!pending.length && <p className="adm-muted">Nothing waiting on approval right now.</p>}
      {pending.map((r) => (
        <div key={r.id} className="adm-card">
          <b>{r.productName}</b>
          <div className="adm-muted">{r.author} · {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
          {r.title && <p>{r.title}</p>}
          <p className="adm-muted">{r.body}</p>
          <div className="adm-actions">
            <button className="adm-btn" type="button" onClick={() => setReviewApproved(r.id, true)}>Approve</button>
            <button type="button" onClick={() => deleteReview(r.id)}>Reject</button>
          </div>
        </div>
      ))}
    </div>
  )
}

function MessagesPage() {
  const { messages, markMessageRead } = useApp()
  return (
    <div className="adm-narrow">
      <h1 className="adm-h1">Contact Messages</h1>
      {!messages.length && <p className="adm-muted">No messages yet. Storefront contact forms will land here.</p>}
      {messages.map((m) => (
        <div key={m.id} className={`adm-card ${m.read ? '' : 'adm-unread'}`}>
          <div className="adm-line">
            <div>
              <b>{m.name} {!m.read && <span className="adm-badge">New</span>}</b>
              <div className="adm-muted">{m.email}{m.phone ? ` · ${m.phone}` : ''}</div>
              {m.subject && <p>{m.subject}</p>}
              <p className="adm-muted">{m.message}</p>
            </div>
            {!m.read && <button type="button" onClick={() => markMessageRead(m.id)}>Mark read</button>}
          </div>
        </div>
      ))}
    </div>
  )
}

export function AdminShell() {
  const { user, setUser } = useApp()
  if (!user) return <Navigate to="/admin/login" replace />
  return (
    <div className="adm-shell">
      <aside className="adm-side">
        <Link to="/admin" className="adm-brand">DREAMZ Admin</Link>
        <nav>
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end}>{n.label}</NavLink>
          ))}
        </nav>
        <div className="adm-side-foot">
          <p>{user.email || user.name}</p>
          <button type="button" onClick={() => setUser(null)}>Sign out</button>
          <Link to="/">View site</Link>
        </div>
      </aside>
      <section className="adm-main">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="products/new" element={<ProductNew />} />
          <Route path="products/:id" element={<ProductEdit />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="brands" element={<BrandsPageAdmin />} />
          <Route path="categories" element={<CategoriesPageAdmin />} />
          <Route path="announcements" element={<AnnouncementsPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="messages" element={<MessagesPage />} />
        </Routes>
      </section>
    </div>
  )
}

export function AdminLogin() {
  const { user, setUser } = useApp()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  if (user) return <Navigate to="/admin" replace />
  return (
    <div className="admin-login">
      <form className="form-card" onSubmit={(e) => {
        e.preventDefault()
        const id = form.username.trim().toLowerCase()
        if ((id === 'jordanad46@gmail.com' || id === 'admin') && form.password === 'LoneWolf.276$') {
          setUser({ name: 'Adrian Jordan', email: 'jordanad46@gmail.com', role: 'admin' })
        } else setError('Invalid email or password')
      }}>
        <h1>DREAMZ admin</h1>
        <div className="form-field"><label>Email</label><input type="email" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} /></div>
        <div className="form-field"><label>Password</label><input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
        {error && <p className="gate-error">{error}</p>}
        <button className="checkout-btn" type="submit">Sign in</button>
      </form>
    </div>
  )
}
