import assert from 'node:assert/strict';
import test from 'node:test';
import handler, { buildEmail, validateInquiry } from '../api/inquiry.mjs';

const validInput = {
  name: 'Asha Shah',
  email: 'asha@example.com',
  phone: '+91 99999 99999',
  company: 'Example Industries',
  role: 'Operations Director',
  companySize: '251–1,000 employees',
  useCase: 'Coordinate customer onboarding, document review, approvals, and status notifications.',
  timeline: 'Within 3 months',
  source: '/relayvo',
  website: '',
  consent: true,
};

function createResponse() {
  return {
    headers: {},
    statusCode: 0,
    setHeader(name, value) { this.headers[name] = value; },
    end(body) { this.body = body; },
  };
}

test('validates and sanitizes workflow enquiries', () => {
  const result = validateInquiry({ ...validInput, name: '  Asha\u0000 Shah  ' });
  assert.equal(result.valid, true);
  assert.equal(result.inquiry.name, 'Asha Shah');
  assert.equal(result.inquiry.email, 'asha@example.com');
});

test('rejects incomplete, invalid, or unconsented enquiries', () => {
  const result = validateInquiry({ name: 'A', email: 'bad', company: '', useCase: 'short', timeline: '', consent: false });
  assert.equal(result.valid, false);
  assert.deepEqual(Object.keys(result.errors).sort(), ['company', 'consent', 'email', 'name', 'timeline', 'useCase']);
});

test('escapes visitor content before building the email', () => {
  const { inquiry } = validateInquiry({ ...validInput, useCase: '<script>alert(1)</script> coordinate onboarding safely.' });
  const email = buildEmail(inquiry);
  assert.doesNotMatch(email.html, /<script>/);
  assert.match(email.html, /&lt;script&gt;/);
});

test('server sends a validated enquiry only to the fixed Locobotics recipient', async () => {
  const originalFetch = globalThis.fetch;
  const originalKey = process.env.RESEND_API_KEY;
  const originalFrom = process.env.INQUIRY_FROM_EMAIL;
  let outbound;
  globalThis.fetch = async (url, options) => {
    outbound = { url, options, body: JSON.parse(options.body) };
    return { ok: true, status: 200 };
  };
  process.env.RESEND_API_KEY = 'test-key';
  process.env.INQUIRY_FROM_EMAIL = 'Locobotics AI <inquiries@locoboticsai.in>';

  try {
    const req = { method: 'POST', headers: { origin: 'https://www.locoboticsai.in', 'x-forwarded-for': '203.0.113.10' }, body: validInput };
    const res = createResponse();
    await handler(req, res);
    assert.equal(res.statusCode, 200);
    assert.equal(outbound.url, 'https://api.resend.com/emails');
    assert.deepEqual(outbound.body.to, ['bharat@locoboticsai.in']);
    assert.equal(outbound.body.reply_to, validInput.email);
    assert.match(outbound.body.subject, /^NEW RELAYVO WORKFLOW INQUIRY/);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = originalKey;
    if (originalFrom === undefined) delete process.env.INQUIRY_FROM_EMAIL; else process.env.INQUIRY_FROM_EMAIL = originalFrom;
  }
});

test('server fails closed when email delivery is not configured', async () => {
  const originalKey = process.env.RESEND_API_KEY;
  delete process.env.RESEND_API_KEY;
  try {
    const req = { method: 'POST', headers: { origin: 'https://www.locoboticsai.in', 'x-forwarded-for': '203.0.113.11' }, body: validInput };
    const res = createResponse();
    await handler(req, res);
    assert.equal(res.statusCode, 503);
    assert.match(JSON.parse(res.body).message, /temporarily unavailable/);
  } finally {
    if (originalKey !== undefined) process.env.RESEND_API_KEY = originalKey;
  }
});
