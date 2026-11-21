export type ProductCategory = 'ice-cream' | 'popcorn';

export type CurrencyCode = 'TZS' | 'KES';

export interface ProductVariant {
  id: string;
  label: string;
  detail: string;
  priceTzs: number;
  priceKes: number;
}

export interface ProductItem {
  id: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  tag?: string;
  badgeColor?: 'amber' | 'red' | 'navy';
  featured?: boolean;
  description: string;
  tastingNotes: string[];
  image: string;
  variants: ProductVariant[];
}

export interface ExperienceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  image: string;
  ctaLabel: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  caption: string;
  category: 'Ice Cream' | 'Popcorn' | 'Craft' | 'Events';
  span?: 'wide' | 'tall' | 'standard';
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  occasion: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Editable Brand Configuration — update WhatsApp, phone, email, and address here.
 */
export const BRAND_CONFIG = {
  name: 'Crest Food & Beverage',
  shortName: 'Crest Foods',
  tagline: 'Artisan Ice Cream & Loaded Gourmet Popcorn',
  greeting: 'Karibu Crest',
  whatsappNumber: '255700000000', // Replace with your active WhatsApp number (international format, no +)
  phoneDisplay: '+255 700 000 000',
  email: 'hello@crestfoods.co.tz',
  instagram: '@crestfoodandbeverage',
  location: 'Dar es Salaam & Arusha, East Africa',
  parlourAddress: 'Crest Tasting Parlour — Masaki Peninsula, Dar es Salaam',
  hours: 'Daily · 10:00 AM – 10:00 PM',
  deliveryNote:
    'Chilled insulated delivery within 45 mins for city orders · Freshly assembled Loaded Popcorn Canoes to order.',
};

