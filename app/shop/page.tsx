/**
 * app/shop/page.tsx — Shop Page (server component)
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { Suspense } from 'react';
import productsData from '@/data/products.json';
import type { Product } from '@/lib/types';
import ShopClient from './ShopClient';
import SectionBackground from '@/components/decorations/SectionBackground';

export const metadata: Metadata = {
  title: 'Shop — Authentic Traditional Crafts, Art, Brassware, Masks & Apothecary',
  description:
    'Purchase authentic Sri Lankan heritage crafts, traditional paintings, brassware, folk masks, and traditional medicine products. Support hereditary artisans and preserve living traditions.',
};

export default function ShopPage() {
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
        <SectionBackground theme="dark" leftDecor="brassware" rightDecor="crafts" opacity={0.25} />
        <div className="container-site heritage-section-content">
          <ShoppingBag size={40} style={{ color: 'var(--color-accent)', marginBottom: '0.75rem' }} />
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800, marginBottom: '1rem', lineHeight: 1.15 }}>
            Traditional Heritage Marketplace & Apothecary
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.88)', maxWidth: '640px', margin: '0 auto 1.5rem', lineHeight: 1.7 }}>
            Authentic handcrafted Thel Thulāva brass vessels, classical Hela Wedakama medicated oils, traditional paintings, Dumbara reed tapestries, hand-carved masks, and heritage publications. Every purchase directly sustains master artisan lineages.
          </p>
          <Link href="/cart" className="btn-accent" id="shop-view-cart">
            View Cart & Checkout
          </Link>
        </div>
      </div>

      <div className="heritage-section-relative" style={{ paddingBlock: '4.5rem', background: '#FAF6F0' }}>
        <SectionBackground
          theme="cream"
          leftDecor="crafts"
          rightDecor="masks"
          opacity={0.18}
          leftSize={460}
          rightSize={440}
          calligraphyText="Master Crafted Heritage"
        />
        <div className="container-site heritage-section-content">
          <Suspense fallback={<p style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-secondary)' }}>Loading shop products...</p>}>
            <ShopClient products={productsData as Product[]} />
          </Suspense>

          {/* Info notice */}
          <div style={{
            marginTop: '3.5rem', padding: '1.35rem', borderRadius: '0.75rem',
            background: '#fff', border: '1px solid var(--color-brown-100)',
            boxShadow: 'var(--shadow-card)',
          }}>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-secondary)', lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: 'var(--color-primary)' }}>📦 Ordering & Authenticity:</strong> Add cultural items to your cart and proceed to checkout. We will contact you via WhatsApp or email to confirm your order details, discuss insured shipping, and provide payment confirmation. All prices are listed in Sri Lankan Rupees (LKR). Island-wide and worldwide heritage shipping available.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
