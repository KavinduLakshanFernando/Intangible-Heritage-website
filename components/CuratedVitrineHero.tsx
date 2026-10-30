'use client';

/**
 * components/CuratedVitrineHero.tsx
 * Light Cream Heritage Hero Section
 *
 * Seamlessly integrates with the light cream navbar.
 * Responsive for Desktop, Tablet, and Mobile devices with reduced concise copy for mobile.
 */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Landmark, Compass } from 'lucide-react';
import SectionBackground from '@/components/decorations/SectionBackground';

const ROTATING_PHRASES = [
  'Preserved for Tomorrow',
  'Safeguarded for Generations',
  'Living Island Traditions',
  'Sacred Ancestral Wisdom',
];

export default function CuratedVitrineHero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState(ROTATING_PHRASES[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = ROTATING_PHRASES[phraseIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayText === currentPhrase) {
      // View for 3 seconds before rewriting
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 3000);
    } else if (isDeleting && displayText === '') {
      // Completed deletion, switch to next phrase and begin typing
      setIsDeleting(false);
      setPhraseIndex(prev => (prev + 1) % ROTATING_PHRASES.length);
    } else {
      // Typing or deleting speed
      const speed = isDeleting ? 30 : 65;
      timer = setTimeout(() => {
        setDisplayText(prev =>
          isDeleting
            ? currentPhrase.substring(0, prev.length - 1)
            : currentPhrase.substring(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex]);

  return (
    <section
      aria-label="Heritage Hero Section"
      className="heritage-section-relative hero-vitrine-section"
      style={{
        background: '#FAF6F0',
        color: '#2E1B0E',
        overflow: 'hidden',
        borderBottom: '2px solid rgba(201, 166, 107, 0.35)',
      }}
    >
      {/* ── TRADITIONAL SRI LANKAN BACKGROUND WATERMARKS ── */}
      <SectionBackground
        theme="cream"
        leftDecor="map"
        rightDecor="pattirippuwa"
        opacity={0.34}
        leftSize={580}
        rightSize={620}
      />

      <div className="container-site heritage-section-content" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          {/* Category Pill Badge */}
          <div
            className="hero-badge-pill"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'rgba(201, 166, 107, 0.18)',
              border: '1.5px solid rgba(201, 166, 107, 0.55)',
              padding: '0.38rem 1.05rem',
              borderRadius: '999px',
              marginBottom: '1.25rem',
              boxShadow: '0 2px 8px rgba(46, 27, 14, 0.04)',
            }}
          >
            <Landmark size={15} color="var(--color-accent)" />
            <span
              style={{
                color: 'var(--color-primary)',
                fontWeight: 700,
                fontSize: '0.78rem',
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
              }}
            >
              Repository for Living Traditions
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className="hero-headline"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.85rem, 5vw, 4.1rem)',
              fontWeight: 800,
              lineHeight: 1.18,
              color: 'var(--color-primary)',
              marginBottom: '1.15rem',
              letterSpacing: '-0.02em',
            }}
          >
            <span className="hero-title-main">Centuries of Living Heritage:</span>
            <span className="hero-title-accent">
              <span className="hero-title-accent-text">{displayText}</span>
              <span className="typewriter-caret" aria-hidden="true">|</span>
            </span>
          </h1>

          {/* Curated Statement (Desktop version: full editorial narrative) */}
          <p className="hero-statement-desktop">
            Explore the sacred continuum of Sri Lanka’s cultural knowledge. Discover ancient palm-leaf
            pharmacopeia, ceremonial brass casting, sacred temple frescoes, and vibrant mask theatre curated directly
            from hereditary living masters across eight cultural sanctuaries.
          </p>

          {/* Curated Statement (Mobile version: concise & punchy to reduce cognitive clutter) */}
          <p className="hero-statement-mobile">
            Discover 2,500 years of living traditions — sacred temple arts, brass casting, ritual masks, and ancestral healing systems.
          </p>

          {/* Action CTAs */}
          <div className="hero-action-buttons">
            <Link
              href="/museum"
              id="hero-vitrine-explore-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                background: 'var(--color-primary)',
                color: '#ffffff',
                fontWeight: 700,
                borderRadius: '999px',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(46, 27, 14, 0.28)',
                transition: 'all 0.2s ease',
              }}
              className="vitrine-cta-primary"
            >
              <span>Explore Digital Museum</span>
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/events"
              id="hero-vitrine-events-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: '#ffffff',
                border: '1.5px solid rgba(201, 166, 107, 0.75)',
                color: 'var(--color-primary)',
                fontWeight: 700,
                borderRadius: '999px',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(46, 27, 14, 0.06)',
                transition: 'all 0.2s ease',
              }}
              className="vitrine-cta-secondary"
            >
              <Compass size={17} color="var(--color-accent)" />
              <span>Living Cultural Events</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── STYLES & RESPONSIVE BEHAVIOR ── */}
      <style>{`
        /* ── Typography Animations ── */
        @keyframes heroBadgeEntrance {
          0% {
            opacity: 0;
            transform: translateY(12px) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes heroTitleEntrance {
          0% {
            opacity: 0;
            transform: translateY(22px);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @keyframes goldGleamFlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes heroSubtitleEntrance {
          0% {
            opacity: 0;
            transform: translateY(16px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroButtonsEntrance {
          0% {
            opacity: 0;
            transform: translateY(14px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-badge-pill {
          animation: heroBadgeEntrance 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .hero-headline {
          animation: heroTitleEntrance 0.95s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
        }

        @keyframes caretBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .typewriter-caret {
          display: inline-block;
          margin-left: 3px;
          color: var(--color-accent);
          font-weight: 300;
          animation: caretBlink 0.85s infinite;
          vertical-align: baseline;
          -webkit-text-fill-color: var(--color-accent);
          white-space: nowrap;
        }

        .hero-title-main {
          display: block;
        }

        .hero-title-accent {
          display: block;
          min-height: 1.25em;
          white-space: nowrap;
          overflow: visible;
          background: linear-gradient(
            120deg,
            #A67C38 0%,
            #C9A66B 22%,
            #FFF0CE 48%,
            #C9A66B 75%,
            #926B28 100%
          );
          background-size: 250% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: goldGleamFlow 6s ease-in-out infinite;
          position: relative;
          filter: drop-shadow(0 2px 14px rgba(201, 166, 107, 0.22));
          margin-top: 0.15rem;
        }

        .hero-title-accent-text {
          white-space: nowrap;
          display: inline-block;
        }

        .hero-statement-desktop,
        .hero-statement-mobile {
          animation: heroSubtitleEntrance 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both;
        }

        .hero-vitrine-section {
          padding-block: clamp(3.2rem, 6.5vw, 5.5rem);
        }

        .hero-action-buttons {
          display: flex;
          gap: 1.15rem;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          margin-top: 0.5rem;
          animation: heroButtonsEntrance 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
        }

        .vitrine-cta-primary {
          padding: 0.92rem 2.2rem;
          font-size: 1rem;
        }

        .vitrine-cta-secondary {
          padding: 0.92rem 2rem;
          font-size: 1rem;
        }

        .vitrine-cta-primary:hover {
          background: #180D06 !important;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(46, 27, 14, 0.4) !important;
        }

        .vitrine-cta-secondary:hover {
          background: var(--color-brown-50) !important;
          border-color: var(--color-primary) !important;
          transform: translateY(-2px);
        }

        @media (min-width: 769px) {
          .hero-statement-mobile {
            display: none !important;
          }
          .hero-statement-desktop {
            display: block !important;
            font-size: 1.12rem;
            color: var(--color-secondary);
            line-height: 1.8;
            margin-bottom: 2.25rem;
            max-width: 740px;
            margin-inline: auto;
          }
        }

        @media (max-width: 768px) {
          .hero-vitrine-section {
            padding-block: 2.5rem 2.75rem !important;
          }

          /* Ensure background vectors are subtly translucent so text remains 100% crisp & readable */
          .hero-vitrine-section .heritage-decor-wrapper {
            opacity: 0.08 !important;
          }

          .hero-badge-pill {
            padding: 0.3rem 0.85rem !important;
            margin-bottom: 1rem !important;
          }

          .hero-headline {
            font-size: clamp(1.6rem, 5.8vw, 2.2rem) !important;
            margin-bottom: 0.9rem !important;
          }

          .hero-title-accent {
            font-size: clamp(1.3rem, 5.1vw, 1.8rem) !important;
            min-height: 1.25em !important;
            white-space: nowrap !important;
          }

          .hero-statement-desktop {
            display: none !important;
          }

          .hero-statement-mobile {
            display: block !important;
            font-size: 0.92rem !important;
            color: var(--color-secondary) !important;
            line-height: 1.62 !important;
            margin-bottom: 1.6rem !important;
            max-width: 440px !important;
            margin-inline: auto !important;
            padding-inline: 0.25rem;
          }

          .hero-action-buttons {
            flex-direction: column !important;
            width: 100% !important;
            max-width: 320px !important;
            margin-inline: auto !important;
            gap: 0.7rem !important;
          }

          .vitrine-cta-primary,
          .vitrine-cta-secondary {
            width: 100% !important;
            justify-content: center !important;
            padding: 0.82rem 1.4rem !important;
            font-size: 0.92rem !important;
          }
        }
      `}</style>
    </section>
  );
}
