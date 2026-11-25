/**
 * SCROLL-TRIGGERED REVEALS
 * ---------------------------------------------------------------------------
 *   [data-split]         Headings: words slide up from behind a mask. Use on
 *                        headings only (SplitText adds an aria-label, which is
 *                        not allowed on plain paragraphs).
 *   [data-reveal-image]  Images: "curtain" reveal from the bottom edge plus a
 *                        scale-down from 1.15 to 1. Built from two nested
 *                        transforms (no clip-path), so it stays on the GPU.
 *   [data-parallax]      Large images drift inside their frame while scrolling.
 *   [data-parallax-bg]   Full-width background images (bands, CTA): parallax.
 *   [data-fade]          Cards and blocks: staggered fade-up as they enter.
 *   [data-line]          Thin gold lines draw in from the centre.
 *   [data-count]         Numbers count up (data-to, data-decimals, data-suffix).
 *
 * initReducedReveals() is the prefers-reduced-motion version: opacity fades only.
 */
import { gsap, ScrollTrigger, SplitText } from './gsap';
import { TIMING, EASE, MOBILE } from './config';

const START = 'top 85%';

export function initReveals({ mobile }: { mobile: boolean }) {
  // --- Headings: masked word reveal ---------------------------------------
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    SplitText.create(el, {
      type: 'words',
      mask: 'words',
      wordsClass: 'split-word',
      autoSplit: true, // re-split after fonts load / resize so line breaks stay correct
      onSplit(self) {
        gsap.set(el, { visibility: 'visible' });
        return gsap.from(self.words, {
          yPercent: 115,
          duration: mobile ? MOBILE.headingDuration : TIMING.headings.duration,
          stagger: TIMING.headings.stagger,
          ease: EASE.out,
          scrollTrigger: { trigger: el, start: START, once: true },
        });
      },
    });
  });

  // --- Images: curtain reveal + scale-down --------------------------------
  document.querySelectorAll<HTMLElement>('[data-reveal-image]').forEach((frame) => {
    const mover = frame.querySelector('[data-reveal-mover]');
    const inner = frame.querySelector('[data-reveal-inner]');
    if (!mover || !inner) return;
    gsap
      .timeline({ scrollTrigger: { trigger: frame, start: 'top 90%', once: true } })
      .fromTo(mover, { y: 0, yPercent: 100 }, { y: 0, yPercent: 0, duration: mobile ? MOBILE.imageDuration : TIMING.images.duration, ease: EASE.out })
      .fromTo(
        inner,
        // y: 0 clears the pixel offset GSAP reads from the CSS starting state.
        { y: 0, yPercent: -100, scale: TIMING.images.startScale },
        { y: 0, yPercent: 0, scale: 1, duration: (mobile ? MOBILE.imageDuration : TIMING.images.duration) * 1.15, ease: EASE.out },
        0,
      );
  });

  // --- Parallax inside framed images --------------------------------------
  const amount = mobile ? MOBILE.parallax : TIMING.parallax.amount;
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((img) => {
    gsap.fromTo(
      img,
      { yPercent: -amount },
      {
        yPercent: amount,
        ease: 'none',
        scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });

  // --- Parallax for full-width background bands ---------------------------
  document.querySelectorAll<HTMLElement>('[data-parallax-bg]').forEach((media) => {
    gsap.fromTo(
      media,
      { yPercent: -amount * 1.5 },
      {
        yPercent: amount * 1.5,
        ease: 'none',
        scrollTrigger: { trigger: media.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });

  // --- Cards & blocks: staggered fade-up ----------------------------------
  const fades = gsap.utils.toArray<HTMLElement>('[data-fade]');
  if (fades.length) {
    const distance = mobile ? MOBILE.cardsDistance : TIMING.cards.distance;
    gsap.set(fades, { opacity: 0, y: distance });
    ScrollTrigger.batch(fades, {
      start: 'top 90%',
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { opacity: 1, y: 0, duration: TIMING.cards.duration, stagger: TIMING.cards.stagger, ease: EASE.soft }),
    });
  }

  // --- Gold lines ----------------------------------------------------------
  document.querySelectorAll<HTMLElement>('[data-line]').forEach((line) => {
    gsap.fromTo(
      line,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.4, ease: EASE.out, scrollTrigger: { trigger: line, start: 'top 92%', once: true } },
    );
  });

  initCounters();
}

/** Numbers count up from 0 when they scroll into view. */
function initCounters() {
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const to = Number(el.dataset.to ?? el.textContent ?? 0);
    const decimals = Number(el.dataset.decimals ?? 0);
    const format = (n: number) =>
      n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    const state = { value: 0 };
    el.textContent = format(0);
    gsap.to(state, {
      value: to,
      duration: TIMING.counters.duration,
      ease: 'power2.out',
      onUpdate: () => (el.textContent = format(state.value)),
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });
}

/** Reduced-motion version: no movement, no parallax, just gentle fades. */
export function initReducedReveals() {
  const items = gsap.utils.toArray<HTMLElement>('[data-fade], [data-reveal-image]');
  gsap.set(items, { opacity: 0 });
  ScrollTrigger.batch(items, {
    start: 'top 95%',
    once: true,
    onEnter: (batch) => gsap.to(batch, { opacity: 1, duration: 0.6, ease: 'none' }),
  });
}
