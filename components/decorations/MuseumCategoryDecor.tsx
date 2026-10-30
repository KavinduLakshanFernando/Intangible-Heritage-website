'use client';

import React from 'react';
import MandalaIllustration from './MandalaIllustration';
import SriLankaMapIllustration from './SriLankaMapIllustration';
import ArchitecturalSketchIllustration from './ArchitecturalSketchIllustration';
import {
  MasksIllustration,
  BrasswareIllustration,
  AyurvedaIllustration,
  PeraheraIllustration,
  LandscapesIllustration,
  CraftsIllustration,
} from './CategorySpecificIllustrations';

interface MuseumCategoryDecorProps {
  category: string;
  className?: string;
  opacity?: number;
}

/**
 * MuseumCategoryDecor
 * Dynamically renders thematic Sri Lankan heritage vector background illustrations
 * matching the user's currently selected Museum category!
 */
export default function MuseumCategoryDecor({
  category = 'All',
  className = '',
  opacity = 0.20,
}: MuseumCategoryDecorProps) {

  const normCat = (category || 'All').toLowerCase();

  // Position styles for left and right illustration containers
  const leftWrapperStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '-25px',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    zIndex: 0,
    opacity,
    maskImage: 'linear-gradient(to right, black 65%, rgba(0,0,0,0.6) 85%, transparent 98%)',
    WebkitMaskImage: 'linear-gradient(to right, black 65%, rgba(0,0,0,0.6) 85%, transparent 98%)',
    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  };

  const rightWrapperStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    right: '-25px',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    zIndex: 0,
    opacity,
    maskImage: 'linear-gradient(to left, black 65%, rgba(0,0,0,0.6) 85%, transparent 98%)',
    WebkitMaskImage: 'linear-gradient(to left, black 65%, rgba(0,0,0,0.6) 85%, transparent 98%)',
    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  };

  const renderCategoryArtwork = () => {
    if (normCat.includes('mask')) {
      return (
        <>
          <div style={leftWrapperStyle} className="animate-arch-float">
            <MasksIllustration color="#8B5E3C" size={480} />
          </div>
          <div style={rightWrapperStyle} className="animate-arch-float">
            <ArchitecturalSketchIllustration variant="makara-thorana" position="right" opacity={1} size={440} />
          </div>
        </>
      );
    }

    if (normCat.includes('brass')) {
      return (
        <>
          <div style={leftWrapperStyle} className="animate-arch-float">
            <BrasswareIllustration color="#8B5E3C" size={480} />
          </div>
          <div style={rightWrapperStyle} className="animate-mandala-drift">
            <MandalaIllustration position="right" opacity={1} size={520} />
          </div>
        </>
      );
    }

    if (normCat.includes('ayurveda') || normCat.includes('wedakama') || normCat.includes('medicine')) {
      return (
        <>
          <div style={leftWrapperStyle} className="animate-arch-float">
            <AyurvedaIllustration color="#8B5E3C" size={480} />
          </div>
          <div style={rightWrapperStyle} className="animate-arch-float">
            <ArchitecturalSketchIllustration variant="pattirippuwa" position="right" opacity={1} size={440} calligraphyText="Ancient Hela Wedakama" />
          </div>
        </>
      );
    }

    if (normCat.includes('perahera') || normCat.includes('festival')) {
      return (
        <>
          <div style={leftWrapperStyle} className="animate-arch-float">
            <PeraheraIllustration color="#8B5E3C" size={480} />
          </div>
          <div style={rightWrapperStyle} className="animate-arch-float">
            <ArchitecturalSketchIllustration variant="pattirippuwa" position="right" opacity={1} size={440} calligraphyText="Kandy Esala Perahera" />
          </div>
        </>
      );
    }

    if (normCat.includes('ritual') || normCat.includes('shanthikarma')) {
      return (
        <>
          <div style={leftWrapperStyle} className="animate-arch-float">
            <MasksIllustration color="#8B5E3C" size={480} />
          </div>
          <div style={rightWrapperStyle} className="animate-mandala-drift">
            <MandalaIllustration position="right" opacity={1} size={520} />
          </div>
        </>
      );
    }

    if (normCat.includes('landscape') || normCat.includes('sigiriya')) {
      return (
        <>
          <div style={leftWrapperStyle} className="animate-arch-float">
            <LandscapesIllustration color="#8B5E3C" size={480} />
          </div>
          <div style={rightWrapperStyle} className="animate-map-float">
            <SriLankaMapIllustration position="right" opacity={1} size={440} />
          </div>
        </>
      );
    }

    if (normCat.includes('craft')) {
      return (
        <>
          <div style={leftWrapperStyle} className="animate-arch-float">
            <CraftsIllustration color="#8B5E3C" size={480} />
          </div>
          <div style={rightWrapperStyle} className="animate-arch-float">
            <ArchitecturalSketchIllustration variant="pattirippuwa" position="right" opacity={1} size={440} calligraphyText="Hereditary Living Crafts" />
          </div>
        </>
      );
    }

    if (normCat.includes('art')) {
      return (
        <>
          <div style={leftWrapperStyle} className="animate-mandala-drift">
            <MandalaIllustration position="left" opacity={1} size={560} />
          </div>
          <div style={rightWrapperStyle} className="animate-arch-float">
            <ArchitecturalSketchIllustration variant="makara-thorana" position="right" opacity={1} size={440} calligraphyText="Classical Temple Arts" />
          </div>
        </>
      );
    }

    // Default / "All"
    return (
      <>
        <div style={leftWrapperStyle} className="animate-mandala-drift">
          <MandalaIllustration position="left" opacity={1} size={560} />
        </div>
        <div style={rightWrapperStyle} className="animate-arch-float">
          <ArchitecturalSketchIllustration variant="pattirippuwa" position="right" opacity={1} size={440} calligraphyText="Living Heritage Museum" />
        </div>
      </>
    );
  };

  return (
    <div
      key={category}
      className={`museum-category-decor-layer ${className}`}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        animation: 'fadeInDecor 0.5s ease-out',
      }}
    >
      {renderCategoryArtwork()}
      <style>{`
        @keyframes fadeInDecor {
          from { opacity: 0; transform: scale(0.98); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
