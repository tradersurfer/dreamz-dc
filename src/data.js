/**
 * DREAMZ DC shop catalog
 * Edit products in the category arrays below (FLOWER, VAPES, PREROLLS, ...).
 * Images live in public/images/ and are referenced as /images/filename.ext
 *
 * Fields the shop uses:
 *   id, name, brand, category, price, image, weight, strain, thc, terps,
 *   description, badge, oldPrice, available
 * Flower extra:   flowerKind = whole-flower | shake | small-buds
 *                 flowerTier is auto from price: premium $40-45, top-shelf $50-55, exclusives $60+
 * Vapes extra:    vapeKind = disposables | 510-cartridges
 * Pre-rolls extra: prerollKind = standard | premium | top-shelf | branded
 */

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

export const CATEGORIES = [
  { slug: 'flower', name: 'Flower', path: '/flower', image: '/images/categories/flower.jpg' },
  { slug: 'prerolls', name: 'Pre-Rolls', path: '/prerolls', image: '/images/categories/pre-rolls.jpg' },
  { slug: 'vapes', name: 'Vaporizers', path: '/vapes', image: '/images/categories/vapes.jpg' },
  { slug: 'edibles', name: 'Edibles', path: '/edibles', image: '/images/categories/edibles.jpg' },
  { slug: 'concentrates', name: 'Concentrates', path: '/concentrates', image: '/images/categories/concentrates.jpg' },
  { slug: 'topicals', name: 'Topicals', path: '/topicals', image: '/images/categories/products-topicals.webp' },
  { slug: 'tinctures', name: 'Tinctures', path: '/tinctures', image: '/images/categories/tinctures.jpg' },
  { slug: 'accessories', name: 'Accessories', path: '/accessories', image: '/images/categories/accessories.jpg' },
  { slug: 'merch', name: 'Merch', path: '/merch', image: '/images/categories/merch.jpg' },
]

