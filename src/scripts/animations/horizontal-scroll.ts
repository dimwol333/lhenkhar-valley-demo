/**
 * HORIZONTAL SCROLL (Experiences page, desktop only)
 * ---------------------------------------------------------------------------
 *   [data-hscroll]           the section that gets pinned
 *   [data-hscroll-track]     the row of panels that slides sideways
 *   [data-hscroll-progress]  optional gold progress bar (scaleX)
 *   [data-hscroll-img]       images that get a sideways parallax inside cards
 *
 * Vertical scrolling is converted into horizontal movement while the section
 * is pinned. On phones/tablets (and with reduced motion) the CSS stacks the
 * cards vertically and this file does nothing.
 */
import { gsap } from './gsap';

export function initHorizontalScroll() {
  const section = document.querySelector<HTMLElement>('[data-hscroll]');
  const track = section?.querySelector<HTMLElement>('[data-hscroll-track]');
  if (!section || !track) return;

  const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

  const slide = gsap.to(track, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${distance()}`,
      pin: true,
      scrub: 1, // 1 s of smoothing makes it feel weighty and premium
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  });

  const progress = section.querySelector('[data-hscroll-progress]');
  if (progress) {
    gsap.fromTo(
      progress,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: () => `+=${distance()}`, scrub: true, invalidateOnRefresh: true },
      },
    );
  }

  // Images shift slightly inside their cards as the row moves (containerAnimation).
  section.querySelectorAll<HTMLElement>('[data-hscroll-img]').forEach((img) => {
    gsap.fromTo(
      img,
      { xPercent: -6 },
      {
        xPercent: 6,
        ease: 'none',
        scrollTrigger: {
          trigger: img.parentElement,
          containerAnimation: slide,
          start: 'left right',
          end: 'right left',
          scrub: true,
        },
      },
    );
  });
}
