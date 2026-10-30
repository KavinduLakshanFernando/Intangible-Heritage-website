/**
 * app/page.tsx — Home Page
 * Intangible Heritage: Preserving Sri Lanka's Intangible Cultural Heritage
 */
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronRight, BookOpen, CalendarDays, Sparkles, ShieldCheck, Compass } from 'lucide-react';
import categoriesData from '@/data/categories.json';
import museumData from '@/data/museum.json';
import eventsData from '@/data/events.json';
import articlesData from '@/data/articles.json';
import type { MuseumItem, Event, Article, HeritageCategoryItem } from '@/lib/types';
import { formatDate, truncate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Home — Preserving Sri Lanka’s Intangible Cultural Heritage',
  description:
    'Intangible Heritage Sri Lanka — Documenting, preserving and celebrating traditional Art, Crafts, Brassware, Masks, Traditional Medicine, Rituals, Cultural Landscapes, and Perahera Festivals.',
};

const STATS = [
  { value: '2,500+', label: 'Years of Heritage', desc: 'Living island cultural lineages' },
  { value: '8 Domains', label: 'Main Categories', desc: 'Crafts, masks, medicine & rituals' },
  { value: '1,200+', label: 'Documented Traditions', desc: 'Sacred texts & living rituals' },
  { value: '500+',   label: 'Conserved Artifacts', desc: 'Traditional lamps, tools & masks' },
];

const CORE_FOCUS_AREAS = [
  { icon: '🎨', label: 'Art', desc: 'Traditional Sri Lankan temple paintings, Sigiriya frescoes, rock murals, and classical Buddhist visual arts.' },
  { icon: '🧵', label: 'Crafts', desc: 'Hereditary handicrafts, Dumbara reed mat weaving, handloom textiles, wood carving, and traditional pottery.' },
  { icon: '🪔', label: 'Brassware', desc: 'Kandyan brass casting, standing ceremonial oil lamps (Pahana), ritual offering vessels, and lost-wax metallurgy.' },
  { icon: '🎭', label: 'Masks', desc: 'Ambalangoda folk masks, Raksha guardian masks, traditional Kolam theatre, and therapeutic Sanni Yakuma masks.' },
  { icon: '🌿', label: 'Traditional Medicine', desc: 'Ancient Hela Wedakama indigenous medicine, royal hospital ruins, palm-leaf medical texts, and medicated herbal oils.' },
  { icon: '🕯️', label: 'Rituals', desc: 'Ancient Kohomba Kankariya, Shanthikarma healing ceremonies, Bali Thovil rites, and sacred communal blessings.' },
  { icon: '🏞️', label: 'Heritage Landscapes', desc: 'Ancient hydraulic systems, Sigiriya water gardens, Ritigala forest monasteries, and sacred mountain ecosystems.' },
  { icon: '🥁', label: 'Events & Festivals', desc: 'The historic Kandy Esala Perahera, sacred tooth relic processions, ritual Ves dance, drumming, and folk festivals.' },
];

import CuratedVitrineHero from '@/components/CuratedVitrineHero';
import SectionBackground from '@/components/decorations/SectionBackground';

