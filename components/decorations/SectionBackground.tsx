'use client';

import React from 'react';
import HeritageVectorArt, { TraditionalVectorType } from './HeritageVectorArt';
import {
  MasksIllustration,
  BrasswareIllustration,
  AyurvedaIllustration,
  PeraheraIllustration,
  LandscapesIllustration,
  CraftsIllustration,
} from './CategorySpecificIllustrations';
import {
  PalmLeafManuscriptIllustration,
  PunkalasaIllustration,
  PeraheraDrumsIllustration,
  BoLeafIllustration,
} from './HeritageSpecialIllustrations';

export type DecorType =
  | 'mandala'
  | 'sandakada-pahana'
  | 'map'
  | 'sri-lanka-map'
  | 'pattirippuwa'
  | 'makara-thorana'
  | 'stupa-monument'
  | 'ruwanwelisaya'
  | 'palm-leaf'
  | 'punkalasa'
  | 'drums'
  | 'bo-leaf'
  | 'masks'
  | 'brassware'
  | 'traditional-medicine'
  | 'ayurveda'
  | 'perahera'
  | 'landscapes'
  | 'crafts'
  | 'none';

interface SectionBackgroundProps {
  /** Visual theme of the section */
  theme?: 'light' | 'cream' | 'dark';
  /** Decorative illustration for the left edge */
  leftDecor?: DecorType;
  /** Decorative illustration for the right edge */
  rightDecor?: DecorType;
  /** Center subtle watermark illustration */
  centerDecor?: 'stupa' | 'mandala' | 'none';
  /** Base opacity */
  opacity?: number;
  /** Custom stroke / theme color override */
  color?: string;
  /** Size for left decoration */
  leftSize?: number | string;
  /** Size for right decoration */
  rightSize?: number | string;
  /** Optional elegant cursive calligraphy label on architectural sketch */
  calligraphyText?: string;
  /** Extra container className */
  className?: string;
}

/**
 * SectionBackground
 * Master component delivering authentic, museum-grade Sri Lankan traditional vectors
 * and architectural drawings into section backgrounds.
 */