export const PRODUCTS: ProductItem[] = [
  // ==================== ARTISAN ICE CREAM ====================
  {
    id: 'ic-crest-swirl',
    name: 'Crest Signature Swirl',
    subtitle: 'Velvety Vanilla Bean & Sunlit Mango Ribbon',
    category: 'ice-cream',
    tag: 'House Signature',
    badgeColor: 'red',
    featured: true,
    description:
      'Our namesake soft-serve swirl inspired by the Crest emblem — silky Madagascar vanilla bean folded live with bright coastal mango cream inside a hand-rolled golden waffle cone.',
    tastingNotes: ['Madagascar Vanilla', 'Ripe Mango', 'Crisp Waffle'],
    image: '/images/swirl-cone.jpg',
    variants: [
      { id: 'cone', label: 'Artisan Waffle Cone', detail: 'Freshly baked warm cone', priceTzs: 6500, priceKes: 350 },
      { id: 'cup', label: 'Parlour Cup (2 Scoops)', detail: 'Served chilled with waffle shard', priceTzs: 8500, priceKes: 450 },
      { id: 'tub-500', label: '500ml Take-Home Tub', detail: 'Serves 3–4 · Insulated pack', priceTzs: 18000, priceKes: 950 },
      { id: 'tub-1l', label: '1L Family Reserve Tub', detail: 'Serves 6–8 · Party ready', priceTzs: 32000, priceKes: 1700 },
    ],
  },
  {
    id: 'ic-vanilla-bean',
    name: 'Kilimanjaro Vanilla Bean',
    subtitle: 'Slow-Steeped Whole Pod Cream',
    category: 'ice-cream',
    tag: 'Timeless Classic',
    badgeColor: 'amber',
    featured: true,
    description:
      'Fresh highland dairy slow-steeped overnight with split whole vanilla pods for a floral, golden-flecked scoop with an impossibly smooth finish.',
    tastingNotes: ['Whole Vanilla Pod', 'Fresh Cream', 'Honeyed Finish'],
    image: '/images/ice-cream-collection.jpg',
    variants: [
      { id: 'cone', label: 'Artisan Waffle Cone', detail: 'Single tall swirl or scoop', priceTzs: 6000, priceKes: 320 },
      { id: 'cup', label: 'Parlour Cup (2 Scoops)', detail: 'Chilled stoneware serving', priceTzs: 8000, priceKes: 420 },
      { id: 'tub-500', label: '500ml Take-Home Tub', detail: 'Serves 3–4', priceTzs: 17000, priceKes: 900 },
      { id: 'tub-1l', label: '1L Family Reserve Tub', detail: 'Serves 6–8', priceTzs: 30000, priceKes: 1600 },
    ],
  },
  {
    id: 'ic-dark-cocoa',
    name: 'Velvet Dark Cocoa',
    subtitle: 'Single-Origin Chocolate Churn',
    category: 'ice-cream',
    tag: 'Rich & Bold',
    badgeColor: 'navy',
    featured: true,
    description:
      'Deep, fudge-like dark chocolate churned slow from single-origin cocoa liquor and roasted cacao nibs — intensely aromatic without overwhelming sweetness.',
    tastingNotes: ['Dark Cocoa', 'Roasted Nibs', 'Silky Ganache'],
    image: '/images/hero-crest.jpg',
    variants: [
      { id: 'cone', label: 'Artisan Waffle Cone', detail: 'Dipped chocolate rim', priceTzs: 7000, priceKes: 370 },
      { id: 'cup', label: 'Parlour Cup (2 Scoops)', detail: 'Topped with cocoa dust', priceTzs: 9000, priceKes: 480 },
      { id: 'tub-500', label: '500ml Take-Home Tub', detail: 'Serves 3–4', priceTzs: 19500, priceKes: 1050 },
      { id: 'tub-1l', label: '1L Family Reserve Tub', detail: 'Serves 6–8', priceTzs: 35000, priceKes: 1850 },
    ],
  },
  {
    id: 'ic-mango-passion',
    name: 'Zanzibar Mango & Passion',
    subtitle: 'Sun-Ripened Tropical Sorbetto',
    category: 'ice-cream',
    tag: 'Dairy-Free',
    badgeColor: 'amber',
    featured: false,
    description:
      'Pressed ripe orchard mangoes balanced with tangy passionfruit nectar for a vibrant, sunlit dairy-free sorbetto that tastes like pure East African summer.',
    tastingNotes: ['Alphonso Mango', 'Tangy Passionfruit', 'Refreshing'],
    image: '/images/takehome-tubs.jpg',
    variants: [
      { id: 'cone', label: 'Artisan Waffle Cone', detail: 'Crisp vegan waffle', priceTzs: 6000, priceKes: 320 },
      { id: 'cup', label: 'Parlour Cup (2 Scoops)', detail: 'Garnished with passion drizzle', priceTzs: 8000, priceKes: 420 },
      { id: 'tub-500', label: '500ml Take-Home Tub', detail: 'Serves 3–4', priceTzs: 17500, priceKes: 920 },
      { id: 'tub-1l', label: '1L Family Reserve Tub', detail: 'Serves 6–8', priceTzs: 31000, priceKes: 1650 },
    ],
  },
  {
    id: 'ic-salted-caramel',
    name: 'Copper-Pot Salted Caramel',
    subtitle: 'Burnt Sugar Swirl & Sea Salt Flakes',
    category: 'ice-cream',
    tag: 'Bestseller',
    badgeColor: 'red',
    featured: false,
    description:
      'Amber sugar caramelized to the edge of smoky perfection in copper kettles, folded into sweet cream and finished with delicate Indian Ocean sea salt crystals.',
    tastingNotes: ['Amber Caramel', 'Ocean Sea Salt', 'Toasted Praline'],
    image: '/images/craft-kitchen.jpg',
    variants: [
      { id: 'cone', label: 'Artisan Waffle Cone', detail: 'With warm caramel drizzle', priceTzs: 7000, priceKes: 370 },
      { id: 'cup', label: 'Parlour Cup (2 Scoops)', detail: 'With praline crumble', priceTzs: 9000, priceKes: 480 },
      { id: 'tub-500', label: '500ml Take-Home Tub', detail: 'Serves 3–4', priceTzs: 19500, priceKes: 1050 },
      { id: 'tub-1l', label: '1L Family Reserve Tub', detail: 'Serves 6–8', priceTzs: 35000, priceKes: 1850 },
    ],
  },
  {
    id: 'ic-berry-cream',
    name: 'Highland Strawberry Cream',
    subtitle: 'Roasted Berry Compote & Whipped Cream',
    category: 'ice-cream',
    tag: 'Seasonal',
    badgeColor: 'amber',
    featured: false,
    description:
      'Hand-picked highland strawberries gently macerated with cane sugar and ribboned through our signature sweet cream base for bright, natural berry notes.',
    tastingNotes: ['Ripe Strawberry', 'Sweet Cream', 'Velvet Swirl'],
    image: '/images/ice-cream-collection.jpg',
    variants: [
      { id: 'cone', label: 'Artisan Waffle Cone', detail: 'Freshly baked waffle', priceTzs: 6500, priceKes: 350 },
      { id: 'cup', label: 'Parlour Cup (2 Scoops)', detail: 'With berry coulis', priceTzs: 8500, priceKes: 450 },
      { id: 'tub-500', label: '500ml Take-Home Tub', detail: 'Serves 3–4', priceTzs: 18000, priceKes: 950 },
      { id: 'tub-1l', label: '1L Family Reserve Tub', detail: 'Serves 6–8', priceTzs: 32000, priceKes: 1700 },
    ],
  },

  // ==================== LOADED GOURMET POPCORN & POPCORN CANOES ====================
  {
    id: 'pc-cookies-cream',
    name: 'Cookies & Cream Loaded Canoe',
    subtitle: 'White Chocolate Drizzle · Dark Oreo Crumble & Chunks',
    category: 'popcorn',
    tag: 'Signature Canoe',
    badgeColor: 'red',
    featured: true,
    description:
      'Our viral showstopper: crisp gourmet popcorn drenched in creamy white chocolate ribbons, tumbled with crushed dark chocolate sandwich cookies, whole mini cookies, and chunky cookies-and-cream chocolate squares.',
    tastingNotes: ['White Chocolate Drizzle', 'Dark Cookie Crumble', 'Cookies & Creme Bar'],
    image: '/images/popcorn-cookies-cream.jpg',
    variants: [
      { id: 'pouch', label: 'Loaded Treat Pouch (150g)', detail: 'Resealable individual pack', priceTzs: 6500, priceKes: 350 },
      { id: 'box', label: 'Sharing Dessert Box (320g)', detail: 'Movie night favorite · Serves 2–3', priceTzs: 14000, priceKes: 740 },
      { id: 'canoe', label: 'Signature Popcorn Canoe (650g)', detail: 'Iconic loaded serving canoe · Serves 6–8', priceTzs: 29000, priceKes: 1550 },
      { id: 'trio', label: 'Party Canoe Platter (1.5kg)', detail: 'Grand celebration canoe · Serves 14–18', priceTzs: 58000, priceKes: 3050 },
    ],
  },
  {
    id: 'pc-strawberry-shortcake',
    name: 'Strawberry Shortcake Loaded Canoe',
    subtitle: 'Ruby Berry Glaze · Shortcake Crumble & Pink Creme Kisses',
    category: 'popcorn',
    tag: 'Bestseller',
    badgeColor: 'red',
    featured: true,
    description:
      'Vibrant ruby-pink strawberry-glazed popcorn woven with silky white chocolate drizzle, toasted strawberry shortcake crumble, golden vanilla sandwich cookie halves, and blush-pink strawberry creme chocolate kisses.',
    tastingNotes: ['Ruby Strawberry Glaze', 'Shortcake Crumble', 'Golden Cookies & Kisses'],
    image: '/images/popcorn-strawberry-shortcake.jpg',
    variants: [
      { id: 'pouch', label: 'Loaded Treat Pouch (150g)', detail: 'Resealable individual pack', priceTzs: 6500, priceKes: 350 },
      { id: 'box', label: 'Sharing Dessert Box (320g)', detail: 'Lush sharing box · Serves 2–3', priceTzs: 14000, priceKes: 740 },
      { id: 'canoe', label: 'Signature Popcorn Canoe (650g)', detail: 'Iconic loaded serving canoe · Serves 6–8', priceTzs: 29000, priceKes: 1550 },
      { id: 'trio', label: 'Party Canoe Platter (1.5kg)', detail: 'Grand celebration canoe · Serves 14–18', priceTzs: 58000, priceKes: 3050 },
    ],
  },
  {
    id: 'pc-birthday-cake',
    name: 'Birthday Cake Confetti Canoe',
    subtitle: 'Vanilla Cake Glaze · Rainbow Sprinkles & Golden Cookies',
    category: 'popcorn',
    tag: 'Party Favorite',
    badgeColor: 'amber',
    featured: true,
    description:
      'Pure celebration in every handful — fluffy golden cake-batter popcorn lacquered in creamy white chocolate drizzle, festive rainbow sprinkles, golden vanilla cookie pieces, and birthday-cake chocolate drops.',
    tastingNotes: ['Vanilla Cake Batter', 'Rainbow Sprinkles', 'Golden Cookie Pieces'],
    image: '/images/popcorn-birthday-cake.jpg',
    variants: [
      { id: 'pouch', label: 'Loaded Treat Pouch (150g)', detail: 'Resealable individual pack', priceTzs: 6500, priceKes: 350 },
      { id: 'box', label: 'Sharing Dessert Box (320g)', detail: 'Celebration box · Serves 2–3', priceTzs: 14000, priceKes: 740 },
      { id: 'canoe', label: 'Signature Popcorn Canoe (650g)', detail: 'Iconic loaded serving canoe · Serves 6–8', priceTzs: 29000, priceKes: 1550 },
      { id: 'trio', label: 'Party Canoe Platter (1.5kg)', detail: 'Grand celebration canoe · Serves 14–18', priceTzs: 58000, priceKes: 3050 },
    ],
  },
  {
    id: 'pc-salted-caramel',
    name: 'Golden Salted Caramel Crunch',
    subtitle: 'Small-Batch Copper Kettle Amber Glaze',
    category: 'popcorn',
    tag: 'Kettle Classic',
    badgeColor: 'amber',
    featured: false,
    description:
      'Jumbo mushroom kernels air-popped crisp and hand-tumbled in warm browned-butter amber caramel with delicate sea-salt crystals — glossy, shatter-crisp, and deeply aromatic.',
    tastingNotes: ['Browned Butter', 'Amber Caramel', 'Shatter Crisp'],
    image: '/images/popcorn-detail.jpg',
    variants: [
      { id: 'pouch', label: 'Artisan Snack Pouch (140g)', detail: 'Resealable freshness pack', priceTzs: 5000, priceKes: 260 },
      { id: 'box', label: 'Sharing Dessert Box (300g)', detail: 'Classic sharing box', priceTzs: 11500, priceKes: 600 },
      { id: 'canoe', label: 'Signature Popcorn Canoe (650g)', detail: 'Loaded kettle canoe · Serves 6–8', priceTzs: 25000, priceKes: 1320 },
      { id: 'trio', label: 'Party Canoe Platter (1.5kg)', detail: 'Celebration size · Serves 14–18', priceTzs: 48000, priceKes: 2550 },
    ],
  },
  {
    id: 'pc-zebra-chocolate',
    name: 'Zebra Dark & Ivory Chocolate',
    subtitle: 'Caramel Core Ribboned in Dual Couverture',
    category: 'popcorn',
    tag: 'Indulgent',
    badgeColor: 'navy',
    featured: false,
    description:
      'Our signature golden salted caramel popcorn generously hand-ribboned in both rich dark chocolate and creamy ivory white chocolate, chilled crisp for pure decadence.',
    tastingNotes: ['Dark Chocolate', 'Ivory Drizzle', 'Caramel Crunch'],
    image: '/images/popcorn-collection.jpg',
    variants: [
      { id: 'pouch', label: 'Loaded Treat Pouch (150g)', detail: 'Chilled freshness pack', priceTzs: 6000, priceKes: 320 },
      { id: 'box', label: 'Sharing Dessert Box (320g)', detail: 'Luxury sharing box', priceTzs: 13500, priceKes: 710 },
      { id: 'canoe', label: 'Signature Popcorn Canoe (650g)', detail: 'Serving canoe · Serves 6–8', priceTzs: 28000, priceKes: 1480 },
      { id: 'trio', label: 'Party Canoe Platter (1.5kg)', detail: 'Grand celebration canoe', priceTzs: 54000, priceKes: 2850 },
    ],
  },
  {
    id: 'pc-savory-duo',
    name: 'Cinema Butter & Aged Cheddar',
    subtitle: 'Clarified Cultured Butter & Sharp Cheddar Crunch',
    category: 'popcorn',
    tag: 'Savory Balance',
    badgeColor: 'navy',
    featured: false,
    description:
      'The ideal savory companion to our sweet loaded canoes — light butterfly popcorn misted with golden clarified butter and bold sharp cheddar seasoning.',
    tastingNotes: ['Cultured Butter', 'Aged Cheddar', 'Crisp & Savory'],
    image: '/images/popcorn-collection.jpg',
    variants: [
      { id: 'pouch', label: 'Artisan Snack Pouch (120g)', detail: 'Resealable freshness pack', priceTzs: 4500, priceKes: 240 },
      { id: 'box', label: 'Cinema Sharing Box (280g)', detail: 'Movie night classic', priceTzs: 10000, priceKes: 530 },
      { id: 'canoe', label: 'Signature Popcorn Canoe (600g)', detail: 'Savory sharing canoe · Serves 6–8', priceTzs: 22000, priceKes: 1160 },
      { id: 'trio', label: 'Party Canoe Platter (1.3kg)', detail: 'Serves 14–18 guests', priceTzs: 42000, priceKes: 2200 },
    ],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-wedding-cart',
    number: '01',
    title: 'Weddings & Garden Celebrations',
    subtitle: 'Mobile Swirl Cart & Loaded Popcorn Canoe Dessert Table',
    description:
      'Transform your reception, bridal shower, or garden milestone with our custom timber-and-navy dessert cart paired with glistening elongated Popcorn Canoes — Cookies & Cream, Strawberry Shortcake, and Birthday Cake Confetti styled live for your guests.',
    highlights: [
      'Up to 4 Artisan Ice Cream flavors + hand-rolled warm waffle cones',
      'Curated Loaded Popcorn Canoe Bar (Cookies & Cream, Strawberry Shortcake, Birthday Cake)',
      'Full delivery, styling, chilled setup & attentive Crest hosts (50–800 guests)',
    ],
    image: '/images/events-catering.jpg',
    ctaLabel: 'Inquire for Your Event',
  },
  {
    id: 'exp-corporate',
    number: '02',
    title: 'Corporate Lounges & Brand Pop-Ups',
    subtitle: 'Showstopping Loaded Popcorn Canoes & Artisan Scoop Bars',
    description:
      'From executive launches to birthdays and team appreciation afternoons, our pop-up parlour delivers eye-catching loaded dessert popcorn platters and chilled waffle cones right to your atrium.',
    highlights: [
      'Ready-to-display Loaded Popcorn Canoes & co-branded takeaway pouches',
      'Rapid-serve soft-serve & scoop bar for high-footfall launches',
      'Flexible half-day, full-day, and recurring celebration packages',
    ],
    image: '/images/popcorn-canoes-hero.jpg',
    ctaLabel: 'Request Corporate Deck',
  },
  {
    id: 'exp-wholesale',
    number: '03',
    title: 'Hotels, Cinemas & Retail Partners',
    subtitle: 'Reliable Cold-Chain Ice Cream & Sealed Loaded Popcorn Supply',
    description:
      'Partner with Crest Food & Beverage to stock boutique hotels, safari lodges, supermarkets, cafés, and cinemas with consistent small-batch quality and dedicated cold-chain fulfillment.',
    highlights: [
      '5L gastronorm scooping pans for hotels, restaurants & lodges',
      'Retail-ready 500ml/1L ice cream tubs & sealed loaded gourmet popcorn pouches',
      'Consistent batch hygiene, training & branded display support',
    ],
    image: '/images/craft-kitchen.jpg',
    ctaLabel: 'Become a Stockist',
  },
];

