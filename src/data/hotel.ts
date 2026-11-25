/**
 * ============================================================================
 *  HOTEL CONTENT. Edit this file to rebrand the whole site.
 * ============================================================================
 *  Everything a visitor reads (name, contact details, rooms, menu, reviews,
 *  experiences, SEO text, brand colours) comes from this file.
 *  Photos are in ./images.ts.
 */
import { images, type SiteImage } from './images';

/* ----------------------------------------------------------------------------
 * Basic details
 * ------------------------------------------------------------------------- */
/**
 * YOUR WhatsApp / phone number, digits only, WITHOUT the +975 country code.
 * Used for the hotel phone, the WhatsApp button and the demo banner.
 * ⚠️ Replace the placeholder below with your real number before publishing.
 */
const MY_NUMBER = '17721998';

export const hotel = {
  name: 'Lhenkhar Valley Retreat',
  shortName: 'Lhenkhar Valley',
  tagline: 'A quiet retreat in the orange hills of Tsirang',
  starRating: 3,
  totalRooms: 18,

  /** Shown in the footer and used for search engines. */
  description:
    'Lhenkhar Valley Retreat is a peaceful 3-star hotel in Damphu, Tsirang, Bhutan, with 18 rooms, valley views, authentic Bhutanese cuisine and guided farm, hiking and cultural experiences.',

  address: {
    street: 'Damphu Town',
    locality: 'Damphu',
    region: 'Tsirang',
    postalCode: '',
    country: 'Bhutan',
    countryCode: 'BT',
  },
  /** Approximate coordinates. Used for structured data. */
  geo: { latitude: 27.0081, longitude: 90.1232 },
  /** Text used for the Google Maps embed search. */
  mapQuery: 'Damphu, Tsirang, Bhutan',

  contact: {
    phone: `+975 ${MY_NUMBER}`,
    /** Digits only, with country code. Used for tel: and WhatsApp links. */
    phoneDigits: `975${MY_NUMBER}`,
    whatsapp: `975${MY_NUMBER}`,
    email: 'pemadhendup006@gmail.com',
  },

  checkIn: '14:00',
  checkOut: '11:00',
  priceRange: 'USD 85 to 140 per night',
  currency: 'USD',

  social: {
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/',
    tripadvisor: 'https://www.tripadvisor.com/',
  },

  /**
   * Formspree form ID for the booking form. Create a free form at
   * https://formspree.io and paste its ID here (the part after /f/).
   * While this is 'YOUR_FORM_ID' the form runs in demo mode.
   */
  formspreeId: 'YOUR_FORM_ID',

  payments: {
    badge: 'We accept Bhutan QR payments (mBoB, mPay) and international cards',
    methods: ['mBoB', 'mPay', 'Visa', 'Mastercard'],
  },

  /**
   * Brand colours. Each palette runs from dark to light. Changing these
   * recolours the entire site. Keep enough contrast: text sits on `cream`
   * and on `primary.800`/`primary.900`.
   */
  theme: {
    primary: { 900: '#4a0f19', 800: '#5e1522', 700: '#7a1c2c', 600: '#922638', 100: '#f6e6e8' },
    accent: { 700: '#8a5806', 500: '#d99a1e', 400: '#e8b04a', 300: '#f2cc7a' },
    cream: { 50: '#fdfaf4', 100: '#f8f1e4', 200: '#efe3cc' },
    ink: { 900: '#1f1d1b', 700: '#3a3633', 500: '#5c5650' },
  },
};

/* ----------------------------------------------------------------------------
 * Demo banner: the slim strip fixed at the top of every page.
 * Set `enabled: false` when you deliver the site to a real hotel.
 * ------------------------------------------------------------------------- */
export const demoBanner = {
  enabled: true,
  designer: 'Pema Dhendup',
  whatsapp: `975${MY_NUMBER}`,
  message: 'Hello Pema, I saw your sample hotel website and would like one for my hotel.',
};

/* ----------------------------------------------------------------------------
 * Navigation
 * ------------------------------------------------------------------------- */
export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Rooms', href: '/rooms/' },
  { label: 'Dining', href: '/dining/' },
  { label: 'Experiences', href: '/experiences/' },
  { label: 'Gallery', href: '/gallery/' },
  { label: 'Contact', href: '/contact/' },
];

export const bookingCta = { label: 'Check Availability', href: '/contact/#booking' };

/* ----------------------------------------------------------------------------
 * SEO: title and description for each page
 * ------------------------------------------------------------------------- */
