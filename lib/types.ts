// lib/types.ts — Shared TypeScript types for Intangible Heritage

export type HeritageCategory =
  | 'Art'
  | 'Crafts'
  | 'Brassware'
  | 'Masks'
  | 'Traditional Medicine'
  | 'Rituals'
  | 'Heritage Landscapes'
  | 'Events & Festivals'
  | 'Ayurveda';

export const HERITAGE_CATEGORIES: HeritageCategory[] = [
  'Art',
  'Crafts',
  'Brassware',
  'Masks',
  'Traditional Medicine',
  'Rituals',
  'Heritage Landscapes',
  'Events & Festivals',
];

export interface HeritageCategoryItem {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  icon?: string;
  focusAreas?: string[];
}

export interface MuseumItem {
  id: string;
  title: string;
  description: string;
  category: string;
  heritageCategory?: HeritageCategory | string;
  image: string;
  photographer?: string;
  year?: number;
  period?: string;
  provenance?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  venue: string;
  description: string;
  image: string;
  status: 'upcoming' | 'past';
  category: string;
  heritageCategory?: HeritageCategory | string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;     // LKR
  image: string;
  category: string;
  heritageCategory?: HeritageCategory | string;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  author: string;
  authorAffiliation?: string;
  date: string;
  abstract: string;
  tags: string[];
  heritageCategory?: HeritageCategory | string;
  downloadUrl?: string;
  journal?: string;
  volume?: string;
  issue?: string;
}
