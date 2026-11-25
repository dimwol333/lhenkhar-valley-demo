/**
 * HERO ANIMATIONS (home hero and the shorter page heroes)
 * ---------------------------------------------------------------------------
 * Markup hooks:
 *   [data-hero]               the hero section
 *   [data-hero-media]         image wrapper, receives scroll parallax
 *   [data-hero-img]           the image itself, receives the Ken Burns zoom
 *   [data-hero-title]         heading; split into letters (home) or words (pages)
 *   [data-hero-title="words"] use a word-by-word masked reveal instead of letters
 *   [data-hero-fade]          tagline, buttons, etc.; fade up after the title
 *   [data-hero-content]       text block; fades slightly as you scroll away
 *   [data-scroll-indicator]   the animated "scroll down" cue
 *
 * Effects:
 *   1. Ken Burns: very slow, endless zoom on the image.
 *   2. Title: letters rise and fade in with a stagger (SplitText).
 *   3. Tagline and buttons fade up after the title.
 *   4. Parallax: image drifts down slower than the text while scrolling.
 *   5. Scroll indicator: a gold line that keeps "dripping" downward.
 */
import { gsap, SplitText } from './gsap';
import { TIMING, EASE, MOBILE } from './config';

interface HeroOptions {
  mobile: boolean;
  /** Resolves when the preloader has finished (or immediately). */
  ready: Promise<void>;
}

export function initHero({ mobile, ready }: HeroOptions) {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;
  const t = TIMING.hero;

  const media = hero.querySelector<HTMLElement>('[data-hero-media]');
  const img = hero.querySelector<HTMLElement>('[data-hero-img]');
  const title = hero.querySelector<HTMLElement>('[data-hero-title]');
  const content = hero.querySelector<HTMLElement>('[data-hero-content]');
  const fades = hero.querySelectorAll<HTMLElement>('[data-hero-fade]');
  const indicator = hero.querySelector<HTMLElement>('[data-scroll-indicator]');

  // 1. Ken Burns: slow zoom in and out forever (transform only).
  if (img) {
    gsap.fromTo(
      img,
      { scale: 1 },
      { scale: t.kenBurnsScale, duration: t.kenBurnsDuration, ease: 'sine.inOut', repeat: -1, yoyo: true },
    );
  }

  // 2 + 3. Intro timeline, created paused and played once the preloader is done.
  const intro = gsap.timeline({ paused: true });
  /** When the tagline/buttons start: shortly after the last letter starts moving. */
  let fadeAt = 0;

  if (title) {
    const byWords = title.dataset.heroTitle === 'words';
    const split = SplitText.create(title, {
      type: byWords ? 'words' : 'words,chars',
      mask: byWords ? 'words' : undefined,
      wordsClass: 'split-word',
      charsClass: 'split-char',
    });
    gsap.set(title, { visibility: 'visible' });

    if (byWords) {
      intro.from(split.words, { yPercent: 110, duration: TIMING.headings.duration, stagger: TIMING.headings.stagger, ease: EASE.out });
      fadeAt = split.words.length * TIMING.headings.stagger + t.taglineDelay;
    } else {
      intro.from(split.chars, {
        yPercent: 90,
        opacity: 0,
        duration: t.letterDuration,
        stagger: t.letterStagger,
        ease: EASE.out,
      });
      fadeAt = split.chars.length * t.letterStagger + t.taglineDelay;
    }
  }

  if (fades.length) {
    intro.fromTo(
      fades,
      { opacity: 0, y: mobile ? 16 : 28 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: EASE.soft },
      fadeAt,
    );
  }

  ready.then(() => intro.play());

  // 4. Parallax: the image moves down while the page scrolls up, so it appears slower.
  if (media) {
    gsap.to(media, {
      yPercent: mobile ? MOBILE.heroParallax : t.parallax,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
  }
  if (content) {
    gsap.to(content, {
      opacity: 0.15,
      y: mobile ? -30 : -70,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
  }

  // 5. Scroll indicator: line grows down, then slides out, on a loop.
  const line = indicator?.querySelector('[data-scroll-line]');
  if (line) {
    gsap
      .timeline({ repeat: -1, delay: 1.2 })
      .fromTo(line, { scaleY: 0, transformOrigin: 'top' }, { scaleY: 1, duration: 0.9, ease: 'power2.inOut' })
      .to(line, { scaleY: 0, transformOrigin: 'bottom', duration: 0.9, ease: 'power2.inOut' });
  }
}
