export const BUSINESS = {
  name: 'DREAMZ DC',
  displayName: 'DREAMZ DC Compound',
  tagline: 'Premium Cannabis Dispensary & Delivery',
  phone: '(202) 709-8944',
  email: 'info@dreamzdccompound.shop',
  website: 'https://www.dreamzdccompound.shop',
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
  announcements: [
    'FIRST-TIME CUSTOMERS: 10% OFF your first order — use code DREAMZ10',
    'BUY 1 VAPE, GET 1 VAPE 50% OFF on select cartridges',
    'NEW DREAMZ COMPOUND STRAINS JUST DROPPED',
    'Free delivery on orders $75+ · Open 7 days · Call (202) 709-8944',
    'Delivery across Washington DC · Curbside pickup at 611 Pennsylvania Ave SE',
  ],
}

const img = (file) => `/images/${file}`
const FLOWER_IMG = img('Frozen Black Cherry by DREAMZ - Top Shelf Whole Flower.jpg')
const PREROLL_IMG = img('bulk-flower.jpg')
const GUMMY_IMG = img('DeVour Gummy Edibles - Watermelon Slices - 1500mg (150mg ea pc).jpg')

export const CATEGORIES = [
  { slug: 'flower', name: 'Flower', path: '/flower', image: '/images/categories/flower.jpg' },
  { slug: 'prerolls', name: 'Pre-Rolls', path: '/prerolls', image: '/images/categories/pre-rolls.jpg' },
  { slug: 'vapes', name: 'Vaporizers', path: '/vapes', image: '/images/categories/vapes.jpg' },
  { slug: 'edibles', name: 'Edibles', path: '/edibles', image: '/images/categories/edibles.jpg' },
  { slug: 'concentrates', name: 'Concentrates', path: '/concentrates', image: '/images/categories/concentrates.jpg' },
  { slug: 'topicals', name: 'Topicals', path: '/topicals', image: '/images/categories/topicals.jpg' },
  { slug: 'tinctures', name: 'Tinctures', path: '/tinctures', image: '/images/categories/tinctures.jpg' },
  { slug: 'accessories', name: 'Accessories', path: '/accessories', image: '/images/categories/accessories.jpg' },
  { slug: 'merch', name: 'Merch', path: '/merch', image: '/images/categories/merch.jpg' },
]

