'use client';

/**
 * components/HeroSlider.tsx
 * Hero banner with auto-sliding background showcasing Sri Lankan cultural heritage:
 * Art, Heritage Landscapes, Brassware, Events & Festivals, and Hela Wedakama.
 */
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    image: '/images/traditional-art.jpg',
    alt: 'Traditional Sri Lankan temple murals, classical arts and cultural heritage',
    tag: 'Temple Art & Classical Murals',
  },
  {
    image: '/images/heritage-landscapes.jpg',
    alt: 'Ancient Sigiriya fortress, sacred water gardens, and cultural landscapes',
    tag: 'Sacred Landscapes & Sigiriya',
  },
  {
    image: '/images/brassware-craft.jpg',
    alt: 'Ornate Kandyan brass ceremonial lamps and metalcraft heritage',
    tag: 'Sacred Metallurgy & Brassware',
  },
  {
    image: '/images/perahera-festival.jpg',
    alt: 'Kandy Esala Perahera festival procession with adorned tuskers and drummers',
    tag: 'Perahera & Living Pageantry',
  },
  {
    image: '/images/hela-wedakama.jpg',
    alt: 'Traditional Hela Wedakama apothecary, herbs, and ancient healing wisdom',
    tag: 'Hela Wedakama & Indigenous Medicine',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent(prev => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent(prev => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Auto-slide every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section
      aria-label="Hero banner with background slider"
      style={{
        position: 'relative',
        height: 'min(92vh, 740px)',
        overflow: 'hidden',
      }}
    >
      {/* ── Background Sliding Images ── */}
      {SLIDES.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={slide.image}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: isActive ? 1 : 0,
              transition: 'opacity 1.2s ease-in-out, transform 7s ease-out',
              transform: isActive ? 'scale(1.04)' : 'scale(1)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
              style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
              sizes="100vw"
            />
          </div>
        );
      })}

      {/* ── Gradient Overlay for Text Readability ── */}
      <div
        className="hero-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to right, rgba(43,27,16,0.94) 0%, rgba(43,27,16,0.82) 55%, rgba(43,27,16,0.48) 100%)',
          display: 'flex',
          alignItems: 'center',
          zIndex: 1,
        }}
      >
        <div className="container-site" style={{ position: 'relative', width: '100%' }}>
          <div style={{ maxWidth: '720px' }}>
            {/* Category Tag Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(201, 166, 107, 0.22)',
                border: '1px solid rgba(201, 166, 107, 0.5)',
                padding: '0.35rem 0.95rem',
                borderRadius: '2rem',
                marginBottom: '1.25rem',
              }}
            >
              <Sparkles size={14} style={{ color: 'var(--color-accent)' }} />
              <span
                style={{
                  color: 'var(--color-accent)',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                Sri Lankan Intangible Cultural Heritage
              </span>
            </div>

            {/* Main Heading */}
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.3rem, 5.5vw, 3.8rem)',
                color: '#fff',
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: '1.25rem',
              }}
            >
              Living Treasures &<br />
              <span style={{ color: 'var(--color-accent)' }}>Cultural Wisdom</span> of Sri Lanka
            </h1>

            {/* Description */}
            <p
              style={{
                color: 'rgba(255,255,255,0.92)',
                fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                lineHeight: 1.75,
                marginBottom: '2rem',
                maxWidth: '620px',
              }}
            >
              Dedicated to safeguarding, documenting, and celebrating the living soul of Sri Lanka — from classical temple art, master handicrafts, brassware, and ritual masks to ancient Hela Wedakama & traditional medicine, sacred landscapes, and majestic peraheras.
            </p>

            {/* Call To Actions */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link href="/museum" className="btn-accent" id="hero-cta-museum">
                Explore Heritage Museum <ArrowRight size={16} />
              </Link>
              <Link
                href="/shop"
                className="btn-secondary"
                style={{ borderColor: 'rgba(255,255,255,0.7)', color: '#fff' }}
                id="hero-cta-shop"
              >
                Heritage Marketplace & Crafts
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Slide Controls & Indicator Bar ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.75rem',
          right: '2rem',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          background: 'rgba(43,27,16,0.65)',
          backdropFilter: 'blur(8px)',
          padding: '0.5rem 1rem',
          borderRadius: '2rem',
          border: '1px solid rgba(201,166,107,0.3)',
        }}
      >
        {/* Current slide subtitle */}
        <span
          className="hidden-mobile"
          style={{
            color: 'var(--color-accent)',
            fontSize: '0.78rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            maxWidth: '180px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {SLIDES[current].tag}
        </span>

        {/* Previous Button */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.2rem',
            opacity: 0.8,
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0.8')}
        >
          <ChevronLeft size={18} />
        </button>

        {/* Slide Indicators Dots */}
        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.image}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}: ${slide.tag}`}
              style={{
                width: idx === current ? '22px' : '8px',
                height: '8px',
                borderRadius: '999px',
                background: idx === current ? 'var(--color-accent)' : 'rgba(255,255,255,0.4)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.2rem',
            opacity: 0.8,
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0.8')}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