export default function SectionBackground({
  theme = 'light',
  leftDecor = 'mandala',
  rightDecor = 'none',
  centerDecor = 'none',
  opacity,
  color,
  leftSize,
  rightSize,
  calligraphyText,
  className = '',
}: SectionBackgroundProps) {
  const isDark = theme === 'dark';
  const effectiveOpacity = opacity !== undefined ? opacity : (isDark ? 0.38 : (theme === 'cream' ? 0.32 : 0.28));
  const effectiveColor = color || (isDark ? '#DFC18A' : (theme === 'cream' ? '#6B4423' : '#7A4B26'));

  const wrapSvgDecor = (
    child: React.ReactNode,
    position: 'left' | 'right',
    animClass = 'animate-arch-float'
  ) => {
    const isLeft = position === 'left';
    return (
      <div
        className={`heritage-decor-wrapper ${animClass}`}
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: effectiveOpacity,
          ...(isLeft
            ? {
                left: '-25px',
                maskImage: 'linear-gradient(to right, black 65%, rgba(0,0,0,0.6) 85%, transparent 98%)',
                WebkitMaskImage: 'linear-gradient(to right, black 65%, rgba(0,0,0,0.6) 85%, transparent 98%)',
              }
            : {
                right: '-25px',
                maskImage: 'linear-gradient(to left, black 65%, rgba(0,0,0,0.6) 85%, transparent 98%)',
                WebkitMaskImage: 'linear-gradient(to left, black 65%, rgba(0,0,0,0.6) 85%, transparent 98%)',
              }),
        }}
        aria-hidden="true"
      >
        {child}
      </div>
    );
  };

  const renderDecor = (
    decor: DecorType,
    position: 'left' | 'right',
    size?: number | string
  ) => {
    if (!decor || decor === 'none') return null;

    const numSize = size ? Number(size) : (position === 'left' ? 520 : 460);

    // 1. Authentic Master Traditional Vectors (Sandakada Pahana, Pattirippuwa, Sri Lanka Map, Ruwanwelisaya, Makara Thorana)
    if (
      decor === 'mandala' ||
      decor === 'sandakada-pahana' ||
      decor === 'pattirippuwa' ||
      decor === 'map' ||
      decor === 'sri-lanka-map' ||
      decor === 'stupa-monument' ||
      decor === 'ruwanwelisaya' ||
      decor === 'makara-thorana'
    ) {
      let vectorType: TraditionalVectorType = 'sandakada-pahana';
      if (decor === 'mandala' || decor === 'sandakada-pahana') vectorType = 'sandakada-pahana';
      if (decor === 'pattirippuwa') vectorType = 'pattirippuwa';
      if (decor === 'map' || decor === 'sri-lanka-map') vectorType = 'sri-lanka-map';
      if (decor === 'stupa-monument' || decor === 'ruwanwelisaya') vectorType = 'ruwanwelisaya';
      if (decor === 'makara-thorana') vectorType = 'makara-thorana';

      return (
        <HeritageVectorArt
          type={vectorType}
          position={position}
          theme={theme}
          opacity={effectiveOpacity}
          width={numSize}
          calligraphyText={calligraphyText}
        />
      );
    }

    // 2. Specialty Sri Lankan Heritage Line Art Vectors
    if (decor === 'palm-leaf') {
      return wrapSvgDecor(
        <PalmLeafManuscriptIllustration color={effectiveColor} size={numSize} />,
        position
      );
    }

    if (decor === 'punkalasa') {
      return wrapSvgDecor(
        <PunkalasaIllustration color={effectiveColor} size={numSize} />,
        position
      );
    }

    if (decor === 'drums') {
      return wrapSvgDecor(
        <PeraheraDrumsIllustration color={effectiveColor} size={numSize} />,
        position
      );
    }

    if (decor === 'bo-leaf') {
      return wrapSvgDecor(
        <BoLeafIllustration color={effectiveColor} size={numSize} />,
        position
      );
    }

    if (decor === 'masks') {
      return wrapSvgDecor(
        <MasksIllustration color={effectiveColor} size={numSize} />,
        position
      );
    }

    if (decor === 'brassware') {
      return wrapSvgDecor(
        <BrasswareIllustration color={effectiveColor} size={numSize} />,
        position
      );
    }

    if (decor === 'traditional-medicine' || decor === 'ayurveda') {
      return wrapSvgDecor(
        <AyurvedaIllustration color={effectiveColor} size={numSize} />,
        position
      );
    }

    if (decor === 'perahera') {
      return wrapSvgDecor(
        <PeraheraIllustration color={effectiveColor} size={numSize} />,
        position
      );
    }

    if (decor === 'landscapes') {
      return wrapSvgDecor(
        <LandscapesIllustration color={effectiveColor} size={numSize} />,
        position
      );
    }

    if (decor === 'crafts') {
      return wrapSvgDecor(
        <CraftsIllustration color={effectiveColor} size={numSize} />,
        position
      );
    }

    return null;
  };

  return (
    <div
      className={`heritage-section-bg-layer ${isDark ? 'theme-dark' : 'theme-light'} ${className}`}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Left Edge Decorative Layer */}
      {renderDecor(leftDecor, 'left', leftSize)}

      {/* Right Edge Decorative Layer */}
      {renderDecor(rightDecor, 'right', rightSize)}

      {/* Center Subtle Watermark (Optional) */}
      {centerDecor === 'mandala' && (
        <HeritageVectorArt
          type="sandakada-pahana"
          position="center"
          theme={theme}
          opacity={effectiveOpacity * 0.45}
          width={720}
        />
      )}

      {centerDecor === 'stupa' && (
        <HeritageVectorArt
          type="ruwanwelisaya"
          position="center"
          theme={theme}
          opacity={effectiveOpacity * 0.4}
          width={650}
        />
      )}
    </div>
  );
}