const RAW = [
  { id: 'dreamz-compound-flower', name: 'DREAMZ Compound Whole Flower', brand: 'DREAMZ COMPOUND', category: 'flower', flowerKind: 'whole-flower', strain: 'Hybrid', thc: '27%', terps: '2.5%', price: 54, oldPrice: 58, badge: 'featured', weight: '3.5g', description: 'House hybrid eighth.', image: FLOWER_IMG },
  { id: 'frozen-black-cherry', name: 'Frozen Black Cherry', brand: 'DREAMZ COMPOUND', category: 'flower', flowerKind: 'whole-flower', strain: 'Hybrid', thc: '29%', terps: '2.6%', price: 55, weight: '3.5g', description: 'Top-shelf cherry gas.', image: FLOWER_IMG },
  { id: 'ogkb-21', name: 'OG Kush Breath [OGKB 2.1]', brand: 'DREAMZ COMPOUND', category: 'flower', flowerKind: 'whole-flower', strain: 'Indica', thc: '28%', terps: '2.8%', price: 55, weight: '3.5g', description: 'Earthy OG indica.', image: img('OG Kush Breath [OGKB 2.1] by DREAMZ - Premium Whole Flower.jpg') },
  { id: 'dreamz-exclusive-eighth', name: 'DREAMZ Exclusive Eighth', brand: 'DREAMZ COMPOUND', category: 'flower', flowerKind: 'whole-flower', strain: 'Hybrid', thc: '30%', terps: '2.8%', price: 62, badge: 'exclusive', weight: '3.5g', description: 'Limited exclusive drop.', image: img('OG Kush Breath [OGKB 2.1] by DREAMZ - Premium Whole Flower.jpg') },
  { id: 'ganjavores-green-crack', name: 'Green Crack', brand: 'Ganjavores', category: 'flower', flowerKind: 'whole-flower', strain: 'Sativa', thc: '24%', price: 45, weight: '3.5g', description: 'Uplifting sativa.', image: img('Green Crack by Ganjavores - Premium Flower.jpg') },
  { id: 'ganjavores-sour-diesel', name: 'Sour Diesel', brand: 'Ganjavores', category: 'flower', flowerKind: 'whole-flower', strain: 'Sativa', thc: '26%', price: 45, weight: '3.5g', description: 'Classic diesel.', image: img('Sour Diesel by Ganjavores - Hybrid - 3.5G Jars - Top Shelf Whole Flower.jpg') },
  { id: 'cookies-blueberry-banana', name: 'Blueberry Banana', brand: 'Cookies', category: 'flower', flowerKind: 'whole-flower', strain: 'Hybrid', thc: '28%', price: 55, weight: '3.5g', description: 'Cookies berry hybrid.', image: img('Blueberry Banana by Cookies.jpg') },
  { id: 'cookies-gary-payton', name: 'Gary Payton', brand: 'Cookies', category: 'flower', flowerKind: 'whole-flower', strain: 'Hybrid', thc: '27%', price: 55, weight: '3.5g', description: 'Gassy Cookies hybrid.', image: img('Gary Payton by Cookies -Premium Whole Flower.jpg') },
  { id: 'rythm-london-poundcake', name: 'London Poundcake 7g', brand: 'Rythm', category: 'flower', flowerKind: 'whole-flower', strain: 'Hybrid', thc: '30%', price: 95, badge: 'exclusive', weight: '7g', description: '7G Rythm jar.', image: img('London Poundcake (Hybrid) by Rythm - 7G Jars - Premium Whole Flower.jpg') },
  { id: 'rythm-hybrid-whole', name: 'Rythm Hybrid Whole Flower', brand: 'Rythm', category: 'flower', flowerKind: 'whole-flower', strain: 'Hybrid', thc: '27%', price: 55, weight: '3.5g', description: 'Rythm hybrid eighth.', image: img('OG Kush Breath by Rhythm.jpg') },
  { id: 'trulieve-cultivar', name: 'Cultivar Collection Whole Flower', brand: 'Trulieve', category: 'flower', flowerKind: 'whole-flower', strain: 'Hybrid', thc: '29%', price: 60, badge: 'exclusive', weight: '3.5g', description: 'Cultivar Collection.', image: img('Cultivar Collection by Trulieve - Bubble Gum Kush - Premium Whole Flower.jpg') },
  { id: 'trulieve-bubble-gum', name: 'Bubble Gum Kush', brand: 'Trulieve', category: 'flower', flowerKind: 'whole-flower', strain: 'Indica', thc: '25%', price: 45, weight: '3.5g', description: 'Sweet berry kush.', image: img('Cultivar Collection by Trulieve - Bubble Gum Kush - Premium Whole Flower.jpg') },
  { id: 'jenny-kush', name: 'Jenny Kush', brand: 'Cultivation Labs', category: 'flower', flowerKind: 'whole-flower', strain: 'Indica', thc: '26%', price: 48, weight: '3.5g', description: 'Jenny Kush eighth.', image: img('Jenny Kush by Cultivation Labs - Top Shelf Whole Flower.jpg') },
  { id: 'gelato-33', name: 'Gelato 33', brand: 'Jungle Boys', category: 'flower', flowerKind: 'whole-flower', strain: 'Hybrid', thc: '27%', price: 52, weight: '3.5g', description: 'Jungle Boys Gelato 33.', image: img('Gelato 33 by Jungle Boys - Premium Flower.jpg') },
  { id: 'house-shake-7g', name: 'House Shake 7g', brand: 'DREAMZ COMPOUND', category: 'flower', flowerKind: 'shake', strain: 'Hybrid', thc: '20%', price: 40, weight: '7g', description: 'Value shake.', image: PREROLL_IMG },
  { id: 'small-buds-eighth', name: 'Small Buds 3.5g', brand: 'DREAMZ COMPOUND', category: 'flower', flowerKind: 'small-buds', strain: 'Hybrid', thc: '23%', price: 42, weight: '3.5g', description: 'Small buds eighth.', image: FLOWER_IMG },
  { id: 'lemonchello-flower', name: 'Lemonchello', brand: 'Lemonnade', category: 'flower', flowerKind: 'whole-flower', strain: 'Sativa', thc: '26%', price: 55, weight: '3.5g', description: 'Lemonnade Lemonchello.', image: img('Green Crack by Ganjavores - Premium Flower.jpg') },
  { id: 'dreamz-vape-510', name: 'DREAMZ Vape Cartridge 1g', brand: 'DREAMZ COMPOUND', category: 'vapes', vapeKind: '510-cartridges', strain: 'Indica', thc: '76%', price: 72, badge: 'new', weight: '1g', description: '1g 510 cartridge.', image: img('Gary Payton 2G Fat Boy Vape by Cookies.jpg') },
  { id: 'cookies-fat-boy', name: 'Gary Payton 2G Fat Boy', brand: 'Cookies', category: 'vapes', vapeKind: 'disposables', strain: 'Hybrid', thc: '80%+', price: 65, weight: '2g', description: 'Cookies Fat Boy disposable.', image: img('Gary Payton 2G Fat Boy Vape by Cookies.jpg') },
  { id: 'jeeter-ice-cream-banana', name: 'Jeeter Juice Ice Cream Banana', brand: 'Jeeter Juice', category: 'vapes', vapeKind: 'disposables', strain: 'Indica', thc: '70%+', price: 50, weight: '1g', description: 'Live resin disposable.', image: img('Jeeter Juice - Ice Cream Banana (Indica)  - Disposable Straw Vape - 1G - Live Resin.jpg') },
  { id: 'jeeter-wedding-cake', name: 'Jeeter Juice Wedding Cake', brand: 'Jeeter Juice', category: 'vapes', vapeKind: 'disposables', strain: 'Hybrid', thc: '70%+', price: 50, weight: '1g', description: 'Live resin disposable.', image: img('Jeeter Juice - Wedding Cake (Hybrid) - Disposable Straw Vape - 1G - Live Resin.jpg') },
  { id: 'jeeter-papaya', name: 'Jeeter Juice Papaya', brand: 'Jeeter Juice', category: 'vapes', vapeKind: 'disposables', strain: 'Indica', thc: '70%+', price: 50, weight: '1g', description: 'Papaya disposable.', image: img('Jeeter Juice - Papaya (Indica)- Disposable Straw Vape - 1G - Live Resin.jpg') },
  { id: 'jeeter-ice-cream-cake', name: 'Jeeter Juice Ice Cream Cake', brand: 'Jeeter Juice', category: 'vapes', vapeKind: 'disposables', strain: 'Indica', thc: '70%+', price: 50, weight: '1g', description: 'Ice Cream Cake disposable.', image: img('Jeeter Juice - Ice Cream Cake (Indica) 500mg- Disposable Straw Vape - 1G - Live Resin.jpg') },
  { id: 'backpackboyz-lemon-cherriez', name: 'Lemon & Cherriez 2G AIO', brand: 'BackpackBoyz', category: 'vapes', vapeKind: 'disposables', strain: 'Hybrid', thc: '80%+', price: 55, weight: '2g', description: 'All-in-one disposable.', image: img('BackPackBoyz Lemon & Cherriez disposable vape, 2g, All-In-One, Live Resin, Melted Diamonds.jpg') },
  { id: 'dreamz-gummies-1000', name: 'DREAMZ Gummies 1000mg', brand: 'DREAMZ COMPOUND', category: 'edibles', strain: 'Hybrid', thc: '~85-90%', price: 60, oldPrice: 75, badge: 'sale', weight: '1000mg', description: 'House 1000mg gummies.', image: GUMMY_IMG },
  { id: 'devour-watermelon', name: 'Watermelon Slices Sour Gummies (1500mg)', brand: 'DeVour', category: 'edibles', strain: 'Hybrid', thc: '1500mg', price: 65, weight: '1500mg', description: 'DeVour watermelon slices.', image: img('DeVour Gummy Edibles - Watermelon Slices - 1500mg (150mg ea pc).jpg') },
  { id: 'devour-crawlers', name: 'High Crawlers 1500mg', brand: 'DeVour', category: 'edibles', strain: 'Hybrid', thc: '1500mg', price: 65, weight: '1500mg', description: '10 x 150mg crawlers.', image: img('DeVour Gummy Edibles - High Crawlers- 1500mg (10 pc x 150mg ea pc).jpg') },
  { id: 'muha-gummies', name: 'Muha Meds Gummies', brand: 'Muha Meds', category: 'edibles', strain: 'Mixed', thc: '1000mg', price: 55, weight: '1000mg', description: 'Muha fruit gummies.', image: GUMMY_IMG },
  { id: 'premium-preroll-1g', name: 'Premium 1G Pre-Roll', brand: 'DREAMZ COMPOUND', category: 'prerolls', prerollKind: 'premium', strain: 'Hybrid', thc: '24%', price: 10, weight: '1g', description: 'Single premium 1G pre-roll.', image: PREROLL_IMG },
  { id: 'topshelf-preroll-1g', name: 'Top-Shelf 1G Pre-Roll', brand: 'DREAMZ COMPOUND', category: 'prerolls', prerollKind: 'top-shelf', strain: 'Hybrid', thc: '28%', price: 15, weight: '1g', description: 'Single top-shelf 1G pre-roll.', image: PREROLL_IMG },
  { id: 'premium-preroll-5pk', name: 'Premium 1G Pre-Roll 5-pack', brand: 'DREAMZ COMPOUND', category: 'prerolls', prerollKind: 'premium', strain: 'Hybrid', thc: '24%', price: 45, weight: '5x1g', description: 'Five premium 1G pre-rolls.', image: PREROLL_IMG },
  { id: 'topshelf-preroll-5pk', name: 'Top-Shelf 1G Pre-Roll 5-pack', brand: 'DREAMZ COMPOUND', category: 'prerolls', prerollKind: 'top-shelf', strain: 'Hybrid', thc: '28%', price: 70, weight: '5x1g', description: 'Five top-shelf 1G pre-rolls.', image: PREROLL_IMG },
  { id: 'kingsize-2g', name: 'King Size 2G Pre-Roll', brand: 'DREAMZ COMPOUND', category: 'prerolls', prerollKind: 'standard', strain: 'Hybrid', thc: '25%', price: 18, weight: '2g', description: 'King size 2G pre-roll.', image: PREROLL_IMG },
  { id: 'sluggers-5pk', name: 'Sluggers .5G 5-pack', brand: 'Sluggers', category: 'prerolls', prerollKind: 'branded', strain: 'Hybrid', thc: '22%', price: 40, badge: 'new', weight: '5x0.5g', description: 'Sluggers .5G 5-pack.', image: PREROLL_IMG },
  { id: 'jeeter-jar-5pk', name: 'Jeeter .5G 5-pack Jar', brand: 'Jeeter', category: 'prerolls', prerollKind: 'branded', strain: 'Hybrid', thc: '26%', price: 48, weight: '5x0.5g', description: 'Jeeter preroll jar.', image: PREROLL_IMG },
  { id: 'dreamz-concentrates', name: 'DREAMZ Live Concentrate', brand: 'DREAMZ COMPOUND', category: 'concentrates', strain: 'Hybrid', thc: '71-88%', price: 72, weight: '1g', description: 'House extract.', image: img('storefront.jpg') },
  { id: 'dreamz-topicals', name: 'DREAMZ Relief Balm', brand: 'DREAMZ COMPOUND', category: 'topicals', strain: 'Balanced', thc: '<1%', price: 35, weight: '2oz', description: 'Relief balm.', image: PREROLL_IMG },
  { id: 'dreamz-tincture', name: 'DREAMZ Tincture 1000mg', brand: 'DREAMZ COMPOUND', category: 'tinctures', strain: 'Hybrid', thc: '1000mg', price: 55, weight: '30ml', description: '1000mg tincture.', image: PREROLL_IMG },
  { id: 'cookies-clipper', name: 'Cookies DC Clipper', brand: 'Cookies', category: 'accessories', strain: '—', thc: '—', price: 8, weight: 'each', description: 'Cookies clipper.', image: img('ganjavores-products4 - Copy.jpg') },
  { id: 'dreamz-hat', name: 'DREAMZ Compound Hat', brand: 'DREAMZ COMPOUND', category: 'merch', strain: '—', thc: '—', price: 28, weight: 'each', description: 'House hat.', image: img('logo.jpg') },
]

