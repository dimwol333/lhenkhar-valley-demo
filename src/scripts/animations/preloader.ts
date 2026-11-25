/**
 * PRELOADER (first visit only)
 * ---------------------------------------------------------------------------
 * A full-screen maroon panel where the logo draws itself as a line animation,
 * fills with colour, then the panel wipes upward to reveal the hero.
 *
 * - Shown only when <html> has the `dv-first` class. An inline script in
 *   BaseLayout adds it if sessionStorage has no 'dv-visited' flag and the
 *   visitor has not asked for reduced motion.
 * - Never longer than TIMING.preloader.total (1.5 s).
 * - Resolves its promise as the wipe starts, so the hero intro overlaps it.
 */
import { gsap } from './gsap';
import { TIMING, EASE } from './config';

export const VISITED_KEY = 'dv-visited';

export function runPreloader(): Promise<void> {
  const html = document.documentElement;
  const el = document.getElementById('preloader');
  if (!el || !html.classList.contains('dv-first')) return Promise.resolve();

  try {
    sessionStorage.setItem(VISITED_KEY, '1');
  } catch {
    /* private mode: preloader may show again, which is fine */
  }

  const t = TIMING.preloader;
  const strokes = el.querySelectorAll<SVGGeometryElement>('[data-pl-stroke]');
  const fills = el.querySelectorAll<SVGElement>('[data-pl-fill]');
  const label = el.querySelector('[data-pl-label]');

  // Prepare the "drawing": hide each outline by offsetting its dash.
  strokes.forEach((path) => {
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
  });

  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete: () => {
        html.classList.remove('dv-first');
        gsap.set(el, { clearProps: 'all' });
      },
    });

    tl.to(strokes, { strokeDashoffset: 0, duration: t.draw, stagger: 0.06, ease: 'power2.inOut' })
      .to(fills, { opacity: 1, duration: t.fill, ease: 'none' }, '-=0.2')
      .to(label, { opacity: 1, y: 0, duration: t.fill, ease: EASE.soft }, '<')
      .addLabel('wipe', '+=0.02')
      .call(() => resolve(), [], 'wipe')
      .to(el, { yPercent: -100, duration: t.wipe, ease: EASE.inOut }, 'wipe');

    // Hard cap: speed the whole sequence up if it would exceed the limit.
    if (tl.duration() > t.total) tl.timeScale(tl.duration() / t.total);
  });
}
