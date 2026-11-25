/**
 * Booking enquiry form (Contact page): date rules, room pre-selection from
 * ?room=…, and sending to Formspree with an inline success/error message.
 * Called on every page load (View Transitions), does nothing on other pages.
 */
export function initBookingForm() {
  const form = document.querySelector<HTMLFormElement>('[data-booking-form]');
  if (!form) return;
  const checkin = form.querySelector<HTMLInputElement>('#checkin')!;
  const checkout = form.querySelector<HTMLInputElement>('#checkout')!;
  const dateError = form.querySelector<HTMLElement>('[data-date-error]')!;
  const status = form.querySelector<HTMLElement>('[data-form-status]')!;
  const submit = form.querySelector<HTMLButtonElement>('[data-submit]')!;
  const submitLabel = submit.querySelector('span') ?? submit;
  const room = form.querySelector<HTMLSelectElement>('#room')!;

  // Dates: no past dates, check-out at least one night after check-in.
  const iso = (d: Date) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const today = new Date();
  checkin.min = iso(today);
  checkout.min = iso(new Date(today.getTime() + 864e5));
  checkin.addEventListener('change', () => {
    if (!checkin.value) return;
    const next = new Date(checkin.value + 'T00:00:00');
    next.setDate(next.getDate() + 1);
    checkout.min = iso(next);
    if (checkout.value && checkout.value <= checkin.value) checkout.value = iso(next);
  });

  // Pre-select a room when arriving from the Rooms page (?room=deluxe).
  const wanted = new URLSearchParams(location.search).get('room');
  if (wanted) {
    const opt = room.querySelector<HTMLOptionElement>(`option[data-id="${CSS.escape(wanted)}"]`);
    if (opt) opt.selected = true;
  }

  const OK = ['bg-[#e6f2e6]', 'text-[#1d5c2a]'];
  const BAD = ['bg-primary-100', 'text-primary-800'];
  const showStatus = (msg: string, ok: boolean) => {
    status.textContent = msg;
    status.classList.remove('hidden', ...OK, ...BAD);
    status.classList.add(...(ok ? OK : BAD));
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const badDates = checkin.value && checkout.value && checkout.value <= checkin.value;
    dateError.classList.toggle('hidden', !badDates);
    checkout.setAttribute('aria-invalid', String(!!badDates));
    if (badDates) {
      checkout.focus();
      return;
    }

    if (form.dataset.demo) {
      showStatus(
        'Demo mode: the form is working, but no Formspree form ID is set yet. Add yours in src/data/hotel.ts to receive enquiries by email.',
        true,
      );
      return;
    }

    submit.disabled = true;
    submitLabel.textContent = 'Sending…';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        form.reset();
        showStatus('Thank you! Your enquiry has been sent. We will reply within 24 hours.', true);
      } else {
        const data = await res.json().catch(() => null);
        const msg = data?.errors?.map((er: { message: string }) => er.message).join(', ');
        showStatus(msg || 'Sorry, something went wrong. Please try again or contact us by phone or WhatsApp.', false);
      }
    } catch {
      showStatus('Network error. Please check your connection, or contact us by phone or WhatsApp.', false);
    } finally {
      submit.disabled = false;
      submitLabel.textContent = 'Send enquiry';
    }
  });
}
