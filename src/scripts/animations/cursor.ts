/**
 * CUSTOM CURSOR (desktop with a mouse only)
 * ---------------------------------------------------------------------------
 * The real system pointer stays visible, so moving the mouse always feels
 * instant. A thin gold ring follows it closely as a decorative accent:
 *   - Over links/buttons: the ring grows a little.
 *   - Over images: the ring grows more.
 *   - Over gallery photos ([data-cursor="view"]): the ring fills and shows "View".
 *
 * Settings (follow speed, sizes, hiding the system pointer) are in config.ts → CURSOR.
 *
 * Why not hide the system pointer? A cursor drawn by JavaScript can only move
 * once per screen frame, after the browser has processed the mouse event, so
 * it always trails the hardware pointer slightly. That is what made the old
 * version feel like "dragging through mud".
 *
 * The markup lives in BaseLayout with transition:persist, and listeners are on
 * `document`, so it survives page transitions. Skipped on touch devices and
 * with reduced motion.
 */
import { gsap } from './gsap';
import { MQ, CURSOR } from './config';

let started = false;

type CursorState = '' | 'link' | 'image' | 'view';

export function initCursor(setHtmlClass: (name: string, on: boolean) => void) {
  if (started) return;
  const query = window.matchMedia(`${MQ.finePointer} and ${MQ.motionOK}`);
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  const label = document.getElementById('cursor-label');
  const fillEl = ring?.firstElementChild;
  if (!dot || !ring || !label || !fillEl) return;
  started = true;

  // The dot (only used when the system pointer is hidden) is placed directly
  // with no easing at all. The ring uses a very short catch-up.
  const dotX = gsap.quickSetter(dot, 'x', 'px');
  const dotY = gsap.quickSetter(dot, 'y', 'px');
  const ringX = CURSOR.ringFollow > 0 ? gsap.quickTo(ring, 'x', { duration: CURSOR.ringFollow, ease: 'power2.out' }) : gsap.quickSetter(ring, 'x', 'px');
  const ringY = CURSOR.ringFollow > 0 ? gsap.quickTo(ring, 'y', { duration: CURSOR.ringFollow, ease: 'power2.out' }) : gsap.quickSetter(ring, 'y', 'px');
  gsap.set(label, { scale: 0.6 });

  let state: CursorState = '';
  const applyState = (next: CursorState, force = false) => {
    if (next === state && !force) return;
    state = next;
    const scale = next === '' ? 1 : CURSOR.scale[next];
    const view = next === 'view';
    gsap.to(ring, { scale, duration: CURSOR.hoverSpeed, ease: 'power2.out', overwrite: 'auto' });
    gsap.to(fillEl, { opacity: view ? 1 : 0, duration: CURSOR.hoverSpeed, overwrite: 'auto' });
    gsap.to(label, { opacity: view ? 1 : 0, scale: view ? 1 : 0.6, duration: CURSOR.hoverSpeed, overwrite: 'auto' });
  };

  let visible = false;
  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const x = e.clientX;
    const y = e.clientY;
    if (!visible) {
      visible = true;
      gsap.set([dot, ring], { x, y });
      gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2, overwrite: 'auto' });
    }
    dotX(x);
    dotY(y);
    ringX(x);
    ringY(y);
  };
  const onOver = (e: PointerEvent) => {
    const t = e.target as Element | null;
    if (!t?.closest) return;
    if (t.closest('[data-cursor="view"]')) applyState('view');
    else if (t.closest('a, button, [role="button"], label, select, summary')) applyState('link');
    else if (t.closest('img, [data-cursor="image"]')) applyState('image');
    else applyState('');
  };
  const onLeave = () => {
    visible = false;
    gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2, overwrite: 'auto' });
  };
  // Quick "press" feedback on click.
  const onDown = () => gsap.to(ring, { scale: (state === '' ? 1 : CURSOR.scale[state]) * 0.8, duration: 0.1, overwrite: 'auto' });
  const onUp = () => applyState(state, true);

  const enable = (on: boolean) => {
    setHtmlClass('has-cursor', on);
    setHtmlClass('hide-native-cursor', on && CURSOR.hideNativeCursor);
    const method = on ? 'addEventListener' : 'removeEventListener';
    window[method]('pointermove', onMove as EventListener, { passive: true });
    document[method]('pointerover', onOver as EventListener);
    document.documentElement[method]('pointerleave', onLeave);
    window[method]('pointerdown', onDown);
    window[method]('pointerup', onUp);
    if (!on) onLeave();
  };

  enable(query.matches);
  query.addEventListener('change', (e) => enable(e.matches));
  // A new page has new elements under the mouse: reset the ring.
  document.addEventListener('astro:after-swap', () => applyState(''));
}
