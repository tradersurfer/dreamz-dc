(function () {
  const TAX_RATE = 0;
  const DELIVERY_FEE = 8;
  const PICKUP_ADDRESS = '611 Pennsylvania Ave SE, 2nd Floor, Washington, DC 20003';

  const itemsEl = document.getElementById('summaryItems');
  const form = document.getElementById('checkoutForm');
  if (!form) return;

  function totals(fulfillment, promo) {
    const sub = DreamzCart.subtotal();
    let discount = 0;
    if ((promo || '').toUpperCase() === 'DREAMZ10') discount = +(sub * 0.10).toFixed(2);
    const fee = fulfillment === 'delivery' ? DELIVERY_FEE : 0;
    const tax = +((sub - discount) * TAX_RATE).toFixed(2);
    const total = +(sub - discount + fee + tax).toFixed(2);
    return { sub, discount, fee, tax, total };
  }

  function fulfillment() {
    return form.querySelector('input[name="fulfillment"]:checked')?.value || 'delivery';
  }

  function renderSummary() {
    const cart = DreamzCart.read();
    if (!cart.length) {
      itemsEl.innerHTML = '<p style="color:#888">Your cart is empty. <a href="/shop.html" style="color:var(--gold)">Continue shopping</a></p>';
      document.getElementById('placeOrder').disabled = true;
    } else {
      document.getElementById('placeOrder').disabled = false;
      itemsEl.innerHTML = cart.map(i => `<div class="cart-item"><img src="${i.image || '/images/storefront.jpg'}" alt=""><div style="flex:1"><strong>${i.name}</strong><div style="color:#888;font-size:.8rem">Qty ${i.qty}</div></div><span>${DreamzUI.money(i.price * i.qty)}</span></div>`).join('');
    }
    const t = totals(fulfillment(), form.promo.value);
    document.getElementById('sumSub').textContent = DreamzUI.money(t.sub);
    document.getElementById('sumDiscRow').classList.toggle('hidden', !t.discount);
    document.getElementById('sumDisc').textContent = '-' + DreamzUI.money(t.discount);
    document.getElementById('sumFeeLabel').textContent = fulfillment() === 'delivery' ? 'Delivery' : 'Curbside';
    document.getElementById('sumFee').textContent = DreamzUI.money(t.fee);
    document.getElementById('sumTotal').textContent = DreamzUI.money(t.total);
  }

  function toggleFulfillment() {
    const mode = fulfillment();
    document.getElementById('deliveryFields').classList.toggle('hidden', mode !== 'delivery');
    document.getElementById('pickupFields').classList.toggle('hidden', mode !== 'curbside');
    document.querySelectorAll('.fulfill-opt').forEach(el => {
      el.classList.toggle('active', el.dataset.mode === mode);
    });
    const requiredOn = mode === 'delivery';
    ['shipAddress', 'shipCity', 'shipState', 'shipZip'].forEach(id => {
      document.getElementById(id).required = requiredOn;
    });
    renderSummary();
  }

  document.querySelectorAll('input[name="fulfillment"]').forEach(r => r.addEventListener('change', toggleFulfillment));
  document.querySelectorAll('.fulfill-opt').forEach(el => el.addEventListener('click', () => {
    el.querySelector('input').checked = true;
    toggleFulfillment();
  }));
  form.promo.addEventListener('input', renderSummary);
  window.addEventListener('dreamz:cart', renderSummary);
  toggleFulfillment();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const err = document.getElementById('formError');
    err.textContent = '';
    const cart = DreamzCart.read();
    if (!cart.length) { err.textContent = 'Your cart is empty.'; return; }

    const mode = fulfillment();
    const payload = {
      customer: {
        firstName: form.firstName.value.trim(),
        lastName: form.lastName.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim()
      },
      fulfillment: mode,
      delivery: mode === 'delivery' ? {
        address: form.shipAddress.value.trim(),
        apartment: form.shipApt.value.trim(),
        city: form.shipCity.value.trim(),
        state: form.shipState.value.trim(),
        zip: form.shipZip.value.trim()
      } : {
        location: PICKUP_ADDRESS,
        vehicleColor: form.vehicleColor.value.trim(),
        vehicleMake: form.vehicleMake.value.trim(),
        vehiclePlate: form.vehiclePlate.value.trim()
      },
      optional: {
        promo: form.promo.value.trim(),
        notes: form.notes.value.trim(),
        preferredTime: form.preferredTime.value.trim()
      },
      items: cart,
      totals: totals(mode, form.promo.value),
      createdAt: new Date().toISOString()
    };

    if (!payload.customer.firstName || !payload.customer.lastName || !payload.customer.email) {
      err.textContent = 'Name and email are required.';
      return;
    }
    if (mode === 'delivery') {
      const d = payload.delivery;
      if (!d.address || !d.city || !d.state || !d.zip) {
        err.textContent = 'Delivery address, city, state, and ZIP are required for delivery.';
        return;
      }
    }
    if (!form.ageConfirm.checked) {
      err.textContent = 'You must confirm you are 21 or older.';
      return;
    }

    const btn = document.getElementById('placeOrder');
    btn.disabled = true;
    btn.textContent = 'Submitting…';

    let orderId = 'DZ' + Date.now().toString().slice(-8);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        orderId = data.orderId || orderId;
      }
    } catch (_) { /* static hosting fallback */ }

    localStorage.setItem('dreamz_last_order', JSON.stringify({ orderId, ...payload }));
    DreamzCart.clear();
    location.href = '/checkout.html?placed=' + encodeURIComponent(orderId);
  });

  const placed = new URLSearchParams(location.search).get('placed');
  if (placed) {
    const last = JSON.parse(localStorage.getItem('dreamz_last_order') || '{}');
    document.getElementById('checkoutMain').innerHTML = `
      <div class="form-card success-box">
        <div style="font-size:2.4rem;margin-bottom:10px">✅</div>
        <h1>Order received</h1>
        <p style="color:#aaa;margin:10px 0 18px">Confirmation <strong style="color:var(--gold)">${placed}</strong></p>
        <p>Thanks${last.customer ? ', ' + last.customer.firstName : ''}. We have your ${last.fulfillment === 'curbside' ? 'curbside pickup' : 'delivery'} request and will follow up at ${last.customer?.email || 'your email'}.</p>
        <p style="color:#888;margin:14px 0">Pay in person / on delivery. A team member may text or call from (202) 709-8944 to confirm.</p>
        <a class="btn-primary" href="/shop.html">Continue shopping</a>
      </div>`;
  }
})();