export const PRODUCTS = RAW.map((p) => {
  let flowerTier = p.flowerTier
  if (p.category === 'flower' && !flowerTier) {
    flowerTier = p.price >= 60 ? 'exclusives' : p.price >= 50 ? 'top-shelf' : 'premium'
  }
  return { available: true, terps: p.terps || 'N/A', badge: p.badge || null, oldPrice: p.oldPrice || null, ...p, flowerTier }
})

export const BRANDS = [
  { name: 'DREAMZ COMPOUND', logo: '/images/logo.jpg', blurb: 'House flower, vapes, edibles, topicals.' },
  { name: 'Cookies', logo: img('Blueberry Banana by Cookies.jpg'), blurb: 'Premium flower and Fat Boy vapes.' },
  { name: 'Ganjavores', logo: img('ganjavores-store.jpg'), blurb: 'Green Crack and Sour Diesel.' },
  { name: 'Jeeter Juice', logo: img('Jeeter Juice - Ice Cream Banana (Indica)  - Disposable Straw Vape - 1G - Live Resin.jpg'), blurb: 'Live resin disposables.' },
  { name: 'Rythm', logo: img('OG Kush Breath by Rhythm.jpg'), blurb: 'London Poundcake and OGKB.' },
  { name: 'Trulieve', logo: img('Cultivar Collection by Trulieve - Bubble Gum Kush - Premium Whole Flower.jpg'), blurb: 'Cultivar Collection.' },
  { name: 'Cultivation Labs', logo: img('Jenny Kush by Cultivation Labs - Top Shelf Whole Flower.jpg'), blurb: 'Jenny Kush.' },
  { name: 'Jungle Boys', logo: img('Gelato 33 by Jungle Boys - Premium Flower.jpg'), blurb: 'Gelato 33.' },
  { name: 'BackpackBoyz', logo: img('BackPackBoyz Lemon & Cherriez disposable vape, 2g, All-In-One, Live Resin, Melted Diamonds.jpg'), blurb: 'Lemon & Cherriez AIO.' },
  { name: 'DeVour', logo: GUMMY_IMG, blurb: '1500mg sour gummies.' },
  { name: 'Sluggers', logo: PREROLL_IMG, blurb: '.5G branded 5-packs.' },
  { name: 'Jeeter', logo: PREROLL_IMG, blurb: 'Pre-roll jars.' },
]

