/**
 * app/about/page.tsx — About Us Page
 * Intangible Heritage: Preserving Sri Lanka's Intangible Cultural Heritage
 */
import type { Metadata } from 'next';
import Image from 'next/image';
import { Heart, Eye, Target, Sparkles, Award, BookOpen, ShieldCheck } from 'lucide-react';
import SectionBackground from '@/components/decorations/SectionBackground';


export const metadata: Metadata = {
  title: 'About Us — Preserving Sri Lankan Intangible Cultural Heritage',
  description:
    'Learn about Intangible Heritage Sri Lanka — our mission, history, and commitment to safeguarding Art, Crafts, Brassware, Masks, Traditional Medicine, Rituals, Cultural Landscapes, and Perahera Festivals.',
};

const HERITAGE_TYPES = [
  { emoji: '🎨', title: 'Art & Classical Murals', desc: 'Preserving 5th-century Sigiriya frescoes, rock-cut Dambulla murals, and Kandyan-era mineral pigment painting traditions.' },
  { emoji: '🧵', title: 'Crafts & Living Guilds', desc: 'Safeguarding hereditary crafts: Dumbara reed mat weaving, Kelaniya terracotta pottery, handloom textiles, and wood carving.' },
  { emoji: '🪔', title: 'Brassware & Metallurgy', desc: 'Conserving historical brass casting, ceremonial oil lamps (Pahana), ritual trays, and lost-wax metallurgical knowledge.' },
  { emoji: '🎭', title: 'Masks & Ritual Theatre', desc: 'Documenting Kaduru wood carving, Ambalangoda folk masks, Raksha protector masks, Kolam drama, and healing Sanni Yakuma traditions.' },
  { emoji: '🌿', title: 'Traditional Medicine & Hela Wedakama', desc: 'Safeguarding 2,500 years of indigenous medicine, King Buddhadasa’s manuscripts (Puskola Poth), Thel Thulāva vessels, and herbal pharmacopeias.' },
  { emoji: '🕯️', title: 'Rituals & Shanthikarma', desc: 'Safeguarding Kohomba Kankariya, Bali Thovil healing ceremonies, Gam Madu harvest rituals, and sacred spiritual incantations.' },
  { emoji: '🏞️', title: 'Heritage Landscapes', desc: 'Safeguarding historical cultural landscapes: ancient hydraulic cascade tanks (Wewa), Sigiriya water gardens, and Ritigala forest sanctuaries.' },
  { emoji: '🥁', title: 'Perahera & Festival Rituals', desc: 'Documenting the living pageantry of the Kandy Esala Perahera, sacred tooth relic processions, ritual drumming, and island folk celebrations.' },
];

