/**
 * SMOOTH SCROLL (Lenis), driven by GSAP's ticker so ScrollTrigger and Lenis
 * stay perfectly in sync. Created on every page and destroyed before the
 * next page swaps in, so state never leaks between View Transitions.
 */
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';
import { SMOOTH_SCROLL } from './config';

let lenis: Lenis | null = null;
let tick: ((time: number) => void) | null = null;

/** Height of the fixed demo banner, if shown (0 otherwise). */
function bannerHeight() {
  return document.querySelector<HTMLElement>('[data-demo-banner]')?.offsetHeight ?? 0;
}

export function getLenis() {
  return lenis;
}

export function initSmoothScroll() {
  destroySmoothScroll();
  lenis = new Lenis({
    lerp: SMOOTH_SCROLL.lerp,
    wheelMultiplier: SMOOTH_SCROLL.wheelMultiplier,
    smoothWheel: true,
    // Touch devices keep native momentum scrolling (feels best on phones).
    syncTouch: false,
    anchors: { offset: SMOOTH_SCROLL.anchorOffset - bannerHeight() },
    autoRaf: false,
    // Let elements with data-lenis-prevent (e.g. the open menu, dialogs) scroll natively.
    prevent: (node) => node.closest?.('[data-lenis-prevent], dialog') != null,
  });

  lenis.on('scroll', ScrollTrigger.update);
  tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
}

export function destroySmoothScroll() {
  if (tick) gsap.ticker.remove(tick);
  tick = null;
  lenis?.destroy();
  lenis = null;
}

/** Pause/resume page scrolling (used by the mobile menu and lightbox). */
export function lockScroll(locked: boolean) {
  if (lenis) (locked ? lenis.stop() : lenis.start());
  document.documentElement.classList.toggle('scroll-locked', locked);
}
