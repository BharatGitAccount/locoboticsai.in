const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = [...document.querySelectorAll('.reveal')];

// Progressive enhancement: content is visible by default. Animation classes
// are added only after JavaScript is running, and a safety timer guarantees
// that no section can remain hidden if an observer fails unexpectedly.
if (!reducedMotion && 'IntersectionObserver' in window) {
  const showEverything = () => revealItems.forEach((item) => {
    item.classList.add('visible');
    item.classList.remove('reveal-pending');
  });

  try {
    revealItems.forEach((item) => item.classList.add('reveal-pending'));
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }),
      { threshold: 0.08, rootMargin: '0px 0px -24px' },
    );
    revealItems.forEach((item) => revealObserver.observe(item));
    window.setTimeout(showEverything, 4000);
  } catch (error) {
    console.warn('Optional reveal animation disabled.', error);
    showEverything();
  }
}

const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMenu = () => {
  menuButton?.classList.remove('active');
  menuButton?.setAttribute('aria-expanded', 'false');
  mobileMenu?.classList.remove('open');
  mobileMenu?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

menuButton?.addEventListener('click', () => {
  const isOpen = !mobileMenu?.classList.contains('open');
  menuButton.classList.toggle('active', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  mobileMenu?.classList.toggle('open', isOpen);
  mobileMenu?.setAttribute('aria-hidden', String(!isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});
mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

if (!reducedMotion && window.matchMedia('(pointer: fine)').matches) {
  const cursorLight = document.querySelector('.cursor-light');
  window.addEventListener('pointermove', (event) => {
    if (!cursorLight) return;
    cursorLight.style.left = `${event.clientX}px`;
    cursorLight.style.top = `${event.clientY}px`;
  }, { passive: true });
}

document.querySelectorAll('a[href="/relayvo"]').forEach((link) => {
  link.addEventListener('click', () => window.trackAnalyticsEvent?.('relayvo_explore', {
    source_path: window.location.pathname,
  }));
});

const inquiryTriggers = [...document.querySelectorAll('[data-inquiry-open]')];

if (inquiryTriggers.length) {
  document.body.insertAdjacentHTML('beforeend', `
    <dialog class="inquiry-dialog" id="inquiry-dialog" aria-labelledby="inquiry-title">
      <div class="inquiry-shell">
        <header class="inquiry-header">
          <div>
            <p class="inquiry-kicker">RELAYVO / WORKFLOW DISCOVERY</p>
            <h2 id="inquiry-title">Design a workflow</h2>
            <p>Tell us where a WhatsApp journey slows down. We will review the workflow and contact you directly.</p>
          </div>
          <button class="inquiry-close" type="button" data-inquiry-close aria-label="Close enquiry form">×</button>
        </header>
        <form class="inquiry-form" id="inquiry-form">
          <div class="inquiry-grid">
            <label>Full name <span>*</span><input name="name" type="text" autocomplete="name" minlength="2" maxlength="80" required /></label>
            <label>Work email <span>*</span><input name="email" type="email" autocomplete="email" maxlength="254" required /></label>
            <label>Phone or WhatsApp<input name="phone" type="tel" autocomplete="tel" maxlength="30" /></label>
            <label>Company <span>*</span><input name="company" type="text" autocomplete="organization" minlength="2" maxlength="120" required /></label>
            <label>Role<input name="role" type="text" autocomplete="organization-title" maxlength="100" /></label>
            <label>Company size
              <select name="companySize">
                <option value="">Select</option>
                <option>1–50 employees</option>
                <option>51–250 employees</option>
                <option>251–1,000 employees</option>
                <option>1,001+ employees</option>
              </select>
            </label>
          </div>
          <label class="inquiry-wide">What should this WhatsApp workflow complete? <span>*</span><textarea name="useCase" rows="5" minlength="20" maxlength="2000" placeholder="Describe the current journey, slow handoffs, approvals, systems involved, and the outcome you need." required></textarea></label>
          <label class="inquiry-wide">Preferred timeline <span>*</span>
            <select name="timeline" required>
              <option value="">Select</option>
              <option>Exploring now</option>
              <option>Within 3 months</option>
              <option>Within 6 months</option>
              <option>Not sure yet</option>
            </select>
          </label>
          <label class="inquiry-honeypot" aria-hidden="true">Website<input name="website" type="text" tabindex="-1" autocomplete="off" /></label>
          <label class="inquiry-consent"><input name="consent" type="checkbox" required /> <span>I agree that Locobotics AI may use these details to respond to this enquiry. See the <a href="/privacy">Privacy notice</a>.</span></label>
          <div class="inquiry-actions">
            <p class="inquiry-status" role="status" aria-live="polite"></p>
            <button class="inquiry-submit" type="submit">Send inquiry <span aria-hidden="true">↗</span></button>
          </div>
        </form>
      </div>
    </dialog>
  `);

  const dialog = document.querySelector('#inquiry-dialog');
  const form = document.querySelector('#inquiry-form');
  const status = dialog?.querySelector('.inquiry-status');
  const submitButton = dialog?.querySelector('.inquiry-submit');
  let returnFocus;

  const openInquiry = (trigger) => {
    if (!dialog) return;
    returnFocus = trigger;
    status.textContent = '';
    status.className = 'inquiry-status';
    window.trackAnalyticsEvent?.('relayvo_inquiry_open', {
      page_path: window.location.pathname,
    });
    document.body.classList.add('modal-open');
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    dialog.querySelector('input[name="name"]')?.focus();
  };

  const closeInquiry = () => {
    if (!dialog) return;
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  };

  inquiryTriggers.forEach((trigger) => trigger.addEventListener('click', () => openInquiry(trigger)));
  dialog?.querySelector('[data-inquiry-close]')?.addEventListener('click', closeInquiry);
  dialog?.addEventListener('click', (event) => { if (event.target === dialog) closeInquiry(); });
  dialog?.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    returnFocus?.focus();
  });

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity() || !submitButton || !status) return;

    const values = Object.fromEntries(new FormData(form).entries());
    values.consent = form.elements.consent.checked;
    values.source = window.location.pathname;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';
    status.textContent = '';
    status.className = 'inquiry-status';

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
        signal: controller.signal,
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || 'Unable to send your enquiry.');
      form.reset();
      status.textContent = 'Thank you. Your workflow enquiry has been sent to our team.';
      status.classList.add('success');
      window.trackAnalyticsEvent?.('relayvo_inquiry_submit', {
        page_path: window.location.pathname,
      });
    } catch (error) {
      status.textContent = error.name === 'AbortError'
        ? 'The request timed out. Please try again.'
        : (error.message || 'We could not send the enquiry. Please try again.');
      status.classList.add('error');
    } finally {
      window.clearTimeout(timeout);
      submitButton.disabled = false;
      submitButton.innerHTML = 'Send inquiry <span aria-hidden="true">↗</span>';
    }
  });
}
