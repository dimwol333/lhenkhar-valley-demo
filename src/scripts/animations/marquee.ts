/**
 * MARQUEE STRIP
 * ---------------------------------------------------------------------------
 *   [data-marquee]        wrapper
 *   [data-marquee-track]  contains the words twice, so moving it by -50%
 *                         loops seamlessly.
 * Moves slowly and forever; speeds up briefly when you scroll fast, and pauses
 * while off-screen to save battery.
 */
import { gsap, ScrollTrigger } from './gsap';
import { TIMING } from './config';

export function initMarquees() {
  document.querySelectorAll<HTMLElement>('[data-marquee]').forEach((wrap) => {
    const track = wrap.querySelector('[data-marquee-track]');
    if (!track) return;

    const loop = gsap.to(track, { xPercent: -50, duration: TIMING.marquee.secondsPerLoop, ease: 'none', repeat: -1 });

    ScrollTrigger.create({
      trigger: wrap,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
      onUpdate: (self) => {
        // Scroll velocity briefly boosts the speed (max ×5), then eases back to normal.
        const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 400, 4);
        gsap.to(loop, { timeScale: boost, duration: 0.2, overwrite: true });
        gsap.to(loop, { timeScale: 1, duration: 1, delay: 0.2, overwrite: false });
      },
    });
  });
}