export const CRAFT_PILLARS = [
  {
    number: '01',
    title: 'Fresh Highland Dairy & Real Fruit',
    description:
      'Every ice cream batch begins with pure cream, slow-steeped whole vanilla pods, and sun-ripened regional fruits — never synthetic pastes or shortcuts.',
  },
  {
    number: '02',
    title: 'Hand-Drizzled Loaded Popcorn Canoes',
    description:
      'Each popcorn canoe is glazed fresh, ribboned by hand with creamy white and dark chocolate, and generously crowned with real cookies, crumble, and sprinkles.',
  },
  {
    number: '03',
    title: 'Strict Hygiene & Cold-Chain Care',
    description:
      'From pasteurization to insulated delivery vans, every ice cream tub and loaded popcorn canoe arrives crisp, chilled, and presentation-ready.',
  },
  {
    number: '04',
    title: 'Built to Grow With Your Table',
    description:
      'Today we perfect Artisan Ice Cream & Loaded Gourmet Popcorn — laying the artisanal foundation for the broader Crest Food & Beverage house of flavors to come.',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-canoes',
    src: '/images/popcorn-collection.jpg',
    title: 'Four Gourmet Kettle Signatures',
    caption: 'Salted Caramel, Cheddar, Golden Butter, and Dark & Ivory Chocolate popcorn.',
    category: 'Popcorn',
    span: 'wide',
  },
  {
    id: 'gal-swirl',
    src: '/images/swirl-cone.jpg',
    title: 'Crest Signature Swirl at Sunset',
    caption: 'Velvety vanilla bean and mango cream spun tall into a freshly baked waffle cone.',
    category: 'Ice Cream',
    span: 'standard',
  },
  {
    id: 'gal-strawberry',
    src: '/images/popcorn-strawberry-shortcake.jpg',
    title: 'Strawberry Shortcake Glaze',
    caption: 'Ruby strawberry glaze, white chocolate drizzle, and sea salt crystals.',
    category: 'Popcorn',
    span: 'standard',
  },
  {
    id: 'gal-craft',
    src: '/images/craft-kitchen.jpg',
    title: 'Copper-Pot Craft Kitchen',
    caption: 'Small-batch caramel ladled warm over crisp popped kernels beside whole Madagascar vanilla pods.',
    category: 'Craft',
    span: 'standard',
  },
  {
    id: 'gal-ice-flight',
    src: '/images/ice-cream-collection.jpg',
    title: 'The Seasonal Parlour Flight',
    caption: 'Four flagship scoops: Kilimanjaro Vanilla, Dark Cocoa, Mango Passion, and Strawberry Cream.',
    category: 'Ice Cream',
    span: 'standard',
  },
  {
    id: 'gal-events',
    src: '/images/events-catering.jpg',
    title: 'Twilight Garden Dessert Cart',
    caption: 'Our signature mobile ice cream and gourmet popcorn bar glowing under evening lights.',
    category: 'Events',
    span: 'wide',
  },
  {
    id: 'gal-detail',
    src: '/images/popcorn-detail.jpg',
    title: 'Golden Caramel Kettle Crunch',
    caption: 'Jumbo mushroom kernels coated in amber sea-salt caramel and clarified butter.',
    category: 'Popcorn',
    span: 'standard',
  },
  {
    id: 'gal-tubs',
    src: '/images/takehome-tubs.jpg',
    title: 'Take-Home Tubs & Gift Tins',
    caption: 'Insulated artisanal ice cream pints paired with airtight keepsake popcorn tins.',
    category: 'Ice Cream',
    span: 'standard',
  },
  {
    id: 'gal-hero',
    src: '/images/hero-crest.jpg',
    title: 'The Crest Tasting Table',
    caption: 'Artisan waffle cones and golden glazed popcorn arranged under warm studio light.',
    category: 'Craft',
    span: 'standard',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    quote:
      'The Loaded Popcorn Canoes stole the entire dessert table at our reception! Everyone was photographing the Strawberry Shortcake and Cookies & Cream canoes before grabbing Crest waffle cones.',
    author: 'Neema & Daniel M.',
    role: 'Wedding Reception · Masaki',
    occasion: 'Private Celebration',
  },
  {
    id: 'test-2',
    quote:
      'You taste the craft in every bite — velvety vanilla bean ice cream with zero iciness, and their Birthday Cake Confetti popcorn canoe vanished in ten minutes at our office launch.',
    author: 'Amina K.',
    role: 'Hospitality Director',
    occasion: 'Corporate & Hotel Partner',
  },
  {
    id: 'test-3',
    quote:
      'Our Friday family ritual is a 1L tub of Zanzibar Mango & Passion plus a Cookies & Cream Popcorn Canoe. Always arrives frozen solid, crisp, and loaded with chocolate and cookies.',
    author: 'Kelvin O.',
    role: 'Weekend Regular',
    occasion: 'Home Delivery',
  },
];