/* ------------------------------------------------------------------ */
/*  FLOWER  — add / edit eighths here                                  */
/* ------------------------------------------------------------------ */
const FLOWER = [
  {
    id: 'dreamz-pink-rozay',
    name: 'Pink Rozay',
    brand: 'DREAMZ COMPOUND',
    category: 'flower',
    flowerKind: 'whole-flower',
    strain: 'Indica',
    thc: '21%',
    terps: '2.5%',
    price: 40,
    oldPrice: 47.56,
    badge: 'sale',
    weight: '3.5g',
    image: img('pink-rozay.jpg'),
    description: 'Pink Rozay is a potent indica bred by Cookies. Floral rose notes, heavy head high, body at ease. Frosty muted green and orange nugs.',
  },
  {
    id: 'ganjavores-green-crack',
    name: 'Green Crack',
    brand: 'Ganjavores',
    category: 'flower',
    flowerKind: 'whole-flower',
    strain: 'Sativa',
    thc: '24%',
    terps: '<1%',
    price: 45,
    weight: '3.5g',
    image: img('Green Crack by Ganjavores - Premium Flower.jpg'),
    description: 'Daytime sativa for focus and creative energy.',
  },
  {
    id: 'ganjavores-sour-diesel',
    name: 'Sour Diesel',
    brand: 'Ganjavores',
    category: 'flower',
    flowerKind: 'whole-flower',
    strain: 'Sativa',
    thc: '26%',
    terps: '<1%',
    price: 45,
    weight: '3.5g',
    image: img('Sour Diesel by Ganjavores - Hybrid - 3.5G Jars - Top Shelf Whole Flower.jpg'),
    description: 'East Coast legend with uplifting, energizing effects.',
  },
  {
    id: 'cookies-hollywood',
    name: 'Hollywood',
    brand: 'Cookies',
    category: 'flower',
    flowerKind: 'whole-flower',
    strain: 'Indica Hybrid',
    thc: '24.04%',
    terps: '1.08%',
    price: 49,
    weight: '3.5g',
    image: img('Code_Generated_Image (12).jpg'),
    description: 'Cookies Hollywood — premium indica-dominant flower.',
  },
  {
    id: 'cookies-black-cherry',
    name: 'Black Cherry Gelato',
    brand: 'Cookies',
    category: 'flower',
    flowerKind: 'whole-flower',
    strain: 'Hybrid',
    thc: '25.82%',
    terps: 'N/A',
    price: 54,
    weight: '3.5g',
    image: img('Black cherry gelato strain.png'),
    description: 'Acai x Gelato. Sweet cherry gelato hybrid.',
  },
  {
    id: 'sunflower-eclipse',
    name: 'Eclipse',
    brand: 'Sunflower By Eva',
    category: 'flower',
    flowerKind: 'whole-flower',
    strain: 'Hybrid',
    thc: '26%',
    price: 54,
    weight: '3.5g',
    image: img('Code_Generated_Image (15).jpg'),
    description: 'Sunflower By Eva Eclipse eighth.',
  },
  {
    id: 'sunflower-morning-bloom',
    name: 'Morning Bloom',
    brand: 'Sunflower By Eva',
    category: 'flower',
    flowerKind: 'whole-flower',
    strain: 'Sativa',
    thc: '25%',
    price: 54,
    weight: '3.5g',
    image: img('Code_Generated_Image (17).jpg'),
    description: 'Sunflower By Eva Morning Bloom eighth.',
  },
  {
    id: 'white-truffle',
    name: 'White Truffle',
    brand: 'Bargain Budd',
    category: 'flower',
    flowerKind: 'whole-flower',
    strain: 'Hybrid',
    thc: '24%',
    price: 54,
    weight: '3.5g',
    image: img('Code_Generated_Image (25).jpg'),
    description: 'Bargain Budd White Truffle eighth.',
  },
  {
    id: 'cultivar-collection',
    name: 'Cultivar Collection',
    brand: 'Trulieve',
    category: 'flower',
    flowerKind: 'whole-flower',
    strain: 'Hybrid',
    thc: '29%',
    price: 55,
    weight: '3.5g',
    image: img('Code_Generated_Image (16).jpg'),
    description: 'Trulieve Cultivar Collection whole flower.',
  },
  {
    id: 'cultivar-bubble-gum',
    name: 'Bubble Gum Kush',
    brand: 'Trulieve',
    category: 'flower',
    flowerKind: 'whole-flower',
    strain: 'Indica',
    thc: '25%',
    price: 55,
    weight: '3.5g',
    image: img('Cultivar Collection by Trulieve - Bubble Gum Kush - Premium Whole Flower.jpg'),
    description: 'Sweet berry kush from Cultivar Collection.',
  },
  {
    id: 'cookies-bat-shit',
    name: 'Bat Sh!t',
    brand: 'Cookies',
    category: 'flower',
    flowerKind: 'whole-flower',
    strain: 'Hybrid',
    thc: 'N/A',
    price: 58,
    weight: '3.5g',
    image: img('bat-shit-cookies-strain.png'),
    description: 'Cookies Bat Sh!t — gassy hybrid.',
  },
  {
    id: 'jenny-kush',
    name: 'Jenny Kush',
    brand: 'Cultivation Labs',
    category: 'flower',
    flowerKind: 'whole-flower',
    strain: 'Hybrid',
    thc: '32%',
    terps: '<1%',
    price: 58,
    badge: 'new',
    weight: '3.5g',
    image: img('Jenny Kush by Cultivation Labs - Top Shelf Whole Flower.jpg'),
    description: 'Amnesia Haze x Rare Dankness #2. High-THC hybrid.',
  },
  {
    id: 'gary-payton-flower',
    name: 'Gary Payton',
    brand: 'Cookies',
    category: 'flower',
    flowerKind: 'whole-flower',
    strain: 'Hybrid',
    thc: '27%',
    price: 58,
    weight: '3.5g',
    image: img('Gary Payton by Cookies -Premium Whole Flower.jpg'),
    description: 'Gassy Cookies hybrid eighth.',
  },
  {
    id: 'cookies-blueberry-banana',
    name: 'Blueberry Banana 7g',
    brand: 'Cookies',
    category: 'flower',
    flowerKind: 'whole-flower',
    strain: 'Indica-Dominant Hybrid',
    thc: '21.47%',
    terps: '2.26%',
    price: 69.99,
    oldPrice: 80,
    badge: 'sale',
    weight: '7g',
    image: img('Blueberry Banana by Cookies.jpg'),
    description: 'Ripe blueberry and banana. Calming, happy, appetite-stimulating. 7g pre-pack.',
  },
  {
    id: 'house-shake-7g',
    name: 'House Shake 7g',
    brand: 'DREAMZ COMPOUND',
    category: 'flower',
    flowerKind: 'shake',
    strain: 'Hybrid',
    thc: '20%',
    price: 40,
    weight: '7g',
    image: img('bulk-flower.jpg'),
    description: 'Value shake for rolling.',
  },
  {
    id: 'small-buds-eighth',
    name: 'Small Buds 3.5g',
    brand: 'DREAMZ COMPOUND',
    category: 'flower',
    flowerKind: 'small-buds',
    strain: 'Hybrid',
    thc: '23%',
    price: 42,
    weight: '3.5g',
    image: img('pink-rozay.jpg'),
    description: 'Small buds eighth.',
  },
]

