'use client';

import React from 'react';

interface IllustrationBaseProps {
  color?: string;
  size?: number | string;
  className?: string;
}

/**
 * MasksIllustration
 * Authentic Sri Lankan Ambalangoda traditional folk mask (Gini Raksha / Kolam) line art.
 */
export function MasksIllustration({ color = '#8B5E3C', size = 440, className = '' }: IllustrationBaseProps) {
  return (
    <svg
      width={size}
      height={Number(size) * 1.15}
      viewBox="0 0 400 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block' }}
    >
      {/* ── Central High Flame Headdress (Gini Dalu Crest) ── */}
      <path
        d="M 200 20 C 208 45, 225 65, 215 95 C 205 120, 200 135, 200 145 C 200 135, 195 120, 185 95 C 175 65, 192 45, 200 20 Z"
        stroke={color}
        strokeWidth="2"
        fill={color}
        fillOpacity="0.12"
      />
      {/* Left Tiered Flame Plumes */}
      <path
        d="M 185 75 C 160 50, 140 60, 150 88 C 158 110, 175 125, 182 140"
        stroke={color}
        strokeWidth="1.6"
        fill={color}
        fillOpacity="0.08"
      />
      <path
        d="M 160 100 C 130 80, 115 100, 125 125 C 135 145, 155 155, 168 165"
        stroke={color}
        strokeWidth="1.6"
        fill={color}
        fillOpacity="0.08"
      />
      {/* Right Tiered Flame Plumes */}
      <path
        d="M 215 75 C 240 50, 260 60, 250 88 C 242 110, 225 125, 218 140"
        stroke={color}
        strokeWidth="1.6"
        fill={color}
        fillOpacity="0.08"
      />
      <path
        d="M 240 100 C 270 80, 285 100, 275 125 C 265 145, 245 155, 232 165"
        stroke={color}
        strokeWidth="1.6"
        fill={color}
        fillOpacity="0.08"
      />

      {/* ── Guardian Cobra / Flame Wing Ears (Raksha Kaan) ── */}
      {/* Left Ear Wing */}
      <path
        d="M 140 210 C 90 185, 45 210, 50 250 C 55 285, 100 295, 135 280 C 145 275, 142 245, 140 210 Z"
        stroke={color}
        strokeWidth="1.8"
        fill={color}
        fillOpacity="0.1"
      />
      {/* Left Ear Wing Inner Feathers */}
      <line x1="130" y1="230" x2="65" y2="245" stroke={color} strokeWidth="1" strokeDasharray="3 2" />
      <line x1="130" y1="250" x2="75" y2="265" stroke={color} strokeWidth="1" strokeDasharray="3 2" />

      {/* Right Ear Wing */}
      <path
        d="M 260 210 C 310 185, 355 210, 350 250 C 345 285, 300 295, 265 280 C 255 275, 258 245, 260 210 Z"
        stroke={color}
        strokeWidth="1.8"
        fill={color}
        fillOpacity="0.1"
      />
      {/* Right Ear Wing Inner Feathers */}
      <line x1="270" y1="230" x2="335" y2="245" stroke={color} strokeWidth="1" strokeDasharray="3 2" />
      <line x1="270" y1="250" x2="325" y2="265" stroke={color} strokeWidth="1" strokeDasharray="3 2" />

      {/* ── Main Face Structure ── */}
      {/* Forehead Band / Tiara (Nalalpata) */}
      <rect x="145" y="165" width="110" height="18" rx="4" stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.18" />
      {Array.from({ length: 7 }).map((_, i) => (
        <circle key={`tiara-gem-${i}`} cx={155 + i * 15} cy={174} r="3" fill={color} />
      ))}

      {/* Prominent Eyebrows (Bamarapethi) */}
      <path d="M 145 195 Q 170 182 195 198" stroke={color} strokeWidth="2.5" fill="none" />
      <path d="M 255 195 Q 230 182 205 198" stroke={color} strokeWidth="2.5" fill="none" />

      {/* Protruding Large Concentric Bulging Eyes (Kolam Aas) */}
      <circle cx="170" cy="212" r="20" stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.1" />
      <circle cx="170" cy="212" r="12" stroke={color} strokeWidth="1.4" />
      <circle cx="170" cy="212" r="5" fill={color} />

      <circle cx="230" cy="212" r="20" stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.1" />
      <circle cx="230" cy="212" r="12" stroke={color} strokeWidth="1.4" />
      <circle cx="230" cy="212" r="5" fill={color} />

      {/* Wide Snub Nose with Flared Nostrils */}
      <path d="M 195 200 L 192 235 Q 200 244 208 235 L 205 200" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="188" cy="238" r="6" stroke={color} strokeWidth="1.4" fill={color} fillOpacity="0.2" />
      <circle cx="212" cy="238" r="6" stroke={color} strokeWidth="1.4" fill={color} fillOpacity="0.2" />

      {/* Wide Snarl Mouth with Sharp Teeth & Curved Tusks */}
      <path
        d="M 148 262 Q 200 272 252 262 Q 200 305 148 262 Z"
        stroke={color}
        strokeWidth="2.2"
        fill={color}
        fillOpacity="0.15"
      />
      {/* Teeth Row */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={`tooth-${i}`}
          x1={162 + i * 11}
          y1={265}
          x2={162 + i * 11}
          y2={276}
          stroke={color}
          strokeWidth="1.4"
        />
      ))}
      {/* Left Fierce Curved Tusk (Dala) */}
      <path
        d="M 152 264 Q 130 278 138 305 Q 152 285 158 272 Z"
        stroke={color}
        strokeWidth="1.8"
        fill={color}
        fillOpacity="0.3"
      />
      {/* Right Fierce Curved Tusk (Dala) */}
      <path
        d="M 248 264 Q 270 278 262 305 Q 248 285 242 272 Z"
        stroke={color}
        strokeWidth="1.8"
        fill={color}
        fillOpacity="0.3"
      />

      {/* Protruding Red Tongue (Divatha) */}
      <path
        d="M 188 285 C 188 320, 212 320, 212 285 Z"
        stroke={color}
        strokeWidth="1.6"
        fill={color}
        fillOpacity="0.25"
      />
      <line x1="200" y1="285" x2="200" y2="310" stroke={color} strokeWidth="1" />

      {/* Sculpted Chin & Floral Beard Flanges */}
      <path
        d="M 160 305 Q 200 355 240 305"
        stroke={color}
        strokeWidth="1.8"
        fill="none"
      />
      <circle cx="200" cy="335" r="8" stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.2" />
    </svg>
  );
}

