/**
 * ALL SITE IMAGES LIVE HERE.
 *
 * Each entry has a `src` and an `alt` (a description for screen readers and SEO).
 *
 * `src` can be either:
 *   1. A remote URL (string). Give `width` and `height` too, so Astro can optimise it.
 *      The placeholders below come from picsum.photos with fixed seeds, so they stay
 *      the same on every reload.
 *   2. A local photo imported from src/assets/photos (recommended for real hotel photos).
 *      Astro reads the size automatically and converts it to fast, responsive WebP:
 *
 *        import lobbyPhoto from '../assets/photos/lobby.jpg';
 *        hero: { src: lobbyPhoto, alt: 'The hotel lobby at dusk' },
 *
 * Remote images are downloaded and optimised at build time, so the live site never
 * loads anything from picsum.photos.
 */
import type { ImageMetadata } from 'astro';

export interface SiteImage {
  src: string | ImageMetadata;
  alt: string;
  /** Needed for remote (string) images only. */
  width?: number;
  height?: number;
}

/** Placeholder photo from picsum.photos with a fixed seed. */
const pic = (seed: string, alt: string, width = 1600, height = 1067): SiteImage => ({
  src: `https://picsum.photos/seed/${seed}/${width}/${height}`,
  alt,
  width,
  height,
});

export const images = {
  // Page heroes (wide)
  homeHero: pic('dhensa-hero-valley', 'Morning mist rising over the green hills of the Tsirang valley', 2000, 1250),
  roomsHero: pic('dhensa-rooms-hero', 'A calm, light-filled guest room with wooden furnishings', 2000, 1000),
  diningHero: pic('dhensa-dining-hero', 'A table set with traditional Bhutanese dishes', 2000, 1000),
  experiencesHero: pic('dhensa-exp-hero', 'A walking trail winding through forested hills', 2000, 1000),
  galleryHero: pic('dhensa-gallery-hero', 'The resort grounds surrounded by mountains', 2000, 1000),
  contactHero: pic('dhensa-contact-hero', 'The resort entrance framed by prayer flags', 2000, 1000),

  // Home page
  welcome: pic('dhensa-welcome', 'The resort terrace overlooking the valley at sunset', 1200, 1500),
  highlightRooms: pic('dhensa-hl-rooms', 'A Valley View Suite with a large window', 1200, 900),
  highlightDining: pic('dhensa-hl-dining', 'Ema datshi served with red rice', 1200, 900),
  highlightExperiences: pic('dhensa-hl-exp', 'Guests walking through an orange orchard', 1200, 900),
  homeBand: pic('dhensa-band', 'Layered mountain ridges at golden hour above the valley', 2400, 1350),
  ctaBackground: pic('dhensa-cta-bg', 'Mountain ridges fading into the evening sky', 2000, 900),

  // Rooms
  roomDeluxe: pic('dhensa-room-deluxe', 'Deluxe Room with a queen bed and hand-painted wooden details', 1400, 1000),
  roomSuite: pic('dhensa-room-suite', 'Valley View Suite with a sitting area and panoramic window', 1400, 1000),
  roomFamily: pic('dhensa-room-family', 'Spacious Family Room with a double bed and two single beds', 1400, 1000),

  // Dining
  restaurant: pic('dhensa-restaurant', 'The Lhenkhar Kitchen restaurant with warm lighting and timber beams', 1400, 1000),
  kitchen: pic('dhensa-kitchen', 'Fresh local vegetables and chillies from Tsirang farms', 1400, 1000),

  // Experiences
  expSightseeing: pic('dhensa-exp-dzong', 'A whitewashed dzong with a red-and-gold roof', 1400, 1000),
  expFarm: pic('dhensa-exp-farm', 'Terraced farmland and orange trees near Damphu', 1400, 1000),
  expHiking: pic('dhensa-exp-hike', 'Hikers on a ridge trail through pine forest', 1400, 1000),
  expCulture: pic('dhensa-exp-culture', 'Dancers in colourful costumes at an evening performance', 1400, 1000),

  // Gallery
  gallery: [
    pic('dhensa-g-01', 'The resort exterior in traditional Bhutanese style', 1600, 1067),
    pic('dhensa-g-02', 'Close-up of a carved and painted wooden window', 1200, 1600),
    pic('dhensa-g-03', 'Deluxe Room interior with soft morning light', 1600, 1067),
    pic('dhensa-g-04', 'Prayer flags fluttering on a hillside', 1600, 1067),
    pic('dhensa-g-05', 'A bowl of momos with chilli sauce', 1200, 1600),
    pic('dhensa-g-06', 'The valley under a dramatic sky', 1600, 1067),
    pic('dhensa-g-07', 'The garden courtyard with flowering plants', 1600, 1067),
    pic('dhensa-g-08', 'A cup of suja butter tea by the window', 1200, 1600),
    pic('dhensa-g-09', 'A forest trail near the resort', 1600, 1067),
    pic('dhensa-g-10', 'The restaurant dining hall in the evening', 1600, 1067),
    pic('dhensa-g-11', 'Ripe Tsirang oranges in an orchard', 1200, 1600),
    pic('dhensa-g-12', 'Sunrise over the hills seen from the terrace', 1600, 1067),
  ],
} satisfies Record<string, SiteImage | SiteImage[]>;