export const seo = {
  home: {
    title: `${hotel.name} | 3-Star Hotel in Damphu, Tsirang, Bhutan`,
    description:
      'Stay at Lhenkhar Valley Retreat in Damphu, Tsirang. 18 comfortable rooms with valley views, authentic Bhutanese food, farm visits, hikes and cultural evenings.',
  },
  rooms: {
    title: `Rooms & Suites | ${hotel.name}, Tsirang`,
    description:
      'Choose from Deluxe Rooms, Valley View Suites and Family Rooms at Lhenkhar Valley Retreat. Free Wi-Fi, breakfast included, rates from USD 85 per night.',
  },
  dining: {
    title: `Dining & Bhutanese Menu | ${hotel.name}`,
    description:
      'Taste authentic Bhutanese cooking at Lhenkhar Kitchen: ema datshi, kewa datshi, red rice, momos and suja butter tea, made with produce from Tsirang farms.',
  },
  experiences: {
    title: `Things to Do in Tsirang | ${hotel.name}`,
    description:
      'Sightseeing around Damphu, orange and cardamom farm visits, guided hikes and a Bhutanese cultural evening, all arranged by Lhenkhar Valley Retreat.',
  },
  gallery: {
    title: `Photo Gallery | ${hotel.name}`,
    description:
      'See the rooms, food, gardens and valley views of Lhenkhar Valley Retreat in Damphu, Tsirang, Bhutan.',
  },
  contact: {
    title: `Contact & Booking | ${hotel.name}`,
    description:
      'Check availability and book your stay at Lhenkhar Valley Retreat, Damphu, Tsirang. Call, WhatsApp or send an enquiry and we reply within 24 hours.',
  },
};

/* ----------------------------------------------------------------------------
 * Home page
 * ------------------------------------------------------------------------- */
export const home = {
  hero: {
    eyebrow: 'Damphu · Tsirang · Bhutan',
    /** The big heading is the hotel name; this line fades in below it. */
    tagline: 'Where the valley slows you down',
    subtitle:
      'Eighteen calm rooms above the orange orchards of Tsirang, with warm Bhutanese hospitality, home-style cooking and mountain air.',
    image: images.homeHero,
  },
  welcome: {
    eyebrow: 'Kuzuzangpo la',
    title: 'Welcome to Lhenkhar Valley',
    paragraphs: [
      'Set on a gentle hillside above Damphu town, our family-run resort is built in the traditional style, with whitewashed walls, carved timber windows and painted eaves. It is a quiet base for exploring southern-central Bhutan, about four hours by road from Thimphu.',
      'Days here start with butter tea on the terrace and end with a hearty Bhutanese dinner. In between, walk through cardamom fields, visit local farms, or simply rest and enjoy the view.',
    ],
    image: images.welcome,
  },
  /** Big numbers that count up on scroll. `decimals` controls 4.8 vs 5. */
  stats: [
    { value: 18, decimals: 0, suffix: '', label: 'Rooms & suites' },
    { value: 1500, decimals: 0, suffix: ' m', label: 'Altitude above sea level' },
    { value: 4.8, decimals: 1, suffix: '', label: 'Average guest rating' },
  ],
  /** Words in the endlessly scrolling strip. */
  marquee: ['Tsirang', 'Valley Views', 'Bhutanese Hospitality', 'Farm to Table', 'Mountain Air', 'Orange Orchards'],
  /** Full-width photo band with a short quote. */
  band: {
    quote: 'Slow mornings, warm butter tea, and a valley that glows at dusk.',
    image: images.homeBand,
  },
  highlights: [
    {
      title: 'Rooms',
      text: 'Bright, comfortable rooms with handcrafted details, valley views and everything you need after a day on the road.',
      href: '/rooms/',
      linkLabel: 'View rooms',
      image: images.highlightRooms,
    },
    {
      title: 'Dining',
      text: 'Home-style Bhutanese cooking made with chillies, cheese and red rice from farms in Tsirang.',
      href: '/dining/',
      linkLabel: 'See the menu',
      image: images.highlightDining,
    },
    {
      title: 'Experiences',
      text: 'Farm visits, forest hikes, local sightseeing and a cultural evening with folk songs and dance.',
      href: '/experiences/',
      linkLabel: 'Explore activities',
      image: images.highlightExperiences,
    },
  ],
  cta: {
    title: 'Plan your stay in Tsirang',
    text: 'Tell us your dates and we will confirm availability and the best rate within 24 hours.',
    image: images.ctaBackground,
  },
};

/* ----------------------------------------------------------------------------
 * Rooms
 * ------------------------------------------------------------------------- */
