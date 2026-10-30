'use client';
/**
 * app/museum/MuseumClient.tsx
 * Client component for gallery filtering across all 7 heritage categories, lightbox, and details.
 */
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { X, ZoomIn, Filter, Tag, Calendar, User } from 'lucide-react';
import type { MuseumItem } from '@/lib/types';
import { HERITAGE_CATEGORIES } from '@/lib/types';
import MuseumCategoryDecor from '@/components/decorations/MuseumCategoryDecor';

const CATEGORY_FILTERS = ['All', ...HERITAGE_CATEGORIES] as const;

interface Props { initialItems: MuseumItem[]; }

export default function MuseumClient({ initialItems }: Props) {
  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams.get('category');

  const [items] = useState<MuseumItem[]>(initialItems);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightbox, setLightbox] = useState<MuseumItem | null>(null);

  // Sync category from URL parameter if present
  useEffect(() => {
    if (initialCategoryParam) {
      const matched = CATEGORY_FILTERS.find(
        c => c.toLowerCase() === initialCategoryParam.toLowerCase()
      );
      if (matched) {
        setActiveCategory(matched);
      }
    }
  }, [initialCategoryParam]);

  // ── Filter matching logic (with full backward-compatibility for Traditional Medicine & Ayurveda) ──
  const filtered = items.filter(item => {
    if (activeCategory === 'All') return true;

    if (activeCategory === 'Traditional Medicine' || activeCategory === 'Ayurveda') {
      return (
        item.heritageCategory === 'Traditional Medicine' ||
        item.heritageCategory === 'Ayurveda' ||
        item.category === 'Medical Implements' ||
        item.category === 'Indigenous Medicine' ||
        item.category === 'Manuscripts' ||
        item.category === 'Ritual Healing'
      );
    }

    return (
      item.heritageCategory === activeCategory ||
      (item.category && item.category.toLowerCase().includes(activeCategory.toLowerCase()))
    );
  });

  return (
    <div className="heritage-section-relative" style={{ position: 'relative', width: '100%', minHeight: '680px' }}>
      {/* ── Dynamic Category Decorative Background ── */}
      <MuseumCategoryDecor category={activeCategory} opacity={0.22} />


      <div className="heritage-section-content">
        {/* ── Category filter ─────────────────────────────── */}
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '2.5rem' }}>

        <Filter size={18} style={{ color: 'var(--color-primary)', marginRight: '0.2rem' }} />
        {CATEGORY_FILTERS.map(cat => (
          <button
            key={cat}
            id={`filter-${cat.toLowerCase().replace(/[\s&]+/g, '-')}`}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '0.45rem 1.15rem', borderRadius: '999px', fontSize: '0.86rem', fontWeight: 600,
              border: '1.5px solid',
              borderColor: activeCategory === cat ? 'var(--color-primary)' : 'var(--color-brown-100)',
              background: activeCategory === cat ? 'var(--color-primary)' : '#fff',
              color: activeCategory === cat ? '#fff' : 'var(--color-text)',
              cursor: 'pointer', transition: 'all 0.2s',
              boxShadow: activeCategory === cat ? '0 2px 8px rgba(92,58,33,0.2)' : 'none',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Results count ─────────────────────────────────── */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--color-secondary)', fontSize: '0.88rem' }}>
        <span>Showing <strong>{filtered.length}</strong> exhibits in <strong>{activeCategory}</strong></span>
        {activeCategory !== 'All' && (
          <button
            onClick={() => setActiveCategory('All')}
            style={{ background: 'none', border: 'none', color: 'var(--color-accent)', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
          >
            Show All Exhibits
          </button>
        )}
      </div>

      {/* ── Gallery grid ─────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--color-secondary)', padding: '4rem', background: '#fff', borderRadius: '1rem' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>No items in this category yet.</p>
          <button onClick={() => setActiveCategory('All')} className="btn-secondary" style={{ marginTop: '1rem' }}>
            View All Categories
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.75rem' }}>
          {filtered.map(item => (
            <article key={item.id} className="heritage-card" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
              onClick={() => setLightbox(item)}
              onKeyDown={e => e.key === 'Enter' && setLightbox(item)}
              tabIndex={0}
              role="button"
              aria-label={`View ${item.title} in lightbox`}
            >
              <div style={{ position: 'relative', aspectRatio: '3/2', overflow: 'hidden' }}>
                <Image src={item.image} alt={item.title} fill
                  style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="gallery-img"
                />
                <div style={{
                  position: 'absolute', inset: 0, background: 'rgba(43,27,16,0)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.25s',
                }} className="gallery-overlay">
                  <ZoomIn size={36} style={{ color: '#fff', opacity: 0, transition: 'opacity 0.25s' }} className="zoom-icon" />
                </div>
                <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  <span style={{
                    background: 'var(--color-primary)', color: 'var(--color-accent)',
                    padding: '0.2rem 0.6rem', borderRadius: '0.3rem', fontSize: '0.72rem', fontWeight: 700,
                  }}>
                    {item.heritageCategory || item.category}
                  </span>
                </div>
              </div>
              <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.76rem', color: 'var(--color-accent)', fontWeight: 600, marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {item.category}
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 700,
                  color: 'var(--color-primary)', lineHeight: 1.35, marginBottom: '0.4rem' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--color-secondary)', lineHeight: 1.6, flex: 1 }}>
                  {item.description.slice(0, 115)}…
                </p>
                {item.year && (
                  <div style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: 'var(--color-secondary)', borderTop: '1px solid var(--color-brown-50)', paddingTop: '0.5rem' }}>
                    Record Date / Era: <strong>{item.year}</strong>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* ── Lightbox Modal ───────────────────────────────── */}
      {lightbox && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true"
          aria-label={lightbox.title} onClick={() => setLightbox(null)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: '#fff', borderRadius: '1rem', overflow: 'hidden',
            maxWidth: '860px', width: '100%', maxHeight: '90vh',
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{ position: 'relative', aspectRatio: '16/9', flexShrink: 0 }}>
              <Image src={lightbox.image} alt={lightbox.title} fill
                style={{ objectFit: 'cover' }} sizes="860px" priority />
              <button onClick={() => setLightbox(null)} aria-label="Close lightbox"
                style={{
                  position: 'absolute', top: '0.75rem', right: '0.75rem',
                  background: 'rgba(43,27,16,0.7)', color: '#fff', border: 'none',
                  borderRadius: '50%', width: '38px', height: '38px',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                <X size={20} />
              </button>
              <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', gap: '0.4rem' }}>
                <span style={{
                  background: 'var(--color-accent)', color: 'var(--color-primary)',
                  padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700,
                }}>
                  {lightbox.heritageCategory || lightbox.category}
                </span>
                {lightbox.heritageCategory && (
                  <span style={{
                    background: 'rgba(255,255,255,0.92)', color: 'var(--color-primary)',
                    padding: '0.25rem 0.65rem', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 600,
                  }}>
                    {lightbox.category}
                  </span>
                )}
              </div>
            </div>
            <div style={{ padding: '1.75rem 2rem', overflowY: 'auto' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 700,
                color: 'var(--color-primary)', marginBottom: '0.85rem', lineHeight: 1.3 }}>
                {lightbox.title}
              </h2>
              <p style={{ color: 'var(--color-secondary)', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '1.25rem' }}>
                {lightbox.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', fontSize: '0.84rem', color: 'var(--color-accent)', fontWeight: 600, borderTop: '1px solid var(--color-brown-50)', paddingTop: '0.85rem' }}>
                {lightbox.photographer && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <User size={14} /> Curated Archive: {lightbox.photographer}
                  </span>
                )}
                {lightbox.year && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={14} /> Documentation Year: {lightbox.year}
                  </span>
                )}
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Tag size={14} /> Domain: {lightbox.heritageCategory || lightbox.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .gallery-img { transform: scale(1); }
        article:hover .gallery-img { transform: scale(1.06); }
        article:hover .gallery-overlay { background: rgba(43,27,16,0.35) !important; }
        article:hover .zoom-icon { opacity: 1 !important; }
      `}</style>
      </div>
    </div>
  );
}

