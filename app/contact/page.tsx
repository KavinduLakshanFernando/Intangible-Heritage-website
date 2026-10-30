'use client';
/**
 * app/contact/page.tsx — Contact Page
 */
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, ExternalLink } from 'lucide-react';
import SectionBackground from '@/components/decorations/SectionBackground';

/* Custom social SVG icons */

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);
const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// Note: Metadata cannot be exported from client components — it's defined separately in a layout or a server wrapper.
// We export it from a server component; this file is client for the form interactivity.

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errMsg, setErrMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrMsg('');
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 400);
  };

  return (
    <>
      {/* Page header */}
      <div
        className="heritage-section-relative"
        style={{
          background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
          paddingBlock: '4rem 3rem',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <SectionBackground theme="dark" leftDecor="punkalasa" rightDecor="pattirippuwa" opacity={0.25} />
        <div className="container-site heritage-section-content">
          <p style={{ color: 'var(--color-accent)', fontWeight: 600, fontSize: '0.85rem',
            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Get in Touch
          </p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800, marginBottom: '1rem', lineHeight: 1.15 }}>
            Contact Us
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            We would love to hear from you — whether you have a research enquiry, want to contribute to our documentation projects, or simply want to learn more about Sri Lankan heritage.
          </p>
        </div>
      </div>

      <div className="heritage-section-relative" style={{ paddingBlock: '4.5rem', background: '#FAF6F0' }}>
        <SectionBackground
          theme="cream"
          leftDecor="punkalasa"
          rightDecor="bo-leaf"
          opacity={0.18}
          leftSize={480}
          rightSize={440}
          calligraphyText="Preserving Living Wisdom"
        />
        <div className="container-site heritage-section-content">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem', alignItems: 'start' }}>

            {/* ── Contact info ────────────────────────── */}
            <div>
              <h2 className="section-title" style={{ marginBottom: '2rem' }}>Contact Information</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {[
                  {
                    icon: MapPin, label: 'Address',
                    content: '116, D. S. Senanayake Mawatha\nColombo 08\nSri Lanka',
                  },
                  {
                    icon: Phone, label: 'Phone',
                    content: '077 340 9787\n071 431 0000\n(+94 77 340 9787 / +94 71 431 0000)',
                  },
                  {
                    icon: Mail, label: 'Email',
                    content: 'info@intangibleheritage.lk\nshop@intangibleheritage.lk',
                  },
                  {
                    icon: Clock, label: 'Opening Hours',
                    content: 'By Appointment Only\n(Prior booking required)',
                  },
                ].map(({ icon: Icon, label, content }) => (
                  <div key={label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '0.5rem',
                      background: 'var(--color-brown-50)', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={20} style={{ color: 'var(--color-primary)' }} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.88rem',
                        marginBottom: '0.2rem' }}>
                        {label}
                      </p>
                      <p style={{ color: 'var(--color-secondary)', fontSize: '0.88rem',
                        lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                        {content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <h3 style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
                Follow Us
              </h3>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {[
                  { icon: FacebookIcon,  label: 'Facebook',  href: '#' },
                  { icon: InstagramIcon, label: 'Instagram', href: '#' },
                  { icon: YoutubeIcon,   label: 'YouTube',   href: '#' },
                  { icon: TwitterIcon,   label: 'Twitter',   href: '#' },
                ].map(({ icon: Icon, label, href }) => (
                  <a key={label} href={href} aria-label={label}
                    style={{
                      width: '42px', height: '42px', borderRadius: '50%',
                      background: 'var(--color-primary)', color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      textDecoration: 'none', transition: 'background 0.2s',
                    }}
                    onMouseOver={e => (e.currentTarget.style.background = 'var(--color-accent)')}
                    onMouseOut={e => (e.currentTarget.style.background = 'var(--color-primary)')}
                  >
                    <Icon />
                  </a>
                ))}
              </div>

            </div>

            {/* ── Contact form ─────────────────────────── */}
            <div>
              <h2 className="section-title" style={{ marginBottom: '2rem' }}>Send a Message</h2>
              {status === 'success' ? (
                <div style={{
                  padding: '2rem', textAlign: 'center', background: '#d1fae5',
                  borderRadius: '0.75rem', color: '#065f46',
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>✅</div>
                  <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Message Sent!</h3>
                  <p style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>
                    Thank you for reaching out. We will respond to your message within 2 working days.
                  </p>
                  <button onClick={() => setStatus('idle')} className="btn-primary"
                    style={{ marginTop: '1.25rem' }}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label htmlFor="contact-name" className="form-label">Your Name *</label>
                      <input id="contact-name" name="name" type="text" required
                        className="form-input" placeholder="Kumari Perera"
                        value={form.name} onChange={handleChange} />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="form-label">Email Address *</label>
                      <input id="contact-email" name="email" type="email" required
                        className="form-input" placeholder="you@example.com"
                        value={form.email} onChange={handleChange} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="form-label">Subject *</label>
                    <select id="contact-subject" name="subject" className="form-input" required
                      value={form.subject} onChange={handleChange}>
                      <option value="">Select a subject…</option>
                      <option>General Enquiry</option>
                      <option>Research Collaboration</option>
                      <option>Shop Order / Product Query</option>
                      <option>Event / Exhibition</option>
                      <option>Museum Submission</option>
                      <option>Volunteering / Partnership</option>
                      <option>Media / Press</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="form-label">Message *</label>
                    <textarea id="contact-message" name="message" rows={6} required
                      className="form-input" placeholder="Write your message here…"
                      style={{ resize: 'vertical' }}
                      value={form.message} onChange={handleChange} />
                  </div>

                  {status === 'error' && (
                    <div style={{ padding: '0.75rem 1rem', background: '#fee2e2',
                      borderRadius: '0.4rem', color: '#991b1b', fontSize: '0.88rem' }}>
                      ❌ {errMsg}
                    </div>
                  )}

                  <button type="submit" id="contact-submit-btn" className="btn-primary"
                    disabled={status === 'loading'}
                    style={{ alignSelf: 'flex-start', minWidth: '180px', justifyContent: 'center', display: 'flex' }}>
                    {status === 'loading'
                      ? 'Sending…'
                      : <><Send size={15} /> Send Message</>}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
