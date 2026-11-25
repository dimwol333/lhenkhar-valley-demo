/**
 * HEADER + MOBILE MENU
 * ---------------------------------------------------------------------------
 * Header:
 *   - Transparent with light text over the hero; frosted-glass background once
 *     you scroll (the glass layer fades with opacity only).
 *   - Slides up out of view when scrolling down, comes back when scrolling up.
 *   - Re-appears whenever something inside it receives keyboard focus.
 * Mobile menu:
 *   - Full-screen maroon overlay that wipes down, then the links slide in one
 *     by one. Escape or any link closes it. Page scrolling is locked meanwhile.
 *
 * Markup hooks: [data-header], [data-header-glass], [data-menu-toggle],
 * [data-menu] (overlay), [data-menu-item] (each link row).
 */
import { gsap, ScrollTrigger } from './gsap';
import { TIMING, EASE, prefersReducedMotion } from './config';
import { lockScroll } from './smooth-scroll';

export function initHeader(): () => void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return () => {};
  const glass = header.querySelector('[data-header-glass]');
  const reduce = prefersReducedMotion();
  const d = reduce ? 0.15 : TIMING.header.duration;

  let hidden = false;
  let menuOpen = false;

  const setHidden = (hide: boolean) => {
    if (hide === hidden) return;
    hidden = hide;
    gsap.to(header, { yPercent: hide ? -100 : 0, duration: d, ease: EASE.soft, overwrite: true });
  };
  // Pages without a dark hero keep the glass background at all times.
  const overlay = header.dataset.overlay === 'true';
  const glassOpacity = (atTop: boolean) => (overlay && atTop ? 0 : 1);
  const setTop = (atTop: boolean) => {
    if (header.dataset.top === String(atTop)) return;
    header.dataset.top = String(atTop);
    gsap.to(glass, { opacity: glassOpacity(atTop), duration: 0.4, ease: 'none' });
  };

  // Initial state (page may load already scrolled, e.g. after "back").
  header.dataset.top = String(window.scrollY < 40);
  gsap.set(glass, { opacity: glassOpacity(window.scrollY < 40) });

  const trigger = ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      const y = self.scroll();
      setTop(y < 40);
      if (menuOpen) return;
      if (self.direction === 1 && y > 160) setHidden(true);
      else if (self.direction === -1) setHidden(false);
    },
  });

  const onFocus = () => setHidden(false);
  header.addEventListener('focusin', onFocus);

  // --- Mobile menu ------------------------------------------------------------
  const toggle = header.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  const items = menu ? gsap.utils.toArray<HTMLElement>('[data-menu-item]', menu) : [];
  const label = toggle?.querySelector('[data-menu-label]');
  const pageParts = document.querySelectorAll<HTMLElement>('main, footer');
  let tl: gsap.core.Timeline | null = null;

  if (menu && !reduce) {
    tl = gsap
      .timeline({ paused: true })
      .set(menu, { visibility: 'visible' })
      .fromTo(menu, { yPercent: -100 }, { yPercent: 0, duration: TIMING.menu.duration, ease: EASE.inOut })
      .fromTo(
        items,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, stagger: TIMING.menu.linkStagger, ease: EASE.out },
        '-=0.3',
      );
  }

  const setMenu = (open: boolean) => {
    if (!menu || !toggle) return;
    menuOpen = open;
    header.dataset.menuState = open ? 'open' : 'closed';
    toggle.setAttribute('aria-expanded', String(open));
    if (label) label.textContent = open ? 'Close menu' : 'Open menu';
    pageParts.forEach((el) => (el.inert = open));
    lockScroll(open);
    if (open) setHidden(false);

    if (tl) {
      if (open) tl.timeScale(1).play();
      else tl.timeScale(1.6).reverse();
    } else {
      gsap.set(menu, { visibility: open ? 'visible' : 'hidden' });
      if (open) gsap.fromTo(menu, { opacity: 0 }, { opacity: 1, duration: 0.2 });
    }
  };

  const onToggle = () => setMenu(!menuOpen);
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && menuOpen) {
      setMenu(false);
      toggle?.focus();
    }
  };
  const onLinkClick = () => setMenu(false);
  const desktopQuery = window.matchMedia('(min-width: 1024px)');
  const onBreakpoint = (e: MediaQueryListEvent) => e.matches && menuOpen && setMenu(false);

  toggle?.addEventListener('click', onToggle);
  document.addEventListener('keydown', onKey);
  menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', onLinkClick));
  desktopQuery.addEventListener('change', onBreakpoint);

  return () => {
    if (menuOpen) {
      pageParts.forEach((el) => (el.inert = false));
      lockScroll(false);
    }
    trigger.kill();
    tl?.kill();
    header.removeEventListener('focusin', onFocus);
    toggle?.removeEventListener('click', onToggle);
    document.removeEventListener('keydown', onKey);
    desktopQuery.removeEventListener('change', onBreakpoint);
  };
}
