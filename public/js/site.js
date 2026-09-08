(function () {
  const SELF_CERT = 'https://octo.quickbase.com/db/bscn22va8?a=dbpage&pageID=39';
  const path = location.pathname.replace(/\/+$/, '') || '/';

  function isActive(href) {
    if (href === '/' || href === '/index.html') return path === '/' || path === '/index.html';
    return path === href || path.startsWith(href.replace('.html', ''));
  }

  function navLink(href, label) {
    return `<a href="${href}" class="${isActive(href) ? 'active' : ''}">${label}</a>`;
  }

  function chrome() {
    const header = `
<header class="header">
  <div class="container">
    <a href="/" class="logo">
      <img src="/images/logo.jpg" alt="DREAMZ DC">
      <div>
        <div class="logo-text">DREAMZ DC</div>
        <div class="logo-sub">Premium Dispensary</div>
      </div>
    </a>
    <nav class="nav-desktop">
      ${navLink('/shop.html', 'Shop')}
      ${navLink('/brands.html', 'Brands')}
      ${navLink('/about.html', 'About')}
      ${navLink('/delivery.html', 'Delivery')}
      ${navLink('/faq.html', 'FAQ')}
      ${navLink('/blog.html', 'Blog')}
      <a href="${SELF_CERT}" target="_blank" rel="noopener">Med Reg</a>
      <button class="cart-btn" type="button" data-open-cart><i class="fas fa-shopping-cart"></i> Cart <span class="cart-count">0</span></button>
    </nav>
    <button class="nav-toggle" type="button" data-toggle-menu aria-label="Menu"><i class="fas fa-bars"></i></button>
  </div>
</header>
<div class="announcement-bar">
  <div class="announcement-track">
    <span class="announcement-item">FIRST-TIME CUSTOMERS: 10% OFF — code DREAMZ10</span>
    <span class="announcement-item">BUY 1 VAPE, GET 1 VAPE 50% OFF on select cartridges</span>
    <span class="announcement-item">NEW DREAMZ COMPOUND STRAINS JUST DROPPED</span>
    <span class="announcement-item">Delivery & curbside pickup available in Washington DC</span>
    <span class="announcement-item">FIRST-TIME CUSTOMERS: 10% OFF — code DREAMZ10</span>
    <span class="announcement-item">BUY 1 VAPE, GET 1 VAPE 50% OFF on select cartridges</span>
    <span class="announcement-item">NEW DREAMZ COMPOUND STRAINS JUST DROPPED</span>
    <span class="announcement-item">Delivery & curbside pickup available in Washington DC</span>
  </div>
</div>
<div class="mobile-menu" id="mobileMenu">
  <button class="mobile-close" type="button" data-toggle-menu>&times;</button>
  <a href="/shop.html">Shop</a>
  <a href="/brands.html">Brands</a>
  <a href="/about.html">About</a>
  <a href="/delivery.html">Delivery</a>
  <a href="/faq.html">FAQ</a>
  <a href="/blog.html">Blog</a>
  <a href="${SELF_CERT}" target="_blank" rel="noopener">Self-Certify / Med Reg</a>
  <a href="/checkout.html">Checkout</a>
</div>`;

    const footer = `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <img src="/images/logo.jpg" alt="DREAMZ DC" style="height:36px;width:36px;object-fit:cover;border-radius:6px;margin-bottom:10px">
        <h3>DREAMZ DC</h3>
        <p>Washington DC premium cannabis dispensary and delivery. 611 Pennsylvania Ave SE, 2nd Floor.</p>
        <div class="social-links">
          <a href="https://www.instagram.com/dccompound_" target="_blank" rel="noopener"><i class="fab fa-instagram"></i></a>
          <a href="https://www.facebook.com/dccompound" target="_blank" rel="noopener"><i class="fab fa-facebook"></i></a>
          <a href="https://www.x.com/dccompound" target="_blank" rel="noopener"><i class="fab fa-x-twitter"></i></a>
        </div>
      </div>
      <div>
        <h3>Shop</h3>
        <ul>
          <li><a href="/shop.html">All products</a></li>
          <li><a href="/shop.html?category=flower">Flower</a></li>
          <li><a href="/shop.html?category=vapes">Vapes</a></li>
          <li><a href="/shop.html?category=edibles">Edibles</a></li>
          <li><a href="/brands.html">Brands</a></li>
        </ul>
      </div>
      <div>
        <h3>Company</h3>
        <ul>
          <li><a href="/about.html">About</a></li>
          <li><a href="/delivery.html">Delivery & pickup</a></li>
          <li><a href="/faq.html">FAQ</a></li>
          <li><a href="/blog.html">Blog</a></li>
          <li><a href="${SELF_CERT}" target="_blank" rel="noopener">Self-certify</a></li>
        </ul>
      </div>
      <div>
        <h3>Contact</h3>
        <ul>
          <li><a href="tel:2027098944">(202) 709-8944</a></li>
          <li><a href="mailto:info@dreamzdccompound.shop">info@dreamzdccompound.shop</a></li>
          <li>Sun–Wed 10AM–12AM<br>Thu–Sat 10AM–3AM EST</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 DREAMZ DC. 21+ only. | Cannabis products have not been evaluated by the FDA.</p>
    </div>
  </div>
</footer>
<div class="cart-overlay" id="cartOverlay">
  <div class="cart-panel">
    <div class="cart-header"><h2>Your Cart</h2><button class="cart-close" type="button" data-close-cart>&times;</button></div>
    <div id="cartItems"></div>
    <div id="cartFooter" class="hidden">
      <div class="cart-total"><span>Subtotal</span><span id="cartTotal">$0.00</span></div>
      <a class="checkout-btn" href="/checkout.html" style="display:block;text-align:center">Checkout</a>
    </div>
  </div>
</div>`;

    document.body.classList.add('has-announce');
    document.body.insertAdjacentHTML('afterbegin', header);
    document.body.insertAdjacentHTML('beforeend', footer);

    if (!localStorage.getItem(window.DREAMZ_AGE_KEY)) {
      const gate = document.createElement('div');
      gate.className = 'age-gate-overlay';
      gate.innerHTML = `<div class="age-gate-box">
        <div style="font-size:2.4rem;margin-bottom:8px">🌿</div>
        <h2 style="margin-bottom:10px">You Must Be 21+</h2>
        <p style="color:#aaa;margin-bottom:18px">By entering DREAMZ DC, you certify that you are 21 years of age or older.</p>
        <button class="age-gate-btn" type="button" id="ageEnter">ENTER</button><br>
        <button class="age-gate-btn" type="button" style="background:transparent;color:#fff;border:1px solid #555" id="ageCert">Self-Certify Here</button>
      </div>`;
      document.body.appendChild(gate);
      gate.querySelector('#ageEnter').onclick = () => {
        localStorage.setItem(window.DREAMZ_AGE_KEY, '1');
        gate.remove();
      };
      gate.querySelector('#ageCert').onclick = () => window.open(SELF_CERT, '_blank');
    }
  }

  function money(n) { return '$' + Number(n || 0).toFixed(2); }

  function renderCart() {
    const items = DreamzCart.read();
    document.querySelectorAll('.cart-count').forEach(el => el.textContent = DreamzCart.count());
    const box = document.getElementById('cartItems');
    const foot = document.getElementById('cartFooter');
    if (!box) return;
    if (!items.length) {
      box.innerHTML = '<p style="color:#888;text-align:center;padding:40px 0">Your cart is empty</p>';
      if (foot) foot.classList.add('hidden');
      return;
    }
    box.innerHTML = items.map(i => `
      <div class="cart-item">
        <img src="${i.image || '/images/storefront.jpg'}" alt="">
        <div style="flex:1">
          <div style="font-weight:700">${i.name}</div>
          <div class="cart-qty">
            <button type="button" data-qty="${i.id}" data-d="-1">−</button>
            <span>${i.qty}</span>
            <button type="button" data-qty="${i.id}" data-d="1">+</button>
            <button type="button" data-remove="${i.id}" style="margin-left:auto;background:none;border:none;color:#e94560;cursor:pointer">Remove</button>
          </div>
        </div>
        <strong>${money(i.price * i.qty)}</strong>
      </div>`).join('');
    document.getElementById('cartTotal').textContent = money(DreamzCart.subtotal());
    foot.classList.remove('hidden');
  }

  function bind() {
    document.body.addEventListener('click', (e) => {
      if (e.target.closest('[data-open-cart]')) document.getElementById('cartOverlay').classList.add('open');
      if (e.target.closest('[data-close-cart]') || e.target.id === 'cartOverlay') document.getElementById('cartOverlay').classList.remove('open');
      if (e.target.closest('[data-toggle-menu]')) document.getElementById('mobileMenu').classList.toggle('open');
      const qty = e.target.closest('[data-qty]');
      if (qty) {
        const item = DreamzCart.read().find(i => i.id === qty.dataset.qty);
        DreamzCart.setQty(qty.dataset.qty, (item ? item.qty : 1) + Number(qty.dataset.d));
      }
      const rm = e.target.closest('[data-remove]');
      if (rm) DreamzCart.remove(rm.dataset.remove);
      const add = e.target.closest('[data-add]');
      if (add) DreamzCart.add(add.dataset.add, Number(add.dataset.qty || 1));
    });
    window.addEventListener('dreamz:cart', renderCart);
    renderCart();
  }

  function productCard(p) {
    const img = p.image || '/images/storefront.jpg';
    const badge = p.badge ? `<span class="product-badge badge-${p.badge}">${p.badge}</span>` : '';
    const old = p.oldPrice ? `<span class="price-old">${money(p.oldPrice)}</span>` : '';
    return `<article class="product-card">
      <a href="/product.html?id=${encodeURIComponent(p.id)}" class="product-image">
        <img src="${img}" alt="${p.name}">${badge}
      </a>
      <div class="product-info">
        <div class="product-brand">${p.brand || ''}</div>
        <a class="product-name" href="/product.html?id=${encodeURIComponent(p.id)}">${p.name}</a>
        <div class="product-details"><span class="product-strain strain-${p.strainType || 'hybrid'}">${p.strain || ''}</span> THC ${p.thc || '—'}${p.weight ? ' · ' + p.weight : ''}</div>
        <div class="product-price">
          <span class="price">${money(p.price)}${old}</span>
          <button class="add-cart" type="button" data-add="${p.id}">ADD</button>
        </div>
      </div>
    </article>`;
  }

  function categoryCard(c) {
    const preferred = '/images/categories/' + c.slug + '.jpg';
    return `<a class="category-card" href="/shop.html?category=${encodeURIComponent(c.slug)}">
      <img src="${preferred}" alt="${c.name}" onerror="this.src='${c.image || '/images/storefront.jpg'}'">
      <h4>${c.name}</h4>
    </a>`;
  }

  window.DreamzUI = { productCard, categoryCard, money, SELF_CERT };

  chrome();
  bind();
})();
