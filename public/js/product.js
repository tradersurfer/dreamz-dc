(function () {
  const id = new URLSearchParams(location.search).get('id');
  const products = (window.DREAMZ && DREAMZ.PRODUCTS) || [];
  const p = products.find(x => x.id === id) || products[0];
  const root = document.getElementById('productRoot');
  if (!root || !p) return;
  document.title = p.name + ' | DREAMZ DC';
  root.innerHTML = `
    <div class="product-detail">
      <img src="${p.image || '/images/storefront.jpg'}" alt="${p.name}">
      <div>
        <p class="product-brand">${p.brand || ''}</p>
        <h1 style="font-size:2rem;margin:6px 0 10px">${p.name}</h1>
        <div class="meta-row">
          <span class="product-strain strain-${p.strainType || 'hybrid'}">${p.strain || ''}</span>
          <span class="chip">THC ${p.thc || '—'}</span>
          ${p.terps ? `<span class="chip">Terps ${p.terps}</span>` : ''}
          ${p.weight ? `<span class="chip">${p.weight}</span>` : ''}
          ${p.inStock ? `<span class="chip">In stock</span>` : ''}
        </div>
        <p class="price" style="margin:12px 0">${DreamzUI.money(p.price)}${p.oldPrice ? `<span class="price-old">${DreamzUI.money(p.oldPrice)}</span>` : ''}</p>
        <p style="color:#b8b8c4;margin-bottom:16px">${p.description || ''}</p>
        ${p.genetics ? `<p style="color:#888;font-size:.9rem;margin-bottom:16px">Genetics: ${p.genetics}</p>` : ''}
        <div style="display:flex;gap:10px;align-items:center;margin-bottom:18px">
          <label style="font-size:.85rem;color:#aaa">Qty</label>
          <input id="qty" type="number" min="1" value="1" style="width:72px;background:#101018;border:1px solid var(--border);color:#fff;border-radius:8px;padding:8px">
          <button class="btn-primary" type="button" id="addBtn">Add to cart</button>
        </div>
        <p style="color:#888;font-size:.85rem">Delivery and curbside pickup available at checkout. 21+ with valid ID.</p>
        <p style="margin-top:14px"><a href="/shop.html" class="btn-secondary">Back to shop</a></p>
      </div>
    </div>`;
  document.getElementById('addBtn').onclick = () => {
    DreamzCart.add(p.id, Number(document.getElementById('qty').value || 1));
  };
  const related = document.getElementById('relatedGrid');
  if (related) {
    const others = products.filter(x => x.id !== p.id && (x.brand === p.brand || x.type === p.type)).slice(0, 4);
    related.innerHTML = (others.length ? others : products.filter(x => x.id !== p.id).slice(0, 4)).map(DreamzUI.productCard).join('');
  }
})();
