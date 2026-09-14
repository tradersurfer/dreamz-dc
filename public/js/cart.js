/* Persistent cart + checkout helpers */
(function () {
  const KEY = 'dreamz_cart_v1';
  const AGE_KEY = 'dreamz_age_ok';

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
  }
  function write(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('dreamz:cart'));
  }
  function catalog() {
    return (window.DREAMZ && window.DREAMZ.PRODUCTS) || [];
  }
  function findProduct(id) {
    return catalog().find(p => p.id === id);
  }
  function add(id, qty) {
    qty = qty || 1;
    const p = findProduct(id);
    if (!p) return;
    const items = read();
    const existing = items.find(i => i.id === id);
    if (existing) existing.qty += qty;
    else items.push({ id: p.id, name: p.name, price: p.price, image: p.image, qty });
    write(items);
    toast(p.name + ' added to cart');
  }
  function setQty(id, qty) {
    let items = read();
    if (qty <= 0) items = items.filter(i => i.id !== id);
    else items = items.map(i => i.id === id ? { ...i, qty } : i);
    write(items);
  }
  function remove(id) { setQty(id, 0); }
  function clear() { write([]); }
  function count() { return read().reduce((s, i) => s + i.qty, 0); }
  function subtotal() { return read().reduce((s, i) => s + i.price * i.qty, 0); }
  function toast(msg) {
    document.querySelectorAll('.toast').forEach(n => n.remove());
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2200);
  }

  window.DreamzCart = { read, write, add, setQty, remove, clear, count, subtotal, findProduct, toast };
  window.DREAMZ_AGE_KEY = AGE_KEY;
})();
