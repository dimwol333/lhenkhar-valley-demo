/**
 * ============================================================================
 *  ANIMATION ENTRY POINT
 * ============================================================================
 *  Loaded once by BaseLayout. Astro's View Transitions (ClientRouter) swap
 *  pages without a full reload, so everything here follows a strict cycle:
 *
 *    astro:page-load    → init(): create Lenis, ScrollTriggers, SplitTexts, listeners
 *    astro:before-swap  → teardown(): revert/kill all of it before the DOM changes
 *    astro:after-swap   → re-apply <html> classes (the router resets them)
 *
 *  gsap.matchMedia() switches between desktop, mobile and reduced-motion
 *  versions automatically, and its revert() cleans up every animation,
 *  ScrollTrigger and SplitText created inside it.
 *
 *  Where each effect lives:
 *    config.ts             timings, eases, distances  ← tweak here
 *    preloader.ts          first-visit logo + wipe
 *    hero.ts               Ken Burns, letter reveal, hero parallax, scroll cue
 *    reveals.ts            headings, image curtains, parallax, cards, counters, lines
 *    horizontal-scroll.ts  pinned sideways scroll (Experiences)
 *    marquee.ts            infinite word strip
 *    interactions.ts       3D tilt, magnetic buttons
 *    cursor.ts             custom cursor
 *    header.ts             hide/show header, glass, full-screen mobile menu
 *    lightbox.ts           gallery lightbox (scale from thumbnail)
 *    smooth-scroll.ts      Lenis smooth scrolling
 */
import { gsap, ScrollTrigger } from './gsap';
import { MQ, prefersReducedMotion } from './config';
import { initSmoothScroll, destroySmoothScroll, lockScroll } from './smooth-scroll';
import { runPreloader } from './preloader';
import { initHero } from './hero';
import { initReveals, initReducedReveals } from './reveals';
import { initHorizontalScroll } from './horizontal-scroll';
import { initMarquees } from './marquee';
import { initInteractions } from './interactions';
import { initCursor } from './cursor';
import { initHeader } from './header';
import { initLightbox } from './lightbox';
import { initBookingForm } from '../booking-form';

declare global {
  interface Window {
    __dvAnim?: boolean;
  }
}

/* --- <html> classes that must survive page swaps ----------------------------- */
const htmlClasses = new Set<string>();
function setHtmlClass(name: string, on: boolean) {
  if (on) htmlClasses.add(name);
  else htmlClasses.delete(name);
  document.documentElement.classList.toggle(name, on);
}
function reapplyHtmlClasses() {
  htmlClasses.forEach((c) => document.documentElement.classList.add(c));
}

/* --- Per-page lifecycle ------------------------------------------------------ */
let mm: gsap.MatchMedia | null = null;
let cleanups: (() => void)[] = [];

function init() {
  window.__dvAnim = true; // tells the inline failsafe in BaseLayout that JS is running
  const reduce = prefersReducedMotion();
  setHtmlClass('js-anim', !reduce);

  if (!reduce) initSmoothScroll();
  cleanups.push(initHeader(), initLightbox());
  initBookingForm();
  initCursor(setHtmlClass);

  const preloaderDone = runPreloader();

  mm = gsap.matchMedia();

  // Main scroll/entrance animations: three variants.
  mm.add(
    { desktop: `${MQ.desktop} and ${MQ.motionOK}`, mobile: `${MQ.mobile} and ${MQ.motionOK}`, reduce: MQ.reduceMotion },
    (ctx) => {
      const { desktop, reduce: rm } = ctx.conditions as { desktop: boolean; mobile: boolean; reduce: boolean };
      if (rm) {
        initReducedReveals();
        return;
      }
      // The pinned section must be created first so triggers below it
      // account for the extra scroll distance the pin adds.
      if (desktop) initHorizontalScroll();
      initHero({ mobile: !desktop, ready: preloaderDone });
      initReveals({ mobile: !desktop });
      initMarquees();
    },
  );

  // Mouse-only effects (never on touch screens or with reduced motion).
  mm.add(`${MQ.finePointer} and ${MQ.motionOK}`, () => initInteractions());

  // Layout can change once web fonts and lazy images arrive.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', refreshOnce, { once: true });
}

function refreshOnce() {
  ScrollTrigger.refresh();
}

function teardown() {
  cleanups.forEach((fn) => fn());
  cleanups = [];
  mm?.revert();
  mm = null;
  ScrollTrigger.getAll().forEach((t) => t.kill());
  lockScroll(false);
  destroySmoothScroll();
}

document.addEventListener('astro:page-load', init);
document.addEventListener('astro:before-swap', teardown);
document.addEventListener('astro:after-swap', reapplyHtmlClasses);