export const FAQS: FaqItem[] = [
  {
    question: 'What is a Crest Signature Popcorn Canoe?',
    answer:
      'A Popcorn Canoe is our signature elongated loaded dessert platter (~650g, serving 6–8 guests) brimming with glazed gourmet popcorn, hand-piped white or dark chocolate drizzle, real cookie chunks, shortcake crumble, sprinkles, and chocolate kisses — ideal for movie nights, birthdays, bridal showers, and event tables.',
  },
  {
    question: 'How do I place an order for home delivery or pickup?',
    answer:
      'Browse our Ice Cream or Loaded Popcorn menu, pick your serving size (Waffle Cone, Tub, Loaded Pouch, or Signature Popcorn Canoe), and add items to your Order Basket. One click sends your complete order straight to our WhatsApp concierge for fast confirmation.',
  },
  {
    question: 'How does Crest keep ice cream frozen and chocolate-drizzled popcorn crisp?',
    answer:
      'Every ice cream tub travels in insulated thermal pouches with cold packs, while our chocolate-drizzled Loaded Popcorn Canoes are chilled briefly to set the couverture crisp and sealed fresh right before dispatch.',
  },
  {
    question: 'Can I customize the toppings or colors on Popcorn Canoes for my event?',
    answer:
      'Yes! For weddings, baby showers, birthdays, and corporate launches, we color-match the glaze, sprinkles, cookie toppings, and ribbon styling to your event palette.',
  },
  {
    question: 'What else is coming next from Crest Food & Beverage?',
    answer:
      'Right now our kitchen is devoted to perfecting Artisan Ice Cream and Loaded Gourmet Popcorn. As Crest Food & Beverage grows, curated chilled beverages and artisan bakery creations will join the Crest table.',
  },
];

export function formatMoney(priceTzs: number, priceKes: number, currency: CurrencyCode): string {
  if (currency === 'KES') {
    return `KES ${priceKes.toLocaleString('en-US')}`;
  }
  return `TZS ${priceTzs.toLocaleString('en-US')}`;
}