export function filterProducts(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  let list = PRODUCTS
  let title = 'Shop'
  if (path === '/shop' || path === '/categories') return { list, title: 'All Products' }
  if (path.startsWith('/flower')) {
    list = PRODUCTS.filter((p) => p.category === 'flower')
    title = 'Flower'
    if (path.includes('/shake')) { list = list.filter((p) => p.flowerKind === 'shake'); title = 'Shake' }
    else if (path.includes('/small-buds')) { list = list.filter((p) => p.flowerKind === 'small-buds'); title = 'Small Buds' }
    else if (path.includes('/whole-flower') || /premium|top-shelf|exclusives/.test(path)) {
      list = list.filter((p) => p.flowerKind === 'whole-flower' || !p.flowerKind)
      title = 'Whole Flower'
    }
    if (path.includes('/premium')) { list = list.filter((p) => p.flowerTier === 'premium'); title = 'Premium Flower ($40–45 / ⅛)' }
    else if (path.includes('/top-shelf')) { list = list.filter((p) => p.flowerTier === 'top-shelf'); title = 'Top Shelf Flower ($50–55 / ⅛)' }
    else if (path.includes('/exclusives')) { list = list.filter((p) => p.flowerTier === 'exclusives' || p.price >= 60); title = 'Exclusives ($60+ / ⅛)' }
  } else if (path.startsWith('/vapes')) {
    list = PRODUCTS.filter((p) => p.category === 'vapes')
    title = 'Vapes'
    if (path.includes('/disposables')) { list = list.filter((p) => p.vapeKind === 'disposables'); title = 'Disposable Vapes' }
    else if (path.includes('/510')) { list = list.filter((p) => p.vapeKind === '510-cartridges'); title = '510 Thread Cartridges' }
  } else if (path.startsWith('/prerolls')) { list = PRODUCTS.filter((p) => p.category === 'prerolls'); title = 'Pre-Rolls' }
  else if (path.startsWith('/edibles')) { list = PRODUCTS.filter((p) => p.category === 'edibles'); title = 'Edibles' }
  else if (path.startsWith('/concentrates')) { list = PRODUCTS.filter((p) => p.category === 'concentrates'); title = 'Concentrates' }
  else if (path.startsWith('/tinctures')) { list = PRODUCTS.filter((p) => p.category === 'tinctures'); title = 'Tinctures' }
  else if (path.startsWith('/topicals')) { list = PRODUCTS.filter((p) => p.category === 'topicals'); title = 'Topicals' }
  else if (path.startsWith('/accessories')) { list = PRODUCTS.filter((p) => p.category === 'accessories'); title = 'Accessories' }
  else if (path.startsWith('/merch')) { list = PRODUCTS.filter((p) => p.category === 'merch' || p.category === 'accessories'); title = 'Merch & Accessories' }
  else if (path.startsWith('/brands/')) {
    const slug = decodeURIComponent(path.split('/brands/')[1] || '')
    list = PRODUCTS.filter((p) => p.brand.toLowerCase().replace(/\s+/g, '-') === slug)
    title = list[0]?.brand || 'Brand'
  }
  return { list, title }
}
