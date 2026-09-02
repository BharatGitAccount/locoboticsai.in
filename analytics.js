window.dataLayer = window.dataLayer || [];

function gtag() {
  window.dataLayer.push(arguments);
}

gtag('js', new Date());
gtag('config', 'G-8756JVKPNY', {
  allow_google_signals: false,
  allow_ad_personalization_signals: false,
  anonymize_ip: true,
});

window.trackAnalyticsEvent = (name, parameters = {}) => {
  if (typeof name !== 'string' || !name) return;
  gtag('event', name, parameters);
};
