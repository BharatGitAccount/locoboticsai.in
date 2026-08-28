const RECIPIENT = 'bharat@locoboticsai.in';
const SUBJECT_PREFIX = 'NEW RELAYVO WORKFLOW INQUIRY';
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const rateLimits = new Map();

const clean = (value, max) => String(value ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
const cleanMultiline = (value, max) => String(value ?? '').replace(/\r/g, '').replace(/\u0000/g, '').trim().slice(0, max);
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character]);

export function validateInquiry(input = {}) {
  const inquiry = {
    name: clean(input.name, 80),
    email: clean(input.email, 254).toLowerCase(),
    phone: clean(input.phone, 30),
    company: clean(input.company, 120),
    role: clean(input.role, 100),
    companySize: clean(input.companySize, 40),
    useCase: cleanMultiline(input.useCase, 2000),
    timeline: clean(input.timeline, 40),
    source: clean(input.source, 100),
    website: clean(input.website, 200),
    consent: input.consent === true,
  };

  const errors = {};
  if (inquiry.name.length < 2) errors.name = 'Enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) errors.email = 'Enter a valid work email.';
  if (inquiry.company.length < 2) errors.company = 'Enter your company name.';
  if (inquiry.useCase.length < 20) errors.useCase = 'Describe the workflow in at least 20 characters.';
  if (!['Exploring now', 'Within 3 months', 'Within 6 months', 'Not sure yet'].includes(inquiry.timeline)) errors.timeline = 'Select a preferred timeline.';
  if (!inquiry.consent) errors.consent = 'Consent is required.';
  return { inquiry, errors, valid: Object.keys(errors).length === 0 };
}

function isAllowedOrigin(origin) {
  if (!origin) return true;
  try {
    const url = new URL(origin);
    if (url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname)) return true;
    if (url.protocol !== 'https:') return false;
    return ['www.locoboticsai.in', 'locoboticsai.in', 'locoboticsai-in.vercel.app'].includes(url.hostname)
      || /^locoboticsai-[a-z0-9-]+-ignite-x21\.vercel\.app$/.test(url.hostname);
  } catch {
    return false;
  }
}

function isRateLimited(req) {
  const forwarded = clean(req.headers?.['x-forwarded-for'], 200);
  const ip = forwarded.split(',')[0]?.trim() || clean(req.socket?.remoteAddress, 80) || 'unknown';
  const now = Date.now();
  const current = rateLimits.get(ip);
  if (!current || now - current.startedAt > WINDOW_MS) {
    rateLimits.set(ip, { count: 1, startedAt: now });
    return false;
  }
  current.count += 1;
  return current.count > MAX_REQUESTS;
}

async function readJson(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body);
  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 24_000) throw new Error('Request too large');
  }
  return JSON.parse(raw || '{}');
}

function respond(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
}

export function buildEmail(inquiry) {
  const fields = [
    ['Name', inquiry.name],
    ['Work email', inquiry.email],
    ['Phone / WhatsApp', inquiry.phone || 'Not provided'],
    ['Company', inquiry.company],
    ['Role', inquiry.role || 'Not provided'],
    ['Company size', inquiry.companySize || 'Not provided'],
    ['Timeline', inquiry.timeline],
    ['Source page', inquiry.source || 'Not provided'],
  ];
  const text = `${SUBJECT_PREFIX}\n\n${fields.map(([label, value]) => `${label}: ${value}`).join('\n')}\n\nWorkflow / use case:\n${inquiry.useCase}`;
  const rows = fields.map(([label, value]) => `<tr><th align="left" style="padding:8px 12px;background:#f3f5f2">${escapeHtml(label)}</th><td style="padding:8px 12px">${escapeHtml(value)}</td></tr>`).join('');
  const html = `<h1 style="font:600 22px Arial,sans-serif">${SUBJECT_PREFIX}</h1><table style="border-collapse:collapse;font:14px Arial,sans-serif">${rows}</table><h2 style="font:600 17px Arial,sans-serif;margin-top:24px">Workflow / use case</h2><p style="white-space:pre-wrap;font:14px/1.6 Arial,sans-serif">${escapeHtml(inquiry.useCase)}</p>`;
  return { text, html };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return respond(res, 405, { message: 'Method not allowed.' });
  if (!isAllowedOrigin(req.headers?.origin)) return respond(res, 403, { message: 'Request origin is not allowed.' });
  if (isRateLimited(req)) return respond(res, 429, { message: 'Too many enquiries. Please try again later.' });

  let input;
  try {
    input = await readJson(req);
  } catch {
    return respond(res, 400, { message: 'Invalid request.' });
  }

  const { inquiry, errors, valid } = validateInquiry(input);
  if (inquiry.website) return respond(res, 200, { ok: true });
  if (!valid) return respond(res, 422, { message: 'Please check the form fields.', errors });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.INQUIRY_FROM_EMAIL || 'Locobotics AI <onboarding@resend.dev>';
  if (!apiKey) return respond(res, 503, { message: 'The enquiry service is temporarily unavailable. Please try again later.' });

  const email = buildEmail(inquiry);
  let providerResponse;
  try {
    providerResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [RECIPIENT],
        reply_to: inquiry.email,
        subject: `${SUBJECT_PREFIX} — ${inquiry.company}`,
        text: email.text,
        html: email.html,
      }),
    });
  } catch {
    return respond(res, 502, { message: 'We could not send the enquiry. Please try again.' });
  }

  if (!providerResponse.ok) {
    console.error('Inquiry email provider rejected the request.', providerResponse.status);
    return respond(res, 502, { message: 'We could not send the enquiry. Please try again.' });
  }
  return respond(res, 200, { ok: true });
}