/* ------------------------------------------------------------------ */
/*  VAPES                                                              */
/* ------------------------------------------------------------------ */
const VAPES = [
  {
    id: 'raw-garden-strawberry-shortcake',
    name: 'Strawberry Short Cake Live Resin Cart 1G',
    brand: 'Raw Garden',
    category: 'vapes',
    vapeKind: '510-cartridges',
    strain: 'Hybrid',
    thc: '86.77%+',
    price: 59.99,
    weight: '1g',
    image: img('raw-garden-1g-cart-strawberry-shortcake.jpg'),
    description: '100% cannabis refined live resin. No additives. Cryogenically flash-frozen source flower.',
  },
  {
    id: 'dreamz-vape-cartridge',
    name: 'Friendly Farms Live Resin 510 Cart 1g',
    brand: 'Friendly Farms',
    category: 'vapes',
    vapeKind: 'disposables',
    strain: 'Indica-Dominant Hybrid',
    thc: '80-86%',
    terps: '2.9%',
    price: 60,
    badge: 'featured',
    weight: '1g',
    image: img('friendly-farms-disposable-vape.jpg'),
    description: 'Original Z collab. 100% cured/live resin. Blueberry x Zkittlez. Myrcene, caryophyllene, pinene.',
  },
  {
    id: 'backpackboyz',
    name: 'Lemon & Cherriez 2G AIO',
    brand: 'BackpackBoyz',
    category: 'vapes',
    vapeKind: 'disposables',
    strain: 'Hybrid',
    thc: '~85%',
    price: 60,
    weight: '2g',
    image: img('BackPackBoyz Lemon & Cherriez disposable vape, 2g, All-In-One, Live Resin, Melted Diamonds.jpg'),
    description: 'All-in-one live resin disposable.',
  },
  {
    id: 'muha-apple-gelato',
    name: 'Apple Gelato 1G Cart',
    brand: 'Muha Meds',
    category: 'vapes',
    vapeKind: '510-cartridges',
    strain: 'Hybrid',
    thc: '~80%',
    price: 60,
    weight: '1g',
    image: img('muha-meds-cherry-grapefruit-1g-disposable-cart-sativa.jpg'),
    description: 'Muha Meds 1G cartridge.',
  },
  {
    id: 'jeeter-ice-cream-cake',
    name: 'Ice Cream Cake Disposable',
    brand: 'Jeeter Juice',
    category: 'vapes',
    vapeKind: 'disposables',
    strain: 'Indica',
    thc: '~82-88%',
    price: 65,
    weight: '1g',
    image: img('Jeeter Juice - Ice Cream Cake (Indica) 500mg- Disposable Straw Vape - 1G - Live Resin.jpg'),
    description: 'Live resin disposable straw. Wedding Cake x Gelato #33.',
  },
  {
    id: 'jeeter-wedding-cake',
    name: 'Wedding Cake Disposable',
    brand: 'Jeeter Juice',
    category: 'vapes',
    vapeKind: 'disposables',
    strain: 'Hybrid',
    thc: '~83-88%',
    price: 65,
    weight: '1g',
    image: img('Jeeter Juice - Wedding Cake (Hybrid) - Disposable Straw Vape - 1G - Live Resin.jpg'),
    description: 'Live resin disposable straw. Triangle Kush x Animal Mints.',
  },
  {
    id: 'jeeter-papaya',
    name: 'Papaya #5 Disposable',
    brand: 'Jeeter Juice',
    category: 'vapes',
    vapeKind: 'disposables',
    strain: 'Indica',
    thc: '~80-86%',
    price: 65,
    weight: '1g',
    image: img('Jeeter Juice - Papaya (Indica)- Disposable Straw Vape - 1G - Live Resin.jpg'),
    description: 'Papaya pheno #5 live resin disposable.',
  },
  {
    id: 'jeeter-ice-cream-banana',
    name: 'Ice Cream Banana Disposable',
    brand: 'Jeeter Juice',
    category: 'vapes',
    vapeKind: 'disposables',
    strain: 'Indica',
    thc: '~82-88%',
    price: 65,
    weight: '1g',
    image: img('Jeeter Juice - Ice Cream Banana (Indica)  - Disposable Straw Vape - 1G - Live Resin.jpg'),
    description: 'Ice Cream Cake x Banana OG live resin disposable.',
  },
  {
    id: 'gary-payton-vape',
    name: 'Gary Payton 2G Fat Boy',
    brand: 'Cookies',
    category: 'vapes',
    vapeKind: 'disposables',
    strain: 'Hybrid',
    thc: '80%+',
    price: 70,
    weight: '2g',
    image: img('Gary Payton 2G Fat Boy Vape by Cookies.jpg'),
    description: 'Cookies Fat Boy disposable.',
  },
  {
    id: 'cookies-berniehana',
    name: 'BernieHana Butter 1G Cart',
    brand: 'Cookies',
    category: 'vapes',
    vapeKind: '510-cartridges',
    strain: 'Indica',
    thc: '76.58%',
    terps: '2.91%',
    price: 72,
    badge: 'featured',
    weight: '1g',
    image: img('cookies-cartridge-berniehana-butter-1g.jpg'),
    description: '(Jetfuel Gelato x Guava) x (Blue Cookies x Oreoz). Buttery jasmine florals with berry gas.',
  },
]