export interface Room {
  id: string;
  name: string;
  summary: string;
  image: SiteImage;
  size: string;
  bed: string;
  maxGuests: number;
  count: number;
  priceFrom: number;
  amenities: string[];
}

export const rooms: Room[] = [
  {
    id: 'deluxe',
    name: 'Deluxe Room',
    summary:
      'Our most popular room, with warm wooden interiors, a hand-painted headboard and a window looking out over the garden.',
    image: images.roomDeluxe,
    size: '28 m²',
    bed: '1 Queen bed or 2 Single beds',
    maxGuests: 2,
    count: 10,
    priceFrom: 85,
    amenities: ['Free Wi-Fi', 'Breakfast included', 'Hot shower', 'Room heater', 'Tea & coffee', 'Flat-screen TV'],
  },
  {
    id: 'valley-view-suite',
    name: 'Valley View Suite',
    summary:
      'A spacious corner suite with a separate sitting area and a wide window framing the Tsirang hills. Ideal for couples.',
    image: images.roomSuite,
    size: '45 m²',
    bed: '1 King bed',
    maxGuests: 3,
    count: 4,
    priceFrom: 140,
    amenities: ['Panoramic valley view', 'Sitting area', 'Bathtub', 'Free Wi-Fi', 'Breakfast included', 'Minibar'],
  },
  {
    id: 'family',
    name: 'Family Room',
    summary:
      'Plenty of space for families or small groups, with a double bed and two singles and a cosy reading corner.',
    image: images.roomFamily,
    size: '40 m²',
    bed: '1 Double bed + 2 Single beds',
    maxGuests: 4,
    count: 4,
    priceFrom: 120,
    amenities: ['Free Wi-Fi', 'Breakfast included', 'Extra storage', 'Room heater', 'Tea & coffee', 'Garden access'],
  },
];

/** Shown on the Rooms page under the room cards. */
export const roomPolicies = [
  `Check-in from ${hotel.checkIn}, check-out by ${hotel.checkOut}`,
  'Rates include breakfast and taxes',
  'Children under 6 stay free with parents',
  'Free cancellation up to 7 days before arrival',
];

/* ----------------------------------------------------------------------------
 * Dining
 * ------------------------------------------------------------------------- */
export const dining = {
  restaurantName: 'Lhenkhar Kitchen',
  intro: [
    'Lhenkhar Kitchen serves the honest, home-style food of Bhutan: generous, warming and, yes, full of chillies. Our cooks grew up in Tsirang and use recipes from their families.',
    'Most ingredients come from farms within a few kilometres of the resort. Tell us how spicy you like it: every dish can be made mild.',
  ],
  hours: [
    { meal: 'Breakfast', time: '7:00 – 9:30' },
    { meal: 'Lunch', time: '12:00 – 14:30' },
    { meal: 'Dinner', time: '18:30 – 21:30' },
  ],
  image: images.restaurant,
  secondaryImage: images.kitchen,
};

export interface MenuItem {
  name: string;
  description: string;
  price: string;
  vegetarian?: boolean;
  spicy?: boolean;
}

export const menu: { category: string; items: MenuItem[] }[] = [
  {
    category: 'Signature dishes',
    items: [
      {
        name: 'Ema Datshi',
        description: 'Bhutan’s national dish: green chillies simmered in a rich, melted local cheese sauce.',
        price: 'Nu. 280',
        vegetarian: true,
        spicy: true,
      },
      {
        name: 'Kewa Datshi',
        description: 'Sliced potatoes cooked with cheese, butter and a little chilli. A gentle, comforting favourite.',
        price: 'Nu. 260',
        vegetarian: true,
      },
      {
        name: 'Shamu Datshi',
        description: 'Wild and farmed mushrooms in a creamy cheese sauce.',
        price: 'Nu. 300',
        vegetarian: true,
      },
      {
        name: 'Phaksha Paa',
        description: 'Pork stir-fried with radish, dried chillies and ginger.',
        price: 'Nu. 380',
        spicy: true,
      },
    ],
  },
  {
    category: 'Rice, momos & sides',
    items: [
      {
        name: 'Bhutanese Red Rice',
        description: 'Nutty, slightly sticky red rice grown in Bhutan’s high valleys. Served with every main.',
        price: 'Nu. 80',
        vegetarian: true,
      },
      {
        name: 'Momos',
        description: 'Steamed dumplings filled with cheese and cabbage, or minced beef, served with ezay chilli sauce.',
        price: 'Nu. 220',
      },
      {
        name: 'Ezay',
        description: 'A fiery fresh salsa of chillies, onion, tomato and local cheese.',
        price: 'Nu. 90',
        vegetarian: true,
        spicy: true,
      },
    ],
  },
  {
    category: 'Drinks',
    items: [
      {
        name: 'Suja',
        description: 'Traditional butter tea, salty and warming, churned with fresh butter.',
        price: 'Nu. 80',
        vegetarian: true,
      },
      {
        name: 'Tsirang Orange Juice',
        description: 'Freshly pressed from local mandarins (in season, November to February).',
        price: 'Nu. 120',
        vegetarian: true,
      },
      {
        name: 'Ara',
        description: 'A traditional spirit distilled from rice or maize, served warm with butter and egg on request.',
        price: 'Nu. 150',
        vegetarian: true,
      },
    ],
  },
];