/**
 * BrasswareIllustration
 * Authentic Kandyan ceremonial standing brass oil lamp (Koth-Pahana) and ritual vessel.
 */
export function BrasswareIllustration({ color = '#8B5E3C', size = 440, className = '' }: IllustrationBaseProps) {
  return (
    <svg
      width={size}
      height={Number(size) * 1.15}
      viewBox="0 0 400 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block' }}
    >
      {/* ── Auspicious Hansa (Swan/Cockerel) Finial Perched at Top ── */}
      <g transform="translate(200, 45)">
        {/* Bird Body & Crest */}
        <circle cx="0" cy="0" r="14" stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.2" />
        {/* Head & Beak */}
        <circle cx="-10" cy="-12" r="7" stroke={color} strokeWidth="1.4" fill={color} fillOpacity="0.2" />
        <polygon points="-17,-12 -25,-10 -17,-8" fill={color} />
        {/* Eye */}
        <circle cx="-11" cy="-13" r="1.5" fill="#FAF6F0" />
        {/* Plumed Decorative Tail (Liyawela style) */}
        <path
          d="M 8 -4 C 24 -24, 38 -5, 20 8 C 32 15, 26 28, 10 18"
          stroke={color}
          strokeWidth="1.8"
          fill={color}
          fillOpacity="0.15"
        />
        {/* Bird Legs & Perch Pedestal */}
        <line x1="-3" y1="14" x2="-3" y2="24" stroke={color} strokeWidth="2" />
        <line x1="3" y1="14" x2="3" y2="24" stroke={color} strokeWidth="2" />
        <ellipse cx="0" cy="26" rx="14" ry="5" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.3" />
      </g>

      {/* ── Spire / Tier 1 Pinnacle Neck ── */}
      <rect x="194" y="78" width="12" height="26" stroke={color} strokeWidth="1.4" fill={color} fillOpacity="0.1" />
      <line x1="192" y1="88" x2="208" y2="88" stroke={color} strokeWidth="1.2" />
      <line x1="192" y1="96" x2="208" y2="96" stroke={color} strokeWidth="1.2" />

      {/* ── Main Circular Oil Basin / Wick Reservoir (Pahan Thattuma) ── */}
      {/* Outer Basin Lip with Wick Spouts */}
      <ellipse cx="200" cy="115" rx="90" ry="24" stroke={color} strokeWidth="2.4" fill={color} fillOpacity="0.12" />
      <ellipse cx="200" cy="115" rx="72" ry="18" stroke={color} strokeWidth="1.4" strokeDasharray="4 3" fill="none" />
      {/* Wick Notches (Thira Kodu) radiating outwards */}
      {Array.from({ length: 12 }).map((_, i) => {
        const rad = (i * 30 * Math.PI) / 180;
        const x1 = Math.round((200 + 82 * Math.cos(rad)) * 100) / 100;
        const y1 = Math.round((115 + 21 * Math.sin(rad)) * 100) / 100;
        const x2 = Math.round((200 + 94 * Math.cos(rad)) * 100) / 100;
        const y2 = Math.round((115 + 25 * Math.sin(rad)) * 100) / 100;
        return (
          <g key={`wick-${i}`}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.6" />
            {/* Soft Flame Droplet */}
            <circle cx={x2} cy={y2} r="2" fill={color} opacity="0.75" />
          </g>
        );
      })}

      {/* Basin Underside Lotus Cup (Nelum Mal Pettam) */}
      <path
        d="M 125 120 C 135 155, 175 162, 200 162 C 225 162, 265 155, 275 120"
        stroke={color}
        strokeWidth="1.8"
        fill={color}
        fillOpacity="0.08"
      />
      {Array.from({ length: 9 }).map((_, i) => (
        <line
          key={`petal-rib-${i}`}
          x1={140 + i * 15}
          y1={122 + (i <= 4 ? i * 7 : (8 - i) * 7)}
          x2={148 + i * 13}
          y2={155}
          stroke={color}
          strokeWidth="1"
          opacity="0.6"
        />
      ))}

      {/* ── Secondary Intermediate Tiered Oil Basin ── */}
      <ellipse cx="200" cy="178" rx="60" ry="16" stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.1" />

      {/* ── Elaborate Turned Brass Central Pillar (Kanda) ── */}
      {/* Turned Ring Nodes */}
      <ellipse cx="200" cy="200" rx="20" ry="8" stroke={color} strokeWidth="1.6" fill={color} fillOpacity="0.25" />
      <rect x="190" y="208" width="20" height="90" stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.08" />
      {/* Turned Shaft Fluting Lines */}
      <line x1="195" y1="210" x2="195" y2="296" stroke={color} strokeWidth="0.8" />
      <line x1="200" y1="210" x2="200" y2="296" stroke={color} strokeWidth="1.2" />
      <line x1="205" y1="210" x2="205" y2="296" stroke={color} strokeWidth="0.8" />

      {/* Middle Bulbar Brass Node (Kalasa / Pot Node) */}
      <ellipse cx="200" cy="250" rx="30" ry="18" stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.18" />
      <ellipse cx="200" cy="250" rx="18" ry="10" stroke={color} strokeWidth="1" fill="none" />

      {/* Lower Pillar Bell */}
      <ellipse cx="200" cy="305" rx="28" ry="10" stroke={color} strokeWidth="1.6" fill={color} fillOpacity="0.2" />

      {/* ── Grand Flared Pedestal Base (Pahana Pāda) ── */}
      <path
        d="M 175 315 L 120 380 C 110 395, 125 408, 145 408 L 255 408 C 275 408, 290 395, 280 380 L 225 315 Z"
        stroke={color}
        strokeWidth="2.2"
        fill={color}
        fillOpacity="0.1"
      />
      {/* Base Stepped Rims */}
      <ellipse cx="200" cy="385" rx="80" ry="14" stroke={color} strokeWidth="1.6" fill="none" />
      <ellipse cx="200" cy="405" rx="95" ry="16" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.15" />

      {/* Carved Elephant / Lion Feet at Base */}
      <rect x="110" y="412" width="22" height="14" rx="4" stroke={color} strokeWidth="1.6" fill={color} fillOpacity="0.3" />
      <rect x="189" y="416" width="22" height="14" rx="4" stroke={color} strokeWidth="1.6" fill={color} fillOpacity="0.3" />
      <rect x="268" y="412" width="22" height="14" rx="4" stroke={color} strokeWidth="1.6" fill={color} fillOpacity="0.3" />
    </svg>
  );
}

