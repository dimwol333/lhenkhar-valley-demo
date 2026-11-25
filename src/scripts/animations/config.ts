/**
 * ============================================================================
 *  ANIMATION SETTINGS. Adjust timings, easing and distances here.
 * ============================================================================
 *  All durations are in seconds. Eases use GSAP names (https://gsap.com/docs/v3/Eases).
 */

export const EASE = {
  /** Smooth, luxurious deceleration used for most reveals. */
  out: 'expo.out',
  /** Softer ease for fades and small movements. */
  soft: 'power3.out',
  /** For things that move in and out (preloader wipe). */
  inOut: 'power4.inOut',
};

export const TIMING = {
  preloader: {
    /** Hard limit for the whole preloader (requirement: max 1.5 s). */
    total: 1.5,
    draw: 0.8, // logo outline drawing
    fill: 0.25, // logo colours fading in
    wipe: 0.5, // maroon screen sliding up
  },
  hero: {
    letterDuration: 1.1, // each letter of the hotel name
    letterStagger: 0.035, // delay between letters
    taglineDelay: 0.35, // after the last letter starts
    kenBurnsDuration: 18, // one slow zoom cycle
    kenBurnsScale: 1.12,
    parallax: 18, // % the image moves while the hero scrolls away
  },
  headings: { duration: 1.1, stagger: 0.06 },
  images: { duration: 1.4, startScale: 1.15 },
  cards: { duration: 1, stagger: 0.12, distance: 50 },
  parallax: { amount: 8 }, // % movement of large images inside their frame
  counters: { duration: 2 },
  marquee: { secondsPerLoop: 38 },
  header: { duration: 0.45 },
  menu: { duration: 0.7, linkStagger: 0.07 },
  lightbox: { duration: 0.6 },
  pageTransition: { duration: 0.45 },
};

/** Lighter settings for phones (smaller distances, faster, fewer effects). */
export const MOBILE = {
  cardsDistance: 28,
  headingDuration: 0.8,
  imageDuration: 1,
  parallax: 4,
  heroParallax: 10,
};

/**
 * Custom cursor (desktop with a mouse only).
 * The real mouse pointer always stays visible, so the cursor never feels laggy.
 * The gold ring is a decorative accent that follows it.
 */
export const CURSOR = {
  /** Seconds the ring takes to catch up with the pointer. 0 = glued to it. Keep below ~0.15. */
  ringFollow: 0.1,
  /** Seconds for the ring to grow/shrink over links, images and gallery photos. */
  hoverSpeed: 0.25,
  /** Ring size multipliers. */
  scale: { link: 1.6, image: 2.2, view: 2.6 },
  /**
   * true = hide the system pointer and draw a gold dot instead (the "agency" look).
   * Not recommended: a drawn cursor always trails the hardware one by a frame or more.
   */
  hideNativeCursor: false,
};

/** Smooth scrolling (Lenis). Lower lerp = smoother but floatier. */
export const SMOOTH_SCROLL = {
  lerp: 0.1,
  wheelMultiplier: 1,
  /** Offset for anchor links so content is not hidden under the header (the demo banner height is added automatically). */
  anchorOffset: -90,
};

/** Media queries used to switch behaviour. */
export const MQ = {
  desktop: '(min-width: 1024px)',
  mobile: '(max-width: 1023.98px)',
  reduceMotion: '(prefers-reduced-motion: reduce)',
  motionOK: '(prefers-reduced-motion: no-preference)',
  /** Real mouse/trackpad: enables cursor, tilt and magnetic buttons. */
  finePointer: '(hover: hover) and (pointer: fine)',
};

export const prefersReducedMotion = () => window.matchMedia(MQ.reduceMotion).matches;
export const hasFinePointer = () => window.matchMedia(MQ.finePointer).matches;
export const isDesktop = () => window.matchMedia(MQ.desktop).matches;