const TEAM = [
  { name: 'Prof. Ariyasena Wickramarachchi', title: 'Executive Director & Cultural Historian', bg: '#5C3A21' },
  { name: 'Dr. (Wedamahathmaya) K. B. Rathnayake', title: 'Head of Traditional Pharmacopeia & Hela Wedakama', bg: '#8B5E3C' },
  { name: 'Dr. Manel Hettiarachchi', title: 'Senior Curator of Cultural Archaeology & Metallurgy', bg: '#C9A66B' },
  { name: 'Ven. Medhananda Thero', title: 'Director of Palm-Leaf Manuscript Conservation', bg: '#A07850' },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Page Header ────────────────────────────────────────── */}
      <div
        className="heritage-section-relative"
        style={{
          background: 'linear-gradient(135deg, var(--color-primary) 0%, #3d2110 100%)',
          paddingBlock: '4.5rem 3.5rem',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <SectionBackground theme="dark" leftDecor="map" rightDecor="pattirippuwa" opacity={0.25} />
        <div className="container-site heritage-section-content">
          <p style={{
            color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.85rem',
            letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem',
          }}>
            Institutional Overview
          </p>
          <h1 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
            fontWeight: 800, marginBottom: '1rem', lineHeight: 1.15,
          }}>
            About Intangible Heritage Sri Lanka
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.88)', maxWidth: '680px', margin: '0 auto',
            lineHeight: 1.75, fontSize: '1.05rem',
          }}>
            A national institution dedicated to safeguarding, scientific documentation, and living practice of Sri Lanka’s intangible cultural heritage — traditional visual arts, crafts, sacred brassware, ritual masks, Hela Wedakama healing wisdom, cultural landscapes, and sacred festival pageantry.
          </p>
        </div>
      </div>

      {/* ── Our Story ──────────────────────────────────────────── */}
      <section
        aria-label="Our story"
        className="heritage-section-relative"
        style={{ paddingBlock: '5rem', background: '#fff' }}
      >
        <SectionBackground
          theme="light"
          leftDecor="stupa-monument"
          rightDecor="mandala"
          opacity={0.20}
          leftSize={480}
          rightSize={520}
        />
        <div className="container-site heritage-section-content">
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem', alignItems: 'center',
          }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.85rem',
                textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem',
              }}>
                <Sparkles size={14} /> Our Genesis & Mandate
              </div>
              <h2 className="section-title" style={{ marginBottom: '1.25rem' }}>
                Safeguarding Living Memory and Sacred Arts
              </h2>
              <p style={{ color: 'var(--color-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
                Founded in 2008 by a council of cultural scholars, hereditary physicians (Wedamahathwaru), and archaeological curators, <strong>Intangible Heritage</strong> began as a nationwide initiative to rescue deteriorating palm-leaf (Puskola) manuscripts and rare ceremonial implements like the <strong>Thel Thulāva</strong> oil vessel.
              </p>
              <p style={{ color: 'var(--color-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
                Over the years, this vital preservation mandate expanded to embrace the full spectrum of Sri Lanka’s intangible cultural heritage: supporting hereditary craft guilds in the Dumbara valley, master woodcarvers in Ambalangoda, traditional brass founders in Pilimathalawa, temple mural conservators, and custodians of sacred festival processions like the Kandy Esala Perahera.
              </p>
              <p style={{ color: 'var(--color-secondary)', lineHeight: 1.8 }}>
                Working in synergy with national universities and UNESCO intangible cultural heritage frameworks, we bridge historical scholarship with living communities, ensuring Sri Lanka’s cultural heritage thrives for future generations.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ position: 'relative', borderRadius: '0.75rem', overflow: 'hidden', aspectRatio: '1/1' }}>
                <Image src="/images/traditional-art.jpg" alt="Traditional Sri Lankan temple murals" fill
                  style={{ objectFit: 'cover' }} sizes="300px" />
              </div>
              <div style={{ position: 'relative', borderRadius: '0.75rem', overflow: 'hidden', aspectRatio: '1/1', marginTop: '1.5rem' }}>
                <Image src="/images/brassware-craft.jpg" alt="Antique Sri Lankan brassware" fill
                  style={{ objectFit: 'cover' }} sizes="300px" />
              </div>
              <div style={{ position: 'relative', borderRadius: '0.75rem', overflow: 'hidden', aspectRatio: '1/1', marginTop: '-1.5rem' }}>
                <Image src="/images/mask-carving.jpg" alt="Traditional mask carving" fill
                  style={{ objectFit: 'cover' }} sizes="300px" />
              </div>
              <div style={{ position: 'relative', borderRadius: '0.75rem', overflow: 'hidden', aspectRatio: '1/1' }}>
                <Image src="/images/hela-wedakama.jpg" alt="Hela Wedakama traditional healing" fill
                  style={{ objectFit: 'cover' }} sizes="300px" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ───────────────────────────────────── */}
      <section
        aria-label="Mission and vision"
        className="heritage-section-relative"
        style={{ background: '#FAF6F0', paddingBlock: '5rem' }}
      >
        <SectionBackground
          theme="cream"
          leftDecor="bo-leaf"
          rightDecor="punkalasa"
          opacity={0.18}
          leftSize={450}
          rightSize={450}
        />
        <div className="container-site heritage-section-content">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              {
                icon: Target,
                label: 'Our Mission',
                color: 'var(--color-primary)',
                text: 'To scientifically document, conserve, and revitalize Sri Lanka’s traditional arts, master crafts, brassware, masks, indigenous medical wisdom (Hela Wedakama), and sacred cultural landscapes, ensuring generational knowledge remains vibrant, verified, and accessible worldwide.',
              },
              {
                icon: Eye,
                label: 'Our Vision',
                color: 'var(--color-secondary)',
                text: 'A global landscape where Sri Lanka’s living cultural treasures, indigenous science, and sacred arts are celebrated, safeguarded, and recognized as an invaluable heritage of humanity.',
              },
              {
                icon: Heart,
                label: 'Our Core Values',
                color: '#C9A66B',
                text: 'Scientific Integrity · Respect for Hereditary Masters · Sustainable Craft Ecology · Rigorous Archival Standards · Intergenerational Transmission · Community Empowerment and Ethical Cultural Preservation.',
              },
            ].map(({ icon: Icon, label, color, text }) => (
              <div key={label} className="heritage-card" style={{ padding: '2.25rem', background: '#fff' }}>
                <div style={{
                  width: '54px', height: '54px', borderRadius: '0.75rem',
                  background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}>
                  <Icon size={26} style={{ color }} />
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700,
                  color: 'var(--color-primary)', marginBottom: '0.75rem',
                }}>
                  {label}
                </h3>
                <p style={{ color: 'var(--color-secondary)', lineHeight: 1.75, fontSize: '0.92rem' }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Domains of Intangible Heritage (8 Categories) ──────── */}
      <section
        aria-label="Domains of cultural heritage"
        className="heritage-section-relative"
        style={{ paddingBlock: '5rem', background: '#fff' }}
      >
        <SectionBackground
          theme="light"
          leftDecor="crafts"
          rightDecor="brassware"
          opacity={0.20}
          leftSize={460}
          rightSize={440}
        />
        <div className="container-site heritage-section-content">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title">Eight Domains of Sri Lankan Cultural Heritage</h2>
            <p className="section-subtitle" style={{ maxWidth: '640px', margin: '0.75rem auto 0' }}>
              Recognized under UNESCO intangible cultural heritage frameworks, these eight domains represent the living soul and artistic genius of Sri Lanka.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1.75rem' }}>
            {HERITAGE_TYPES.map(h => (
              <div key={h.title} className="heritage-card" style={{ padding: '1.75rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '2.2rem', flexShrink: 0 }}>{h.emoji}</span>
                <div>
                  <h3 style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.35rem', fontSize: '1.05rem' }}>
                    {h.title}
                  </h3>
                  <p style={{ color: 'var(--color-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                    {h.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership & Advisory Council ──────────────────────── */}
      <section
        aria-label="Leadership team"
        className="heritage-section-relative"
        style={{ background: '#FAF6F0', paddingBlock: '5rem' }}
      >
        <SectionBackground
          theme="cream"
          leftDecor="palm-leaf"
          rightDecor="makara-thorana"
          opacity={0.18}
          leftSize={480}
          rightSize={420}
        />
        <div className="container-site heritage-section-content">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{
              color: 'var(--color-accent)', fontWeight: 700, fontSize: '0.85rem',
              letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem',
            }}>
              Scholarly Leadership
            </p>
            <h2 className="section-title">Advisory Council & Board</h2>
            <p className="section-subtitle" style={{ maxWidth: '580px', margin: '0.75rem auto 0' }}>
              Comprising foremost cultural historians, traditional medicine doctors, university professors, and heritage conservationists.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.75rem' }}>
            {TEAM.map(member => (
              <div key={member.name} className="heritage-card" style={{ padding: '2rem', textAlign: 'center', background: '#fff' }}>
                <div style={{
                  width: '72px', height: '72px', borderRadius: '50%',
                  background: member.bg, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', fontWeight: 700, margin: '0 auto 1.25rem',
                }}>
                  {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 700,
                  color: 'var(--color-primary)', marginBottom: '0.35rem',
                }}>
                  {member.name}
                </h3>
                <p style={{ color: 'var(--color-accent)', fontSize: '0.83rem', fontWeight: 600 }}>
                  {member.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