export default function HomePage() {
  const categories = categoriesData as HeritageCategoryItem[];
  // Featured exhibits: show Traditional Medicine highlights plus new categories
  const featured = (museumData as MuseumItem[]).slice(0, 8);
  const upcoming = (eventsData as Event[]).filter(e => e.status === 'upcoming').slice(0, 3);
  const latest = (articlesData as Article[]).slice(0, 3);

  return (
    <>
      {/* ── Option 2 Model: Curated Vitrine & Light Cream Hero ── */}
      <CuratedVitrineHero />

      {/* ── Key Statistics Bar ──────────────────────────────────── */}
      <section
        aria-label="Key statistics"
        className="heritage-section-relative stats-bar-section"
        style={{
          background: 'var(--color-primary)',
          borderBottom: '2px solid rgba(201,166,107,0.3)',
        }}
      >
        <div className="container-site heritage-section-content">
          <div className="stats-bar-grid">
            {STATS.map(stat => (
              <div key={stat.label} className="stats-bar-item">
                <div className="stats-bar-val">
                  {stat.value}
                </div>
                <div className="stats-bar-title">
                  {stat.label}
                </div>
                <div className="stats-bar-subtitle">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Heritage Categories (Image Cards) ────────── */}
      <section
        aria-label="Eight Heritage Categories"
        className="heritage-section-relative"
        style={{ background: '#fff', paddingBlock: '5rem' }}
      >
        <SectionBackground
          theme="light"
          leftDecor="mandala"
          rightDecor="pattirippuwa"
          opacity={0.20}
          leftSize={560}
          rightSize={440}
        />
        <div className="container-site heritage-section-content">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
            <p style={{
              color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.85rem',
              letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem',
            }}>
              Explore Our Living Heritage
            </p>
            <h2 className="section-title">Eight Main Heritage Categories</h2>
            <p style={{ color: 'var(--color-secondary)', fontSize: '0.98rem', marginTop: '0.5rem', lineHeight: 1.7 }}>
              Discover the profound cultural tapestry of Sri Lanka across visual arts, master craft traditions, sacred metallurgy, ritual masks, holistic healing, sacred topography, and festive spectacles.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.75rem',
          }}>
            {categories.map(cat => (
              <article key={cat.id} className="heritage-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="category-card-img"
                  />
                  <div style={{
                    position: 'absolute', top: '0.75rem', left: '0.75rem',
                    background: 'rgba(43,27,16,0.85)', backdropFilter: 'blur(4px)',
                    color: 'var(--color-accent)',
                    padding: '0.25rem 0.65rem', borderRadius: '2rem',
                    fontSize: '0.78rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem',
                  }}>
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </div>
                </div>

                <div style={{ padding: '1.4rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 700,
                    color: 'var(--color-primary)', marginBottom: '0.5rem', lineHeight: 1.3,
                  }}>
                    {cat.name}
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: 'var(--color-secondary)', lineHeight: 1.65, flex: 1, marginBottom: '1.25rem' }}>
                    {cat.shortDescription}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-brown-50)', paddingTop: '0.85rem' }}>
                    <Link
                      href={`/museum?category=${encodeURIComponent(cat.name)}`}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                        fontSize: '0.86rem', fontWeight: 700, color: 'var(--color-primary)', textDecoration: 'none',
                      }}
                      className="cat-link"
                    >
                      View Exhibits <ChevronRight size={15} />
                    </Link>
                    <Link
                      href={`/shop?category=${encodeURIComponent(cat.name)}`}
                      style={{
                        fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-accent)', textDecoration: 'none',
                      }}
                    >
                      Shop Items →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <style>{`
          .category-card-img:hover { transform: scale(1.06); }
          .cat-link:hover { color: var(--color-accent) !important; }
        `}</style>
      </section>

      {/* ── Core Focus Areas (7 Heritage Pillars) ───────────────── */}
      <section
        aria-label="Core Focus Areas"
        className="heritage-section-relative"
        style={{ background: '#FAF6F0', paddingBlock: '4.5rem' }}
      >
        <SectionBackground
          theme="cream"
          leftDecor="makara-thorana"
          rightDecor="none"
          opacity={0.18}
          leftSize={460}
        />
        <div className="container-site heritage-section-content">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem' }}>
            <p style={{
              color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.85rem',
              letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem',
            }}>
              Core Focus Areas
            </p>
            <h2 className="section-title">Domains of Intangible Heritage</h2>
            <p style={{ color: 'var(--color-secondary)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
              Safeguarding the sacred implements, living artisanal knowledge, and cultural expressions passed down through generations.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}>
            {CORE_FOCUS_AREAS.map(p => (
              <div key={p.label} className="heritage-card" style={{
                padding: '1.75rem',
                background: '#fff',
                borderRadius: '0.75rem',
                border: '1px solid rgba(92,58,33,0.1)',
                display: 'flex', flexDirection: 'column', gap: '0.65rem',
              }}>
                <div style={{ fontSize: '2.2rem' }}>{p.icon}</div>
                <h3 style={{
                  fontFamily: 'var(--font-serif)', fontSize: '1.15rem',
                  fontWeight: 700, color: 'var(--color-primary)',
                }}>
                  {p.label}
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--color-secondary)', lineHeight: 1.65 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Narrative: Preserving Living Wisdom ────────────── */}
      <section
        aria-label="About Intangible Heritage"
        className="heritage-section-relative"
        style={{ paddingBlock: '5rem', background: '#fff' }}
      >
        <SectionBackground
          theme="light"
          leftDecor="bo-leaf"
          rightDecor="crafts"
          opacity={0.20}
          leftSize={480}
          rightSize={460}
        />
        <div className="container-site heritage-section-content">
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem', alignItems: 'center',
          }}>
            <div>
              <p style={{
                color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.85rem',
                letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem',
              }}>
                Living Traditions & Wisdom
              </p>
              <h2 className="section-title" style={{ marginBottom: '1.25rem' }}>
                Custodians of Sri Lanka’s Intangible Wealth
              </h2>
              <p style={{ color: 'var(--color-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
                Sri Lanka possesses an extraordinary depth of cultural memory. Alongside our profound indigenous healing system, <strong>Hela Wedakama</strong>, pioneered by royal physicians like King Buddhadasa, the island preserves ancient rock murals, hereditary metalcraft guilds, sacred mask performances, and living ecological water landscapes.
              </p>
              <p style={{ color: 'var(--color-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                From antique ceremonial implements like the <strong>Thel Thulāva</strong> to hand-turned brass lamps, Ambalangoda masks, and ancient medical treatises written on cured palm leaves (Puskola Poth), our mission is to record, conserve, and celebrate every thread of Sri Lankan living heritage.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/about" className="btn-primary" id="home-about-link">
                  Our Mission & Mandate <ChevronRight size={16} />
                </Link>
                <Link href="/research" className="btn-secondary" id="home-research-btn">
                  Read Scholarly Research
                </Link>
              </div>
            </div>

            <div style={{
              position: 'relative', borderRadius: '1rem', overflow: 'hidden',
              aspectRatio: '4/3', boxShadow: 'var(--shadow-hover)',
            }}>
              <Image
                src="/images/hela-wedakama.jpg"
                alt="Traditional Sri Lankan heritage documentation and living wisdom"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div style={{
                position: 'absolute', bottom: '1.25rem', left: '1.25rem',
                background: 'rgba(92,58,33,0.95)', color: '#fff',
                padding: '0.6rem 1.1rem', borderRadius: '0.5rem',
                fontSize: '0.82rem', fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}>
                <ShieldCheck size={16} style={{ color: 'var(--color-accent)' }} />
                Authentic Cultural Heritage Preservation
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Museum Exhibits (Across Categories) ────────── */}
      <section
        aria-label="Featured museum items"
        className="heritage-section-relative"
        style={{ paddingBlock: '5rem', background: '#FAF6F0' }}
      >
        <SectionBackground
          theme="cream"
          leftDecor="brassware"
          rightDecor="masks"
          opacity={0.18}
          leftSize={450}
          rightSize={450}
        />
        <div className="container-site heritage-section-content">
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem',
          }}>
            <div>
              <p style={{
                color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.85rem',
                letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem',
              }}>
                Virtual Museum & Gallery
              </p>
              <h2 className="section-title">Featured Cultural & Sacred Artifacts</h2>
            </div>
            <Link href="/museum" className="btn-secondary" id="home-museum-link">
              View All Exhibits <ArrowRight size={15} />
            </Link>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.75rem',
          }}>
            {featured.map(item => (
              <article key={item.id} className="heritage-card">
                <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="card-img"
                  />
                  <div style={{
                    position: 'absolute', top: '0.75rem', left: '0.75rem',
                    background: 'var(--color-primary)', color: 'var(--color-accent)',
                    padding: '0.2rem 0.6rem', borderRadius: '0.3rem', fontSize: '0.72rem', fontWeight: 700,
                  }}>
                    {item.heritageCategory || item.category}
                  </div>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 700,
                    color: 'var(--color-primary)', marginBottom: '0.5rem', lineHeight: 1.3,
                  }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-secondary)', lineHeight: 1.6 }}>
                    {truncate(item.description, 20)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <style>{`.card-img:hover { transform: scale(1.05); }`}</style>
      </section>

      {/* ── Upcoming Events & Workshops (Across Categories) ─────── */}
      <section
        aria-label="Upcoming events"
        className="heritage-section-relative"
        style={{ paddingBlock: '5rem', background: '#fff' }}
      >
        <SectionBackground
          theme="light"
          leftDecor="drums"
          rightDecor="perahera"
          calligraphyText="Living Pageantry & Sacred Rites"
          opacity={0.20}
          leftSize={460}
          rightSize={440}
        />
        <div className="container-site heritage-section-content">
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem',
          }}>
            <div>
              <p style={{
                color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.85rem',
                letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem',
              }}>
                Education & Programs
              </p>
              <h2 className="section-title">Heritage Programs & Events</h2>
            </div>
            <Link href="/events" className="btn-secondary" id="home-events-link">
              All Events & Workshops <ArrowRight size={15} />
            </Link>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.75rem',
          }}>
            {upcoming.map(event => (
              <article key={event.id} className="heritage-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div style={{
                    position: 'absolute', top: '0.75rem', left: '0.75rem',
                    background: 'var(--color-accent)', color: 'var(--color-primary)',
                    padding: '0.25rem 0.65rem', borderRadius: '0.3rem', fontSize: '0.75rem', fontWeight: 700,
                  }}>
                    {event.heritageCategory || event.category}
                  </div>
                </div>
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 700,
                    color: 'var(--color-primary)', marginBottom: '0.5rem', lineHeight: 1.35,
                  }}>
                    {event.title}
                  </h3>
                  <div style={{
                    fontSize: '0.82rem', color: 'var(--color-secondary)', display: 'flex',
                    flexDirection: 'column', gap: '0.25rem', marginBottom: '0.85rem',
                  }}>
                    <span><CalendarDays size={13} style={{ display: 'inline', marginRight: '5px' }} />
                      {formatDate(event.date)}
                    </span>
                    <span>📍 {event.venue}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-secondary)', lineHeight: 1.6, flex: 1 }}>
                    {truncate(event.description, 20)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest Research & Scholarly Papers ──────────────────── */}
      <section
        aria-label="Latest research articles"
        className="heritage-section-relative"
        style={{ paddingBlock: '5rem', background: '#FAF6F0' }}
      >
        <SectionBackground
          theme="cream"
          leftDecor="palm-leaf"
          rightDecor="none"
          opacity={0.18}
          leftSize={500}
        />
        <div className="container-site heritage-section-content">
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem',
          }}>
            <div>
              <p style={{
                color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.85rem',
                letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem',
              }}>
                Scientific & Cultural Research
              </p>
              <h2 className="section-title">Latest Publications</h2>
            </div>
            <Link href="/research" className="btn-secondary" id="home-research-link">
              View All Publications <ArrowRight size={15} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {latest.map(article => (
              <article key={article.id} className="heritage-card"
                style={{ padding: '1.75rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{
                  background: 'var(--color-primary)', color: 'var(--color-accent)',
                  borderRadius: '0.75rem', padding: '0.9rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <BookOpen size={26} />
                </div>
                <div style={{ flex: 1, minWidth: '220px' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                    <span className="badge" style={{ fontSize: '0.72rem', background: 'var(--color-primary)', color: '#fff' }}>
                      {article.heritageCategory || 'Heritage'}
                    </span>
                    {article.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="badge" style={{ fontSize: '0.72rem' }}>{tag}</span>
                    ))}
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 700,
                    color: 'var(--color-primary)', marginBottom: '0.35rem', lineHeight: 1.35,
                  }}>
                    {article.title}
                  </h3>
                  <p style={{ fontSize: '0.83rem', color: 'var(--color-accent)', fontWeight: 600, marginBottom: '0.5rem' }}>
                    {article.author} · {formatDate(article.date)}
                  </p>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-secondary)', lineHeight: 1.65 }}>
                    {truncate(article.abstract, 28)}
                  </p>
                  <Link href={`/research/${article.slug}`} style={{
                    display: 'inline-flex', alignItems: 'center',
                    gap: '0.3rem', marginTop: '0.85rem', fontSize: '0.85rem', fontWeight: 600,
                    color: 'var(--color-primary)', textDecoration: 'none',
                  }}>
                    Read Full Paper <ChevronRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────────────── */}
      <section
        aria-label="Support Sri Lankan Heritage"
        className="heritage-section-relative"
        style={{
          position: 'relative',
          background: 'linear-gradient(135deg, var(--color-primary) 0%, #3a1e0c 100%)',
          paddingBlock: '4.5rem',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <SectionBackground
          theme="dark"
          leftDecor="punkalasa"
          rightDecor="stupa-monument"
          opacity={0.25}
          leftSize={460}
          rightSize={420}
        />
        <div className="container-site heritage-section-content">
          <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1rem' }}>🏛️</span>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 4vw, 2.4rem)',
            color: '#fff', fontWeight: 700, marginBottom: '1rem',
          }}>
            Safeguarding Sri Lanka’s Living Cultural Heritage
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.88)', maxWidth: '640px', margin: '0 auto 2.25rem',
            lineHeight: 1.75, fontSize: '1.05rem',
          }}>
            Support traditional master artisans, acquire certified handcrafted brassware, decorative masks, and herbal oils, or partner with us in the scholarly digital preservation of ancient manuscripts and sacred monuments.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }} className="home-cta-button-group">
            <Link href="/shop" className="btn-accent" id="home-shop-cta">
              Visit Cultural Marketplace
            </Link>
            <Link href="/contact" className="btn-secondary"
              style={{ borderColor: 'rgba(255,255,255,0.6)', color: '#fff' }} id="home-contact-cta">
              Partner with the Institute
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .stats-bar-section {
          padding-block: 2.25rem;
        }
        .stats-bar-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          text-align: center;
        }
        .stats-bar-item {
          color: #fff;
        }
        .stats-bar-val {
          font-family: var(--font-serif);
          font-size: clamp(1.8rem, 3.2vw, 2.75rem);
          font-weight: 800;
          color: var(--color-accent);
          line-height: 1;
          margin-bottom: 0.35rem;
        }
        .stats-bar-title {
          font-size: 0.95rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
          color: #ffffff;
        }
        .stats-bar-subtitle {
          font-size: 0.78rem;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.4;
        }

        @media (max-width: 900px) {
          .stats-bar-section {
            padding-block: 1.5rem !important;
          }
          .stats-bar-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.25rem 0.75rem !important;
          }
          .stats-bar-val {
            font-size: 1.65rem !important;
            margin-bottom: 0.2rem !important;
          }
          .stats-bar-title {
            font-size: 0.82rem !important;
            line-height: 1.25 !important;
            margin-bottom: 0.15rem !important;
          }
          .stats-bar-subtitle {
            font-size: 0.68rem !important;
            line-height: 1.25 !important;
            opacity: 0.75 !important;
          }
          .stats-bar-section .heritage-decor-wrapper {
            opacity: 0.08 !important;
          }
          .home-cta-button-group {
            flex-direction: column !important;
            align-items: center !important;
          }
          .home-cta-button-group a {
            width: 100% !important;
            max-width: 320px !important;
            text-align: center !important;
            justify-content: center !important;
          }
        }

        @media (max-width: 480px) {
          .stats-bar-section {
            padding-block: 1.2rem !important;
          }
          .stats-bar-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.95rem 0.5rem !important;
          }
          .stats-bar-val {
            font-size: 1.45rem !important;
          }
          .stats-bar-title {
            font-size: 0.76rem !important;
          }
          .stats-bar-subtitle {
            font-size: 0.65rem !important;
          }
        }
      `}</style>
    </>
  );
}


