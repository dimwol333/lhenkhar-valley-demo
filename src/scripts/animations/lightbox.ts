/**
 * GALLERY LIGHTBOX with scale-from-thumbnail ("FLIP") animation
 * ---------------------------------------------------------------------------
 * Opening: the large image starts exactly over the clicked thumbnail and
 * smoothly scales/moves to the centre while the dark backdrop fades in.
 * Closing: the reverse, back into the (current) thumbnail.
 * Arrows/swipe/keyboard switch photos with a quick cross-fade.
 *
 * Markup hooks (gallery page):
 *   [data-gallery] a[data-index]   thumbnails (data-srcset, data-alt, data-w, data-h)
 *   [data-lightbox]                the <dialog>
 *   [data-lb-bg] [data-lb-stage] [data-lb-img] [data-lb-ui]
 *   [data-lb-caption] [data-lb-count] [data-lb-prev] [data-lb-next] [data-lb-close]
 */
import { gsap } from './gsap';
import { TIMING, EASE, prefersReducedMotion } from './config';
import { lockScroll } from './smooth-scroll';

export function initLightbox(): () => void {
  const dialog = document.querySelector<HTMLDialogElement>('[data-lightbox]');
  const links = gsap.utils.toArray<HTMLAnchorElement>('[data-gallery] a[data-index]');
  if (!dialog || !links.length) return () => {};

  const q = <T extends Element>(sel: string) => dialog.querySelector<T>(sel)!;
  const bg = q<HTMLElement>('[data-lb-bg]');
  const stage = q<HTMLElement>('[data-lb-stage]');
  const img = q<HTMLImageElement>('[data-lb-img]');
  const ui = dialog.querySelectorAll<HTMLElement>('[data-lb-ui]');
  const caption = q<HTMLElement>('[data-lb-caption]');
  const count = q<HTMLElement>('[data-lb-count]');
  const reduce = prefersReducedMotion();
  const D = TIMING.lightbox.duration;

  let current = 0;
  let busy = false;
  let opener: HTMLElement | null = null;

  const thumbOf = (i: number) => links[i].querySelector('img')!;

  /** Size the big image to fit the stage while keeping its aspect ratio. */
  const fit = (i: number) => {
    const w = Number(links[i].dataset.w) || 3;
    const h = Number(links[i].dataset.h) || 2;
    const box = stage.getBoundingClientRect();
    const scale = Math.min(box.width / w, box.height / h);
    img.style.width = `${Math.round(w * scale)}px`;
    img.style.height = `${Math.round(h * scale)}px`;
  };

  const fill = (i: number) => {
    current = (i + links.length) % links.length;
    const link = links[current];
    const thumb = thumbOf(current);
    // Start with the already-loaded thumbnail so the animation is instant,
    // then upgrade to the large version.
    img.removeAttribute('srcset');
    img.src = thumb.currentSrc || thumb.src;
    img.srcset = link.dataset.srcset ?? '';
    img.alt = link.dataset.alt ?? '';
    caption.textContent = link.dataset.alt ?? '';
    count.textContent = `Photo ${current + 1} of ${links.length}`;
    fit(current);
  };

  /** Transform that places the big image exactly over thumbnail i. */
  const flipFrom = (i: number) => {
    const a = thumbOf(i).getBoundingClientRect();
    const b = img.getBoundingClientRect();
    return {
      x: a.left + a.width / 2 - (b.left + b.width / 2),
      y: a.top + a.height / 2 - (b.top + b.height / 2),
      scale: a.width / b.width,
    };
  };

  const open = (i: number, link: HTMLElement) => {
    if (busy) return;
    opener = link;
    dialog.showModal();
    lockScroll(true);
    fill(i);
    gsap.set(img, { x: 0, y: 0, scale: 1, opacity: 1 });

    if (reduce) {
      gsap.fromTo([bg, img, ...ui], { opacity: 0 }, { opacity: 1, duration: 0.25 });
      return;
    }
    busy = true;
    const from = flipFrom(i);
    gsap.set(thumbOf(i), { opacity: 0 });
    gsap
      .timeline({ onComplete: () => void (busy = false) })
      .fromTo(bg, { opacity: 0 }, { opacity: 1, duration: D * 0.8, ease: 'none' }, 0)
      .fromTo(img, from, { x: 0, y: 0, scale: 1, duration: D, ease: EASE.out }, 0)
      .fromTo(ui, { opacity: 0 }, { opacity: 1, duration: 0.3 }, D * 0.5);
  };

  const close = () => {
    if (busy || !dialog.open) return;
    const finish = () => {
      gsap.set(thumbOf(current), { opacity: 1 });
      dialog.close();
      lockScroll(false);
      busy = false;
    };
    if (reduce) {
      gsap.to([bg, img, ...ui], { opacity: 0, duration: 0.2, onComplete: finish });
      return;
    }
    busy = true;
    const to = flipFrom(current);
    gsap
      .timeline({ onComplete: finish })
      .to(ui, { opacity: 0, duration: 0.2 }, 0)
      .to(bg, { opacity: 0, duration: D * 0.8, ease: 'none' }, 0)
      .to(img, { ...to, duration: D * 0.85, ease: EASE.inOut }, 0);
  };

  const step = (dir: 1 | -1) => {
    if (busy) return;
    busy = true;
    gsap.set(thumbOf(current), { opacity: 1 });
    gsap.to(img, {
      opacity: 0,
      x: -30 * dir,
      duration: reduce ? 0.01 : 0.2,
      onComplete: () => {
        fill(current + dir);
        if (!reduce) gsap.set(thumbOf(current), { opacity: 0 });
        gsap.fromTo(
          img,
          { opacity: 0, x: 30 * dir },
          { opacity: 1, x: 0, duration: reduce ? 0.2 : 0.45, ease: EASE.soft, onComplete: () => void (busy = false) },
        );
      },
    });
  };

  // --- Events -----------------------------------------------------------------
  const onClicks = links.map((link, i) => {
    const fn = (e: MouseEvent) => {
      e.preventDefault();
      open(i, link);
    };
    link.addEventListener('click', fn);
    return () => link.removeEventListener('click', fn);
  });
  const onCancel = (e: Event) => {
    e.preventDefault(); // Escape: run our animated close instead
    close();
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  };
  const onBackdrop = (e: MouseEvent) => {
    if (e.target === stage || e.target === bg) close();
  };
  let startX = 0;
  const onTouchStart = (e: TouchEvent) => (startX = e.touches[0].clientX);
  const onTouchEnd = (e: TouchEvent) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  };
  const onResize = () => dialog.open && fit(current);
  const onClose = () => opener?.focus();

  const prev = q<HTMLButtonElement>('[data-lb-prev]');
  const next = q<HTMLButtonElement>('[data-lb-next]');
  const closeBtn = q<HTMLButtonElement>('[data-lb-close]');
  const onPrev = () => step(-1);
  const onNext = () => step(1);

  dialog.addEventListener('cancel', onCancel);
  dialog.addEventListener('keydown', onKey);
  dialog.addEventListener('click', onBackdrop);
  dialog.addEventListener('touchstart', onTouchStart, { passive: true });
  dialog.addEventListener('touchend', onTouchEnd);
  dialog.addEventListener('close', onClose);
  prev.addEventListener('click', onPrev);
  next.addEventListener('click', onNext);
  closeBtn.addEventListener('click', close);
  window.addEventListener('resize', onResize);

  return () => {
    onClicks.forEach((fn) => fn());
    window.removeEventListener('resize', onResize);
    if (dialog.open) {
      dialog.close();
      lockScroll(false);
    }
  };
}