/* ------------------------------------------------------------------ */
/*  PRE-ROLLS                                                          */
/* ------------------------------------------------------------------ */
const PREROLLS = [
  {
    id: 'dreamz-pre-rolls',
    name: 'House 1G Pre-Roll',
    brand: 'DREAMZ COMPOUND',
    category: 'prerolls',
    prerollKind: 'standard',
    strain: 'Hybrid',
    thc: '24%',
    price: 18,
    weight: '1g',
    image: img('pre-rolls-house.png'),
    description: 'House pre-roll.',
  },
  {
    id: 'premium-preroll-1g',
    name: 'Premium 1G Pre-Roll',
    brand: 'DREAMZ COMPOUND',
    category: 'prerolls',
    prerollKind: 'premium',
    strain: 'Hybrid',
    thc: '24%',
    price: 10,
    weight: '1g',
    image: img('Ganjavores-house-Prerolls.png'),
    description: 'Single premium 1G pre-roll.',
  },
  {
    id: 'topshelf-preroll-1g',
    name: 'Top-Shelf 1G Pre-Roll',
    brand: 'DREAMZ COMPOUND',
    category: 'prerolls',
    prerollKind: 'top-shelf',
    strain: 'Hybrid',
    thc: '28%',
    price: 15,
    weight: '1g',
    image: img('Ganjavores-house-Prerolls.png'),
    description: 'Single top-shelf 1G pre-roll.',
  },
  {
    id: 'premium-preroll-5pk',
    name: 'Premium 1G Pre-Roll 5-pack',
    brand: 'DREAMZ COMPOUND',
    category: 'prerolls',
    prerollKind: 'premium',
    strain: 'Hybrid',
    thc: '24%',
    price: 45,
    weight: '5x1g',
    image: img('Ganjavores-house-Prerolls.png'),
    description: 'Five premium 1G pre-rolls.',
  },
  {
    id: 'topshelf-preroll-5pk',
    name: 'Top-Shelf 1G Pre-Roll 5-pack',
    brand: 'DREAMZ COMPOUND',
    category: 'prerolls',
    prerollKind: 'top-shelf',
    strain: 'Hybrid',
    thc: '28%',
    price: 70,
    weight: '5x1g',
    image: img('Ganjavores-house-Prerolls.png'),
    description: 'Five top-shelf 1G pre-rolls.',
  },
  {
    id: 'kingsize-2g',
    name: 'King Size 2G Pre-Roll',
    brand: 'DREAMZ COMPOUND',
    category: 'prerolls',
    prerollKind: 'standard',
    strain: 'Hybrid',
    thc: '25%',
    price: 18,
    weight: '2g',
    image: img('pre-rolls-house.png'),
    description: 'King size 2G pre-roll.',
  },
  {
    id: 'cookies-madrina',
    name: 'Madrina .5G 10-pack',
    brand: 'Cookies',
    category: 'prerolls',
    prerollKind: 'branded',
    strain: 'Sativa',
    thc: '27.16%',
    terps: '2.90%',
    price: 59.99,
    oldPrice: 65.2,
    badge: 'sale',
    weight: '10 x 0.5g',
    image: img('cookies-brand-logo.jpg'),
    description: 'Cookies Madrina sativa pre-rolls. 10-pack, 5g total.',
  },
  {
    id: 'jeeter-jar-5pk',
    name: 'Jeeter .5G 5-pack Jar',
    brand: 'Jeeter',
    category: 'prerolls',
    prerollKind: 'branded',
    strain: 'Hybrid',
    thc: '26%',
    price: 48,
    weight: '5x0.5g',
    image: img('Baby Jeeter prerolls variety.jpeg'),
    description: 'Jeeter preroll jar.',
  },
  {
    id: 'sluggers-5pk',
    name: 'Sluggers .5G 5-pack',
    brand: 'Sluggers',
    category: 'prerolls',
    prerollKind: 'branded',
    strain: 'Hybrid',
    thc: '22%',
    price: 40,
    badge: 'new',
    weight: '5x0.5g',
    image: img('pre-rolls-house.png'),
    description: 'Sluggers .5G 5-pack.',
  },
]