/**
 * AyurvedaIllustration
 * Sacred Thel Thulāva oil vessel, medicinal herb branches (Nelum, Aralu), and Puskola palm-leaf texts.
 */
export function TraditionalMedicineIllustration({ color = '#8B5E3C', size = 440, className = '' }: IllustrationBaseProps) {
  return (
    <svg
      width={size}
      height={Number(size) * 1.15}
      viewBox="0 0 400 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block' }}
    >
      {/* ── Ancient Sacred Thel Thulāva (Hanging Medicinal Oil Dispenser) ── */}
      <g transform="translate(200, 30)">
        {/* Hanging Chain Links */}
        <line x1="0" y1="0" x2="0" y2="45" stroke={color} strokeWidth="1.8" strokeDasharray="4 3" />
        <circle cx="0" cy="5" r="3.5" fill={color} />
        <circle cx="0" cy="22" r="3.5" fill={color} />
        <circle cx="0" cy="40" r="4.5" stroke={color} strokeWidth="1.4" fill="none" />

        {/* Vessel Conical Spire & Lid */}
        <polygon points="0,45 15,68 -15,68" stroke={color} strokeWidth="1.6" fill={color} fillOpacity="0.2" />
        <ellipse cx="0" cy="68" rx="20" ry="6" stroke={color} strokeWidth="1.6" fill={color} fillOpacity="0.2" />

        {/* Thel Thulāva Main Bulbous Body (Sacred Copper/Bronze Vessel) */}
        <path
          d="M -20 68 C -55 90, -50 145, 0 170 C 50 145, 55 90, 20 68 Z"
          stroke={color}
          strokeWidth="2.2"
          fill={color}
          fillOpacity="0.12"
        />
        {/* Inscribed Ancient Floral Bands on Vessel */}
        <ellipse cx="0" cy="110" rx="38" ry="12" stroke={color} strokeWidth="1.2" strokeDasharray="3 2" fill="none" />
        <ellipse cx="0" cy="135" rx="30" ry="10" stroke={color} strokeWidth="1.2" fill="none" />

        {/* Dripping Nozzle (Mukha) Dispensing Medicated Herbal Oil */}
        <rect x="-4" y="170" width="8" height="22" stroke={color} strokeWidth="1.6" fill={color} fillOpacity="0.25" />
        <circle cx="0" cy="200" r="3" fill={color} />
        <circle cx="0" cy="214" r="2.5" fill={color} opacity="0.75" />
        <circle cx="0" cy="226" r="2" fill={color} opacity="0.5" />
      </g>

      {/* ── Medicinal Flora: Nelum Lotus & Aralu Leaves ── */}
      {/* Left Medicinal Plant Branch */}
      <g transform="translate(60, 200)">
        <path d="M 15 150 Q 40 80 80 40" stroke={color} strokeWidth="2" fill="none" />
        {/* Medicinal Leaves */}
        <path d="M 40 100 Q 20 85 45 70 Q 65 95 40 100 Z" stroke={color} strokeWidth="1.4" fill={color} fillOpacity="0.15" />
        <path d="M 60 70 Q 75 40 95 60 Q 80 90 60 70 Z" stroke={color} strokeWidth="1.4" fill={color} fillOpacity="0.15" />
        <path d="M 75 45 Q 85 15 110 30 Q 100 60 75 45 Z" stroke={color} strokeWidth="1.4" fill={color} fillOpacity="0.18" />
        {/* Aralu / Bulu Herbal Seed Pods */}
        <ellipse cx="30" cy="120" rx="8" ry="12" stroke={color} strokeWidth="1.4" fill={color} fillOpacity="0.25" />
      </g>

      {/* Right Sacred Lotus Blossom (Nelum Mala) */}
      <g transform="translate(300, 210)">
        <path d="M 0 140 Q -15 80 -40 40" stroke={color} strokeWidth="1.8" fill="none" />
        {/* Layered Lotus Petals */}
        <path d="M -40 40 Q -25 15 -40 -10 Q -55 15 -40 40 Z" stroke={color} strokeWidth="1.6" fill={color} fillOpacity="0.25" />
        <path d="M -40 40 Q -10 25 -20 -5 Q -40 10 -40 40 Z" stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.15" />
        <path d="M -40 40 Q -70 25 -60 -5 Q -40 10 -40 40 Z" stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.15" />
      </g>

      {/* ── Ancient Puskola Poth (Palm-Leaf Manuscript Texts) at Base ── */}
      <g transform="translate(90, 340)">
        {/* Manuscript Wooden Cover (Kamba) */}
        <rect x="0" y="0" width="220" height="22" rx="4" stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.2" />
        {/* Traditional Binding Cord Holes (Kambi) */}
        <circle cx="55" cy="11" r="3.5" stroke={color} strokeWidth="1.2" fill="#FAF6F0" />
        <circle cx="165" cy="11" r="3.5" stroke={color} strokeWidth="1.2" fill="#FAF6F0" />
        {/* Inscribed Lotus Motif on Cover */}
        <circle cx="110" cy="11" r="6" stroke={color} strokeWidth="1" fill="none" />

        {/* Stacked Palm Leaves (Ola Leaf Layers) */}
        <rect x="5" y="24" width="210" height="34" stroke={color} strokeWidth="1.4" fill={color} fillOpacity="0.08" />
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={`leaf-layer-${i}`}
            x1="5"
            y1={29 + i * 5}
            x2="215"
            y2={29 + i * 5}
            stroke={color}
            strokeWidth="0.8"
            opacity="0.6"
          />
        ))}

        {/* Lower Wooden Cover */}
        <rect x="0" y="60" width="220" height="18" rx="4" stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.2" />
      </g>
    </svg>
  );
}



