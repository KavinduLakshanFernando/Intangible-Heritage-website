/**
 * app/events/page.tsx — Events Page
 */
import type { Metadata } from 'next';
import Image from 'next/image';
import { CalendarDays, MapPin, Tag } from 'lucide-react';
import eventsData from '@/data/events.json';
import type { Event } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import SectionBackground from '@/components/decorations/SectionBackground';



export const metadata: Metadata = {
  title: 'Events & Exhibitions — Cultural Workshops, Symposia & Masterclasses',
  description:
    'Upcoming and past cultural heritage exhibitions, traditional art workshops, brass casting forums, traditional medicine masterclasses, and Perahera events in Sri Lanka.',
};

function EventCard({ event }: { event: Event }) {
  return (
    <article className="heritage-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', flexShrink: 0 }}>
        <Image src={event.image} alt={event.title} fill
          style={{ objectFit: 'cover', transition: 'transform 0.35s ease' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="event-img"
        />
        <div style={{
          position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap',
        }}>
          <span style={{
            background: event.status === 'upcoming' ? 'var(--color-accent)' : 'rgba(0,0,0,0.5)',
            color: event.status === 'upcoming' ? 'var(--color-primary)' : '#fff',
            padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700,
          }}>
            {event.status === 'upcoming' ? '● Upcoming' : 'Past'}
          </span>
          <span style={{
            background: 'var(--color-primary)', color: 'var(--color-accent)',
            padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700,
          }}>
            {event.heritageCategory || event.category}
          </span>
        </div>
      </div>
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 700,
          color: 'var(--color-primary)', marginBottom: '0.75rem', lineHeight: 1.35 }}>
          {event.title}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem',
          marginBottom: '0.85rem', fontSize: '0.84rem', color: 'var(--color-secondary)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CalendarDays size={14} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
            {formatDate(event.date)}
            {event.endDate && event.endDate !== event.date && ` – ${formatDate(event.endDate)}`}
          </span>
          <span style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
            <MapPin size={14} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }} />
            {event.venue}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Tag size={14} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
            {event.category}
          </span>
        </div>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-secondary)', lineHeight: 1.65, flex: 1 }}>
          {event.description}
        </p>
      </div>
    </article>
  );
}

export default function EventsPage() {
  const upcoming = (eventsData as Event[]).filter(e => e.status === 'upcoming');
  const past     = (eventsData as Event[]).filter(e => e.status === 'past');

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
        <SectionBackground theme="dark" leftDecor="drums" rightDecor="perahera" opacity={0.25} />
        <div className="container-site heritage-section-content">
          <p style={{ color: 'var(--color-accent)', fontWeight: 600, fontSize: '0.85rem',
            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Events & Exhibitions
          </p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800, marginBottom: '1rem', lineHeight: 1.15 }}>
            Cultural Heritage Programs & Masterclasses
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.88)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.7 }}>
            Discover our cultural exhibitions, craft workshops, traditional mural art masterclasses, ancient metallurgy forums, Sanni mask performances, and Hela Wedakama oil-formulation sessions.
          </p>
        </div>
      </div>

      <div className="heritage-section-relative" style={{ paddingBlock: '4rem', background: '#FAF6F0' }}>
        <SectionBackground
          theme="cream"
          leftDecor="perahera"
          rightDecor="makara-thorana"
          opacity={0.18}
          calligraphyText="Living Pageantry & Sacred Rites"
        />
        <div className="container-site heritage-section-content">

          {/* ── Upcoming ───────────────────────────────── */}
          <section aria-label="Upcoming events" style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <h2 className="section-title" style={{ margin: 0 }}>Upcoming Events & Programs</h2>
              <span style={{
                background: 'var(--color-accent)', color: 'var(--color-primary)',
                borderRadius: '999px', padding: '0.15rem 0.6rem', fontSize: '0.8rem', fontWeight: 700,
              }}>
                {upcoming.length}
              </span>
            </div>
            {upcoming.length === 0 ? (
              <p style={{ color: 'var(--color-secondary)' }}>No upcoming events currently scheduled. Check back soon!</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.75rem' }}>
                {upcoming.map(e => <EventCard key={e.id} event={e} />)}
              </div>
            )}
          </section>

          {/* Divider */}
          <hr style={{ border: 'none', borderTop: '1px solid var(--color-brown-100)', marginBottom: '3.5rem' }} />

          {/* ── Past ───────────────────────────────────── */}
          <section aria-label="Past events">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <h2 className="section-title" style={{ margin: 0, color: 'var(--color-secondary)' }}>Past Events & Archives</h2>
              <span style={{
                background: 'var(--color-brown-100)', color: 'var(--color-secondary)',
                borderRadius: '999px', padding: '0.15rem 0.6rem', fontSize: '0.8rem', fontWeight: 700,
              }}>
                {past.length}
              </span>
            </div>
            {past.length === 0 ? (
              <p style={{ color: 'var(--color-secondary)' }}>No past events recorded.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.75rem', opacity: 0.9 }}>
                {past.map(e => <EventCard key={e.id} event={e} />)}
              </div>
            )}
          </section>

        </div>
      </div>
      <style>{`.event-img:hover { transform: scale(1.05); }`}</style>
    </>
  );
}