/* ------------------------------------------------------------------ */
/*  EDIBLES                                                            */
/* ------------------------------------------------------------------ */
const EDIBLES = [
  {
    id: 'skittlez-gummies-600mg',
    name: 'SKITTLEZ Tropical 600mg',
    brand: 'SKITTLEZ',
    category: 'edibles',
    strain: 'Hybrid',
    thc: '600mg',
    price: 35,
    oldPrice: 40,
    badge: 'sale',
    weight: '600mg',
    image: img('SKITTLEZ-Tropical -flovor-medicated-edible-hard-candy-600mg.webp'),
    description: '12-piece tropical hard candy. Effects in 30–60 minutes. 600mg THC.',
  },
  {
    id: 'muha-purple-punch',
    name: 'Muha Meds Gummies 1000mg',
    brand: 'Muha Meds',
    category: 'edibles',
    strain: 'Indica',
    thc: '1000mg',
    price: 60,
    weight: '1000mg',
    image: img('Faded Fruits Purple Drank Medicated Gummies (1000mg).jpg'),
    description: '1000mg Muha Meds gummies.',
  },
  {
    id: 'faded-blue-slush',
    name: 'Blue Slush Gummies 1000mg',
    brand: 'Faded Fruits',
    category: 'edibles',
    strain: 'Hybrid',
    thc: '1000mg',
    price: 55,
    weight: '1000mg',
    image: img('Faded Fruits Blue Slush Medicated Gummies (1000mg).jpg'),
    description: 'Faded Fruits Blue Slush 1000mg.',
  },
  {
    id: 'faded-lime-diesel',
    name: 'Lime Diesel Gummies 1000mg',
    brand: 'Faded Fruits',
    category: 'edibles',
    strain: 'Sativa',
    thc: '1000mg',
    price: 55,
    weight: '1000mg',
    image: img('Faded Fruits Lime Diesel Medicated Gummies (1000mg).jpg'),
    description: 'Faded Fruits Lime Diesel 1000mg.',
  },
  {
    id: 'faded-orange-sherbet',
    name: 'Orange Sherbet Gummies 1000mg',
    brand: 'Faded Fruits',
    category: 'edibles',
    strain: 'Hybrid',
    thc: '1000mg',
    price: 55,
    weight: '1000mg',
    image: img('Faded Fruits Orange Sherbet Medicated Gummies (1000mg).jpg'),
    description: 'Faded Fruits Orange Sherbet 1000mg.',
  },
  {
    id: 'faded-purple-drank',
    name: 'Purple Drank Gummies 1000mg',
    brand: 'Faded Fruits',
    category: 'edibles',
    strain: 'Indica',
    thc: '1000mg',
    price: 55,
    weight: '1000mg',
    image: img('Faded Fruits Purple Drank Medicated Gummies (1000mg).jpg'),
    description: 'Faded Fruits Purple Drank 1000mg.',
  },
]