/**
 * PeraheraIllustration
 * Sacred Kandy Esala Perahera Tusker (Raja Hasthi) with casket canopy & Geta-Bera drums.
 */
export const AyurvedaIllustration = TraditionalMedicineIllustration;

export function PeraheraIllustration({ color = '#8B5E3C', size = 440, className = '' }: IllustrationBaseProps) {
  return (
    <svg
      width={size}
      height={Number(size) * 1.15}
      viewBox="0 0 400 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block' }}
    >
      {/* ── Sacred Relic Casket Canopy (Ransivige / Karanduwa) ── */}
      <g transform="translate(200, 35)">
        {/* Pinnacle (Kot) */}
        <polygon points="0,0 6,18 -6,18" fill={color} />
        <line x1="0" y1="0" x2="0" y2="28" stroke={color} strokeWidth="2" />
        {/* Canopy Tiered Pagoda Roof */}
        <path d="M 0 20 L 40 45 L -40 45 Z" stroke={color} strokeWidth="1.6" fill={color} fillOpacity="0.2" />
        <path d="M -55 58 L 55 58 L 42 45 L -42 45 Z" stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.15" />
        {/* Relic Casket Chamber & Golden Karanduwa */}
        <rect x="-35" y="58" width="70" height="42" stroke={color} strokeWidth="1.6" fill={color} fillOpacity="0.1" />
        {/* Stupa-shaped Karanduwa inside */}
        <path d="M -12 90 C -12 75, 12 75, 12 90 Z" stroke={color} strokeWidth="1.4" fill={color} fillOpacity="0.3" />
        <line x1="0" y1="68" x2="0" y2="76" stroke={color} strokeWidth="1.2" />
        {/* Corner Lantern Drops & Garlands */}
        <circle cx="-35" cy="104" r="3" fill={color} />
        <circle cx="35" cy="104" r="3" fill={color} />
      </g>

      {/* ── Adorned Tusker Head & Face Plate (Nettimalaya) ── */}
      <g transform="translate(200, 150)">
        {/* Elephant Head Structure */}
        <path
          d="
            M -65 30
            C -80 70, -75 110, -50 140
            C -25 155, 25 155, 50 140
            C 75 110, 80 70, 65 30
            Z
          "
          stroke={color}
          strokeWidth="2.2"
          fill={color}
          fillOpacity="0.1"
        />

        {/* Elaborate Nettimalaya (Bejeweled Forehead Plate & Garlands) */}
        <ellipse cx="0" cy="55" rx="35" ry="24" stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.22" />
        <circle cx="0" cy="55" r="10" stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.3" />
        {Array.from({ length: 10 }).map((_, i) => {
          const rad = (i * 36 * Math.PI) / 180;
          return (
            <circle
              key={`netti-bead-${i}`}
              cx={Math.round(24 * Math.cos(rad) * 100) / 100}
              cy={Math.round((55 + 16 * Math.sin(rad)) * 100) / 100}
              r="2.5"
              fill={color}
            />
          );
        })}

        {/* Gentle Tusker Eyes */}
        <ellipse cx="-42" cy="70" rx="6" ry="4" stroke={color} strokeWidth="1.4" fill={color} fillOpacity="0.4" />
        <ellipse cx="42" cy="70" rx="6" ry="4" stroke={color} strokeWidth="1.4" fill={color} fillOpacity="0.4" />

        {/* Majestic White Royal Tusks (Dala) */}
        <path
          d="M -30 135 C -65 170, -65 210, -25 240 C -45 200, -45 165, -18 140 Z"
          stroke={color}
          strokeWidth="2"
          fill={color}
          fillOpacity="0.25"
        />
        <path
          d="M 30 135 C 65 170, 65 210, 25 240 C 45 200, 45 165, 18 140 Z"
          stroke={color}
          strokeWidth="2"
          fill={color}
          fillOpacity="0.25"
        />

        {/* Adorned Trunk (Sonda) with Embroidered Regalia */}
        <path
          d="
            M -15 140
            C -18 180, -22 230, -5 270
            C 5 285, 25 285, 20 265
            C 12 230, 15 180, 15 140
          "
          stroke={color}
          strokeWidth="2"
          fill={color}
          fillOpacity="0.12"
        />
        {/* Trunk Cloth Decorative Chevrons */}
        <line x1="-15" y1="170" x2="15" y2="170" stroke={color} strokeWidth="1.2" />
        <line x1="-16" y1="200" x2="16" y2="200" stroke={color} strokeWidth="1.2" />
        <line x1="-14" y1="230" x2="14" y2="230" stroke={color} strokeWidth="1.2" />
      </g>

      {/* ── Traditional Ceremonial Geta-Bera Drums ── */}
      <g transform="translate(200, 415)">
        {/* Barrel-shaped Drum Body */}
        <path
          d="M -80 -18 Q 0 -28 80 -18 L 80 18 Q 0 28 -80 18 Z"
          stroke={color}
          strokeWidth="2"
          fill={color}
          fillOpacity="0.15"
        />
        {/* Drum Heads (Left & Right Vadi) */}
        <ellipse cx="-80" cy="0" rx="8" ry="18" stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.3" />
        <ellipse cx="80" cy="0" rx="8" ry="18" stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.3" />
        {/* Leather Lacing Straps (Wara) across drum */}
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`drum-lace-${i}`}
            x1={-70 + i * 17}
            y1={-20}
            x2={-62 + i * 17}
            y2={20}
            stroke={color}
            strokeWidth="1"
            opacity="0.6"
          />
        ))}
      </g>
    </svg>
  );
}



