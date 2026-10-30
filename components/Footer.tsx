'use client';
/**
 * components/Footer.tsx
 * Site-wide footer with logo, description, categories, quick links, contact, and social links.
 */
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { HERITAGE_CATEGORIES } from '@/lib/types';

/* Custom SVG social icons */
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);
const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const QUICK_LINKS = [
  { label: 'Home',                href: '/' },
  { label: 'About Us',            href: '/about' },
  { label: 'Museum',              href: '/museum' },
  { label: 'Events',              href: '/events' },
  { label: 'Shop',                href: '/shop' },
  { label: 'Research & Articles', href: '/research' },
  { label: 'Contact Us',          href: '/contact' },
  { label: 'Admin Portal',        href: '/admin' },
];

const SOCIAL = [
  { label: 'Facebook',  href: '#', icon: FacebookIcon },
  { label: 'Instagram', href: '#', icon: InstagramIcon },
  { label: 'YouTube',   href: '#', icon: YoutubeIcon },
  { label: 'Twitter',   href: '#', icon: TwitterIcon },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-primary)', color: '#fff', marginTop: '5rem' }}>
      <div className="container-site" style={{ paddingBlock: '3.5rem 2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem',
        }}>
          {/* Brand */}
          <div style={{ maxWidth: '320px' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: 'var(--color-accent)',
                display: 'block',
                lineHeight: 1.2,
              }}>
                Intangible Heritage
              </span>
              <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Sri Lanka
              </span>
            </Link>
            <p style={{ marginTop: '1rem', fontSize: '0.88rem', color: 'rgba(255,255,255,0.78)', lineHeight: 1.7 }}>
              Preserving, documenting, and scientifically safeguarding the living intangible cultural heritage of Sri Lanka — traditional visual arts, crafts, sacred brassware, ritual masks, Hela Wedakama healing traditions, cultural landscapes, and festival pageantry.
            </p>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
              {SOCIAL.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} aria-label={label}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)',
                    transition: 'background 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseOver={e => (e.currentTarget.style.background = 'var(--color-accent)')}
                  onMouseOut={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Heritage Categories */}
          <div>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.08em', color: 'var(--color-accent)', marginBottom: '1rem' }}>
              Heritage Categories
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {HERITAGE_CATEGORIES.map(cat => (
                <li key={cat}>
                  <Link
                    href={`/museum?category=${encodeURIComponent(cat)}`}
                    style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.15s' }}
                    onMouseOver={e => (e.currentTarget.style.color = 'var(--color-accent)')}
                    onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.08em', color: 'var(--color-accent)', marginBottom: '1rem' }}>
              Quick Links
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {QUICK_LINKS.map(link => (
                <li key={link.href}>
                  <Link href={link.href} style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none',
                    fontSize: '0.9rem', transition: 'color 0.15s' }}
                    onMouseOver={e => (e.currentTarget.style.color = 'var(--color-accent)')}
                    onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.08em', color: 'var(--color-accent)', marginBottom: '1rem' }}>
              Contact Us
            </h3>
            <address style={{ fontStyle: 'normal', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { icon: MapPin, text: '116, D. S. Senanayake Mawatha,\nColombo 08, Sri Lanka' },
                { icon: Phone, text: '077 340 9787\n071 431 0000' },
                { icon: Mail,  text: 'info@intangibleheritage.lk' },
                { icon: Clock, text: 'By Appointment Only' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                  <Icon size={15} style={{ color: 'var(--color-accent)', marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem', lineHeight: 1.55, whiteSpace: 'pre-line' }}>
                    {text}
                  </span>
                </div>
              ))}
            </address>
          </div>
        </div>

        {/* Bottom copyright */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.8rem',
          color: 'rgba(255,255,255,0.5)',
        }}>
          <p style={{ margin: 0 }}>
            © 2026 Intangible Heritage Sri Lanka. All rights reserved. Safeguarding living traditions, arts, and traditional medicine.
          </p>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <Link href="/about" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>About Us</Link>
            <Link href="/contact" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Contact</Link>
            <Link href="/admin" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