/* ----------------------------------------------------------------------------
 * Experiences
 * ------------------------------------------------------------------------- */
export interface Experience {
  id: string;
  title: string;
  description: string;
  details: string[];
  duration: string;
  image: SiteImage;
}

export const experiences: Experience[] = [
  {
    id: 'sightseeing',
    title: 'Nearby sightseeing',
    description:
      'Discover Damphu and the surrounding district with a local guide: the Tsirang Dzong, village temples, viewpoints over the Punatsangchhu river and the lively weekend market.',
    details: ['Tsirang Dzong and local lhakhangs', 'Damphu weekend vegetable market', 'River and valley viewpoints'],
    duration: 'Half day or full day',
    image: images.expSightseeing,
  },
  {
    id: 'farm-visits',
    title: 'Farm visits',
    description:
      'Tsirang is known for its mandarins, cardamom and dairy. Spend a morning with a farming family, pick oranges in season and share a cup of suja in their home.',
    details: ['Orange orchards (November to February)', 'Cardamom and organic vegetable farms', 'Home-made cheese and butter'],
    duration: '3 to 4 hours',
    image: images.expFarm,
  },
  {
    id: 'hiking',
    title: 'Hiking',
    description:
      'Easy to moderate trails start right from the resort, through pine and broadleaf forest to ridges with sweeping views. Our guides adjust the pace to suit you.',
    details: ['Sunrise ridge walk (2 hours)', 'Forest trail to a hilltop temple (4 hours)', 'Packed lunch available'],
    duration: '2 to 6 hours',
    image: images.expHiking,
  },
  {
    id: 'cultural-evening',
    title: 'Cultural evening',
    description:
      'Gather around the bonfire for traditional Bhutanese folk songs and dances performed by local artists, followed by a festive dinner and a taste of ara.',
    details: ['Zhungdra and boedra folk songs', 'Mask dance demonstration', 'Bonfire and traditional dinner'],
    duration: 'Evenings, on request',
    image: images.expCulture,
  },
];

/* ----------------------------------------------------------------------------
 * Guest reviews
 * ------------------------------------------------------------------------- */
export const reviews = [
  {
    quote:
      'The staff treated us like family. The ema datshi was the best we had in Bhutan and the view from our suite was unforgettable.',
    name: 'Sarah M.',
    country: 'United Kingdom',
    rating: 5,
  },
  {
    quote:
      'A peaceful place to break the journey south. Clean rooms, hot water, great breakfast and a lovely orange farm visit.',
    name: 'Rajesh K.',
    country: 'India',
    rating: 5,
  },
  {
    quote:
      'The cultural evening was a highlight of our trip. Simple, comfortable and very good value. We would happily stay again.',
    name: 'Kenji T.',
    country: 'Japan',
    rating: 4,
  },
];

/* ----------------------------------------------------------------------------
 * Gallery
 * ------------------------------------------------------------------------- */
export const gallery = images.gallery;

/* ----------------------------------------------------------------------------
 * Contact page
 * ------------------------------------------------------------------------- */
export const contactPage = {
  intro:
    'Send us your travel dates and we will reply within 24 hours with availability and our best rate. You can also call or message us on WhatsApp.',
  gettingHere: [
    'About 4 hours by road from Thimphu, via Wangdue Phodrang',
    'About 5 hours from Paro International Airport',
    'Free airport and city transfers on stays of 3 nights or more',
  ],
  countries: [
    'Bhutan', 'India', 'Bangladesh', 'Nepal', 'Thailand', 'Singapore', 'Malaysia', 'China', 'Japan',
    'South Korea', 'Australia', 'United Kingdom', 'Germany', 'France', 'Netherlands', 'United States',
    'Canada', 'Other',
  ],
};

/** Pages that get a hero photo. */
export const pageHeroes = {
  rooms: images.roomsHero,
  dining: images.diningHero,
  experiences: images.experiencesHero,
  gallery: images.galleryHero,
  contact: images.contactHero,
};