/**
 * LandscapesIllustration
 * Sigiriya Rock citadel contour, sacred lotus irrigation canals, and mountain peaks.
 */
export function LandscapesIllustration({ color = '#8B5E3C', size = 440, className = '' }: IllustrationBaseProps) {
  return (
    <svg
      width={size}
      height={Number(size) * 1.15}
      viewBox="0 0 400 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block' }}
    >
      {/* ── Sigiriya Lion Rock Citadel Monolith Contour ── */}
      <path
        d="
          M 60 270
          C 65 240, 80 210, 85 180
          C 90 145, 100 130, 115 125
          C 130 120, 180 120, 200 120
          C 220 120, 270 120, 285 125
          C 300 130, 310 145, 315 180
          C 320 210, 335 240, 340 270
          L 355 295
          L 45 295
          Z
        "
        stroke={color}
        strokeWidth="2.4"
        fill={color}
        fillOpacity="0.1"
      />

      {/* Rock Summit Palace Foundations */}
      <line x1="115" y1="124" x2="285" y2="124" stroke={color} strokeWidth="1.6" />
      {Array.from({ length: 8 }).map((_, i) => (
        <rect
          key={`summit-wall-${i}`}
          x={125 + i * 20}
          y={118}
          width={12}
          height={6}
          stroke={color}
          strokeWidth="0.8"
          fill={color}
          fillOpacity="0.3"
        />
      ))}

      {/* Rock Strata & Cliff Contour Hatching */}
      {Array.from({ length: 12 }).map((_, i) => (
        <path
          key={`cliff-strata-${i}`}
          d={`M ${85 + i * 18} ${140 + i * 10} Q ${190 + (i % 2 === 0 ? 10 : -10)} ${150 + i * 10} ${315 - i * 18} ${140 + i * 10}`}
          stroke={color}
          strokeWidth="0.8"
          strokeDasharray="4 4"
          fill="none"
          opacity="0.5"
        />
      ))}

      {/* Lion's Paw Plateau Terraces (Sinha Pada) */}
      <g transform="translate(145, 255)">
        {/* Left Paw */}
        <path d="M 0 35 C 0 15, 20 15, 30 25 L 35 38 Z" stroke={color} strokeWidth="1.6" fill={color} fillOpacity="0.25" />
        <line x1="10" y1="28" x2="10" y2="38" stroke={color} strokeWidth="1.2" />
        <line x1="20" y1="28" x2="20" y2="38" stroke={color} strokeWidth="1.2" />
      </g>
      <g transform="translate(225, 255)">
        {/* Right Paw */}
        <path d="M 0 38 L 5 25 C 15 15, 35 15, 35 35 Z" stroke={color} strokeWidth="1.6" fill={color} fillOpacity="0.25" />
        <line x1="15" y1="28" x2="15" y2="38" stroke={color} strokeWidth="1.2" />
        <line x1="25" y1="28" x2="25" y2="38" stroke={color} strokeWidth="1.2" />
      </g>

      {/* ── Ancient Water Gardens (Diya Poigai / Hydraulic Cascade Terraces) ── */}
      <rect x="50" y="310" width="300" height="25" rx="3" stroke={color} strokeWidth="1.6" fill={color} fillOpacity="0.08" />
      <rect x="75" y="345" width="250" height="22" rx="3" stroke={color} strokeWidth="1.6" fill={color} fillOpacity="0.08" />
      <rect x="100" y="375" width="200" height="20" rx="3" stroke={color} strokeWidth="1.6" fill={color} fillOpacity="0.08" />

      {/* Water Ripple Lines */}
      {Array.from({ length: 18 }).map((_, i) => (
        <path
          key={`water-cascade-${i}`}
          d={`M ${60 + i * 16} 322 Q ${68 + i * 16} 318 ${76 + i * 16} 322`}
          stroke={color}
          strokeWidth="0.8"
          fill="none"
          opacity="0.6"
        />
      ))}
    </svg>
  );
}