/* ------------------------------------------------------------------ */
/*  CONCENTRATES / TOPICALS / TINCTURES / ACCESSORIES / MERCH          */
/* ------------------------------------------------------------------ */
const CONCENTRATES = [
  {
    id: 'live-rosin-soil',
    name: 'Live Rosin Soil Grown',
    brand: 'DREAMZ COMPOUND',
    category: 'concentrates',
    strain: 'Hybrid',
    thc: '70%+',
    price: 72,
    weight: '1g',
    image: img('Live Rosin soil Grown 28oz.jpg'),
    description: 'Soil-grown live rosin.',
  },
  {
    id: 'stellar-moonrocks',
    name: 'Stellar Moonrocks Variety Jar',
    brand: 'DREAMZ COMPOUND',
    category: 'concentrates',
    strain: 'Hybrid',
    thc: 'N/A',
    price: 80,
    badge: 'new',
    weight: 'jar',
    image: img('Stellar Moonrocks Variety Jars.JPG'),
    description: 'Moonrock variety jar.',
  },
]

const TOPICALS = [
  {
    id: 'dreamz-topicals',
    name: 'DREAMZ Relief Balm',
    brand: 'DREAMZ COMPOUND',
    category: 'topicals',
    strain: 'Balanced',
    thc: '<1%',
    price: 35,
    weight: '2oz',
    image: img('categories/products-topicals.webp'),
    description: 'House relief balm.',
  },
]

const TINCTURES = [
  {
    id: 'dreamz-tincture',
    name: 'DREAMZ Tincture 1000mg',
    brand: 'DREAMZ COMPOUND',
    category: 'tinctures',
    strain: 'Hybrid',
    thc: '1000mg',
    price: 55,
    weight: '30ml',
    image: img('categories/tinctures.jpg'),
    description: '1000mg tincture.',
  },
]

