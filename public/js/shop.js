(function () {
  const params = new URLSearchParams(location.search);
  const products = (window.DREAMZ && DREAMZ.PRODUCTS) || [];
  const categories = (window.DREAMZ && DREAMZ.CATEGORIES) || [];

  function normCat(p) {
    const t = (p.type || '').toLowerCase();
    const c = (p.category || '').toLowerCase();
    if (t.includes('flower') || c.includes('flower')) return 'flower';
    if (t.includes('preroll') || c.includes('pre-roll')) return 'pre-rolls';
    if (t.includes('cartridge') || t.includes('vape') || c.includes('vape')) return 'vapes';
    if (t.includes('edible') || c.includes('edible')) return 'edibles';
    if (t.includes('concentrate') || c.includes('concentrate')) return 'concentrates';
    if (t.includes('topical') || c.includes('topical')) return 'topicals';
    if (t.includes('tincture') || c.includes('tincture')) return 'tinctures';
    if (t.includes('accessor') || c.includes('accessor')) return 'accessories';
    if (t.includes('merch') || c.includes('merch')) return 'merch';
    return c || t || 'other';
  }

  const state = {
    category: params.get('category') || 'all',
    brand: params.get('brand') || 'all',
    q: params.get('q') || ''
  };

  function filtered() {
    return products.filter(p => {
      const cat = normCat(p);
      if (state.category !== 'all' && cat !== state.category && (p.brandSlug !== state.category)) return false;
      if (state.brand !== 'all' && (p.brandSlug !== state.brand && p.brand !== state.brand)) return false;
      if (state.q) {
        const hay = [p.name, p.brand, p.strain, p.description].join(' ').toLowerCase();
        if (!hay.includes(state.q.toLowerCase())) return false;
      }
      return true;
    });
  }

  function render() {
    const grid = document.getElementById('productsGrid');
    const count = document.getElementById('resultCount');
    const list = filtered();
    if (count) count.textContent = list.length + ' product' + (list.length === 1 ? '' : 's');
    if (grid) grid.innerHTML = list.length ? list.map(DreamzUI.productCard).join('') : '<p style="color:#888">No products match those filters.</p>';
    document.querySelectorAll('[data-filter]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === state.category);
    });
    const brandSel = document.getElementById('brandFilter');
    if (brandSel) brandSel.value = state.brand;
    const search = document.getElementById('shopSearch');
    if (search) search.value = state.q;
  }

  const catBar = document.getElementById('filterBar');
  if (catBar) {
    catBar.innerHTML = ['all'].concat(categories.map(c => c.slug)).map(slug => {
      const label = slug === 'all' ? 'ALL' : (categories.find(c => c.slug === slug) || { name: slug }).name;
      return `<button class="filter-btn" type="button" data-filter="${slug}">${label}</button>`;
    }).join('');
  }

  const brandSel = document.getElementById('brandFilter');
  if (brandSel) {
    const brands = [...new Map(products.map(p => [p.brandSlug || p.brand, p.brand])).entries()];
    brandSel.innerHTML = '<option value="all">All brands</option>' + brands.map(([slug, name]) => `<option value="${slug}">${name}</option>`).join('');
  }

  document.body.addEventListener('click', e => {
    const btn = e.target.closest('[data-filter]');
    if (!btn) return;
    state.category = btn.dataset.filter;
    render();
  });
  document.getElementById('brandFilter')?.addEventListener('change', e => { state.brand = e.target.value; render(); });
  document.getElementById('shopSearch')?.addEventListener('input', e => { state.q = e.target.value; render(); });

  const homeCats = document.getElementById('homeCategories');
  if (homeCats) homeCats.innerHTML = categories.map(DreamzUI.categoryCard).join('');
  const homeGrid = document.getElementById('homeProducts');
  if (homeGrid) homeGrid.innerHTML = products.slice(0, 8).map(DreamzUI.productCard).join('');

  render();
})();