/**
 * CraftsIllustration
 * Traditional Dumbara weaving geometric diamond patterns & carved wooden lotus.
 */
export function CraftsIllustration({ color = '#8B5E3C', size = 440, className = '' }: IllustrationBaseProps) {
  return (
    <svg
      width={size}
      height={Number(size) * 1.15}
      viewBox="0 0 400 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block' }}
    >
      {/* ── Dumbara Tapestry Geometric Diamond Grid (Rata Malla) ── */}
      <g transform="translate(200, 140)">
        {/* Main Center Diamond */}
        <polygon points="0,-70 70,0 0,70 -70,0" stroke={color} strokeWidth="2.4" fill={color} fillOpacity="0.12" />
        <polygon points="0,-52 52,0 0,52 -52,0" stroke={color} strokeWidth="1.4" fill="none" />
        <polygon points="0,-34 34,0 0,34 -34,0" stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.2" />
        <polygon points="0,-16 16,0 0,16 -16,0" stroke={color} strokeWidth="1.2" fill={color} />

        {/* Flanking Interlocking Diamonds */}
        <polygon points="-70,-70 0,-140 70,-70 0,0" stroke={color} strokeWidth="1.6" fill="none" opacity="0.6" />
        <polygon points="-70,70 0,0 70,70 0,140" stroke={color} strokeWidth="1.6" fill="none" opacity="0.6" />

        <polygon points="-140,0 -70,-70 0,0 -70,70" stroke={color} strokeWidth="1.6" fill="none" opacity="0.6" />
        <polygon points="0,0 70,-70 140,0 70,70" stroke={color} strokeWidth="1.6" fill="none" opacity="0.6" />
      </g>

      {/* ── Master Woodcarver's Lotus Rosette (Nelum Mal කැටයම) ── */}
      <g transform="translate(200, 340)">
        <circle cx="0" cy="0" r="60" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.1" />
        <circle cx="0" cy="0" r="45" stroke={color} strokeWidth="1.2" strokeDasharray="3 2" fill="none" />
        {Array.from({ length: 8 }).map((_, i) => {
          const rot = (i * 360) / 8;
          return (
            <g key={`wood-petal-${i}`} transform={`rotate(${rot})`}>
              <path
                d="M 0 15 Q 16 35 0 55 Q -16 35 0 15 Z"
                stroke={color}
                strokeWidth="1.4"
                fill={color}
                fillOpacity="0.25"
              />
              <line x1="0" y1="18" x2="0" y2="52" stroke={color} strokeWidth="0.8" />
            </g>
          );
        })}
        <circle cx="0" cy="0" r="14" stroke={color} strokeWidth="1.4" fill={color} />
        <circle cx="0" cy="0" r="6" fill="#FAF6F0" />
      </g>
    </svg>
  );
}


