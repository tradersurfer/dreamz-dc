module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const body = req.body || {};
  const customer = body.customer || {};
  if (!customer.firstName || !customer.lastName || !customer.email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  if (body.fulfillment === 'delivery') {
    const d = body.delivery || {};
    if (!d.address || !d.city || !d.state || !d.zip) {
      return res.status(400).json({ error: 'Delivery address is required' });
    }
  }
  return res.status(200).json({ ok: true, orderId: 'DZ' + Date.now().toString().slice(-8) });
};