const ACCESSORIES = [
  {
    id: 'cookies-clipper',
    name: 'Cookies DC Clipper',
    brand: 'Cookies',
    category: 'accessories',
    strain: '—',
    thc: '—',
    price: 3,
    weight: 'each',
    image: img('cookies-brand-logo.jpg'),
    description: 'Cookies clipper.',
  },
]

const MERCH = [
  {
    id: 'dreamz-hat',
    name: 'DREAMZ Compound Hat',
    brand: 'DREAMZ COMPOUND',
    category: 'merch',
    strain: '—',
    thc: '—',
    price: 28,
    weight: 'each',
    image: img('logo.jpg'),
    description: 'House hat.',
  },
]

/* Combine. To add a product, put it in the right array above. */
const RAW = [
  ...FLOWER,
  ...VAPES,
  ...PREROLLS,
  ...EDIBLES,
  ...CONCENTRATES,
  ...TOPICALS,
  ...TINCTURES,
  ...ACCESSORIES,
  ...MERCH,
]

export const PRODUCTS = RAW.map((p) => {
  let flowerTier = p.flowerTier
  if (p.category === 'flower' && !flowerTier) {
    flowerTier = p.price >= 60 ? 'exclusives' : p.price >= 50 ? 'top-shelf' : 'premium'
  }
  return {
    available: true,
    terps: p.terps || 'N/A',
    badge: p.badge || null,
    oldPrice: p.oldPrice || null,
    ...p,
    flowerTier,
  }
})

/* ------------------------------------------------------------------ */
/*  BRANDS — logo files live in public/images/                         */
/* ------------------------------------------------------------------ */
export const BRANDS = [
  { name: 'DREAMZ COMPOUND', logo: '/images/logo.jpg', blurb: 'House flower, vapes, edibles, topicals.' },
  { name: 'Cookies', logo: img('cookies-brand-logo.jpg'), blurb: 'Flower, Fat Boy vapes, Madrina pre-rolls.' },
  { name: 'Ganjavores', logo: img('ganjavores-dispensary-brand-logo.jpg'), blurb: 'Green Crack and Sour Diesel.' },
  { name: 'Jeeter Juice', logo: img('jeeter-juice-brand-logo.jpg'), blurb: 'Live resin disposables.' },
  { name: 'Jeeter', logo: img('Baby Jeeter prerolls variety.jpeg'), blurb: 'Pre-roll jars.' },
  { name: 'Friendly Farms', logo: img('friendly-farms-brand-logo.png'), blurb: 'Live resin carts.' },
  { name: 'Raw Garden', logo: img('raw-garden-1g-cart-strawberry-shortcake.jpg'), blurb: 'Refined live resin 510s.' },
  { name: 'Trulieve', logo: img('trulieve-brand-logo.png'), blurb: 'Cultivar Collection.' },
  { name: 'Cultivation Labs', logo: img('cultivation-labs-brand-logo.avif'), blurb: 'Jenny Kush.' },
  { name: 'BackpackBoyz', logo: img('BackPackBoyz Lemon & Cherriez disposable vape, 2g, All-In-One, Live Resin, Melted Diamonds.jpg'), blurb: 'Lemon & Cherriez AIO.' },
  { name: 'Muha Meds', logo: img('muhameds-crest-brand-logo.webp'), blurb: 'Carts and gummies.' },
  { name: 'Bargain Budd', logo: img('bargainbudd-logo.jpg'), blurb: 'Value eighths.' },
  { name: 'SKITTLEZ', logo: img('SKITTLEZ-Tropical -flovor-medicated-edible-hard-candy-600mg.webp'), blurb: '600mg tropical candy.' },
  { name: 'Faded Fruits', logo: img('Faded Fruits Purple Drank Medicated Gummies (1000mg).jpg'), blurb: '1000mg gummies.' },
  { name: 'Sunflower By Eva', logo: img('Code_Generated_Image (15).jpg'), blurb: 'Eclipse and Morning Bloom.' },
  { name: 'Sluggers', logo: img('pre-rolls-house.png'), blurb: '.5G branded 5-packs.' },
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
