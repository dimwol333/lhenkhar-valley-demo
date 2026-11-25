/**
 * POINTER INTERACTIONS (desktop with a real mouse only, never on touch)
 * ---------------------------------------------------------------------------
 *   [data-tilt]       Subtle 3D tilt following the mouse (room/highlight cards).
 *   [data-magnetic]   Buttons pulled slightly toward the cursor.
 *                     All .btn-* buttons get this automatically.
 * Image zoom on hover is pure CSS (Tailwind `group-hover:scale-*`), which
 * uses the separate CSS `scale` property so it never fights GSAP transforms.
 *
 * Returns a cleanup function that removes every listener (called before each
 * page transition).
 */
import { gsap } from './gsap';

const TILT_MAX = 6; // degrees
const MAGNET_STRENGTH = 0.35; // 0 = none, 1 = follows cursor fully

export function initInteractions(): () => void {
  const cleanups: (() => void)[] = [];

  // --- 3D tilt --------------------------------------------------------------
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
    gsap.set(card, { transformPerspective: 1000, transformStyle: 'preserve-3d' });
    const rx = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3.out' });
    const ry = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3.out' });

    const move = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5; // -0.5 … 0.5
      const py = (e.clientY - r.top) / r.height - 0.5;
      ry(px * TILT_MAX * 2);
      rx(-py * TILT_MAX * 2);
    };
    const leave = () => {
      rx(0);
      ry(0);
    };
    card.addEventListener('pointermove', move);
    card.addEventListener('pointerleave', leave);
    cleanups.push(() => {
      card.removeEventListener('pointermove', move);
      card.removeEventListener('pointerleave', leave);
    });
  });

  // --- Magnetic buttons -------------------------------------------------------
  document.querySelectorAll<HTMLElement>('[data-magnetic], .btn-primary, .btn-accent, .btn-outline-light').forEach((btn) => {
    const xTo = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' });

    const move = (e: PointerEvent) => {
      const r = btn.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * MAGNET_STRENGTH);
      yTo((e.clientY - (r.top + r.height / 2)) * MAGNET_STRENGTH);
    };
    const leave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)', overwrite: true });
    };
    btn.addEventListener('pointermove', move);
    btn.addEventListener('pointerleave', leave);
    cleanups.push(() => {
      btn.removeEventListener('pointermove', move);
      btn.removeEventListener('pointerleave', leave);
    });
  });

  return () => cleanups.forEach((fn) => fn());
}
