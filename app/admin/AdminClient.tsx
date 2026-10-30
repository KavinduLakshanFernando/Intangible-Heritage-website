'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Layers,
  Image as ImageIcon,
  ShoppingBag,
  Calendar,
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  Lock,
  Unlock,
  CheckCircle,
  AlertCircle,
  Upload,
} from 'lucide-react';
import type {
  HeritageCategoryItem,
  MuseumItem,
  Product,
  Event,
  Article,
  HeritageCategory,
} from '@/lib/types';
import { HERITAGE_CATEGORIES } from '@/lib/types';

interface Props {
  initialCategories: HeritageCategoryItem[];
  initialMuseum: MuseumItem[];
  initialProducts: Product[];
  initialEvents: Event[];
  initialArticles: Article[];
}

export default function AdminClient({
  initialCategories,
  initialMuseum,
  initialProducts,
  initialEvents,
  initialArticles,
}: Props) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'categories' | 'museum' | 'products' | 'events' | 'articles'>('categories');
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Data states
  const [categories, setCategories] = useState<HeritageCategoryItem[]>(initialCategories);
  const [museumItems, setMuseumItems] = useState<MuseumItem[]>(initialMuseum);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [articles, setArticles] = useState<Article[]>(initialArticles);

  // Edit / Form states
  const [editingCategory, setEditingCategory] = useState<HeritageCategoryItem | null>(null);
  const [editingMuseum, setEditingMuseum] = useState<Partial<MuseumItem> | null>(null);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [editingEvent, setEditingEvent] = useState<Partial<Event> | null>(null);
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim().length > 0) {
      setIsAuthenticated(true);
      setStatusMsg({ type: 'success', text: 'Admin session started. You can now manage heritage content.' });
      setTimeout(() => setStatusMsg(null), 4000);
    }
  };

  // ── Category Update ──────────────────────────────────────────────
  const saveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    try {
      const res = await fetch('/api/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, category: editingCategory }),
      });
      const data = await res.json();
      if (res.ok) {
        setCategories(prev => prev.map(c => (c.id === editingCategory.id ? data.category : c)));
        setEditingCategory(null);
        setStatusMsg({ type: 'success', text: `Category "${data.category.name}" updated successfully!` });
      } else {
        setStatusMsg({ type: 'error', text: data.error || 'Failed to update category.' });
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'Error connecting to server.' });
    }
    setTimeout(() => setStatusMsg(null), 4000);
  };

  // ── Museum CRUD ──────────────────────────────────────────────────
  const saveMuseumItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMuseum) return;
    try {
      const isNew = !editingMuseum.id;
      const res = await fetch('/api/museum', {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, item: editingMuseum }),
      });
      const data = await res.json();
      if (res.ok) {
        if (isNew) {
          setMuseumItems(prev => [...prev, data.item]);
        } else {
          setMuseumItems(prev => prev.map(m => (m.id === data.item.id ? data.item : m)));
        }
        setEditingMuseum(null);
        setStatusMsg({ type: 'success', text: `Exhibit "${data.item.title}" saved successfully!` });
      } else {
        setStatusMsg({ type: 'error', text: data.error || 'Failed to save exhibit.' });
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'Network error saving exhibit.' });
    }
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const deleteMuseumItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this exhibit?')) return;
    try {
      const res = await fetch(`/api/museum?id=${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': password },
      });
      if (res.ok) {
        setMuseumItems(prev => prev.filter(m => m.id !== id));
        setStatusMsg({ type: 'success', text: 'Exhibit deleted.' });
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'Failed to delete.' });
    }
    setTimeout(() => setStatusMsg(null), 4000);
  };

  // ── Product CRUD ─────────────────────────────────────────────────
  const saveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    try {
      const isNew = !editingProduct.id;
      const res = await fetch('/api/products', {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, product: editingProduct }),
      });
      const data = await res.json();
      if (res.ok) {
        if (isNew) {
          setProducts(prev => [...prev, data.product]);
        } else {
          setProducts(prev => prev.map(p => (p.id === data.product.id ? data.product : p)));
        }
        setEditingProduct(null);
        setStatusMsg({ type: 'success', text: `Product "${data.product.name}" saved!` });
      } else {
        setStatusMsg({ type: 'error', text: data.error || 'Failed to save product.' });
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'Network error saving product.' });
    }
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': password },
      });
      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== id));
        setStatusMsg({ type: 'success', text: 'Product removed.' });
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'Failed to delete product.' });
    }
    setTimeout(() => setStatusMsg(null), 4000);
  };

  // ── Event CRUD ───────────────────────────────────────────────────
  const saveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;
    try {
      const isNew = !editingEvent.id;
      const res = await fetch('/api/events', {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, event: editingEvent }),
      });
      const data = await res.json();
      if (res.ok) {
        if (isNew) {
          setEvents(prev => [...prev, data.event]);
        } else {
          setEvents(prev => prev.map(ev => (ev.id === data.event.id ? data.event : ev)));
        }
        setEditingEvent(null);
        setStatusMsg({ type: 'success', text: `Event "${data.event.title}" saved!` });
      } else {
        setStatusMsg({ type: 'error', text: data.error || 'Failed to save event.' });
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'Network error saving event.' });
    }
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const deleteEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      const res = await fetch(`/api/events?id=${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': password },
      });
      if (res.ok) {
        setEvents(prev => prev.filter(ev => ev.id !== id));
        setStatusMsg({ type: 'success', text: 'Event removed.' });
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'Failed to delete event.' });
    }
    setTimeout(() => setStatusMsg(null), 4000);
  };

  // ── Article CRUD ─────────────────────────────────────────────────
  const saveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;
    try {
      const isNew = !editingArticle.id;
      const res = await fetch('/api/research', {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, article: editingArticle }),
      });
      const data = await res.json();
      if (res.ok) {
        if (isNew) {
          setArticles(prev => [...prev, data.article]);
        } else {
          setArticles(prev => prev.map(a => (a.id === data.article.id ? data.article : a)));
        }
        setEditingArticle(null);
        setStatusMsg({ type: 'success', text: `Article "${data.article.title}" saved!` });
      } else {
        setStatusMsg({ type: 'error', text: data.error || 'Failed to save article.' });
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'Network error saving article.' });
    }
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const deleteArticle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this research article?')) return;
    try {
      const res = await fetch(`/api/research?id=${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': password },
      });
      if (res.ok) {
        setArticles(prev => prev.filter(a => a.id !== id));
        setStatusMsg({ type: 'success', text: 'Article deleted.' });
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'Failed to delete article.' });
    }
    setTimeout(() => setStatusMsg(null), 4000);
  };

  // ── Image Upload helper ──────────────────────────────────────────
  const handleFileUpload = async (file: File, callback: (url: string) => void) => {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('password', password);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: fd,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        callback(data.url);
        setStatusMsg({ type: 'success', text: 'Image uploaded successfully to /uploads/' });
      } else {
        setStatusMsg({ type: 'error', text: data.error || 'Upload failed.' });
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'Upload failed.' });
    }
    setTimeout(() => setStatusMsg(null), 4000);
  };

  // ── Login screen ─────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div style={{ maxWidth: '440px', margin: '4rem auto', padding: '2.5rem', background: '#fff', borderRadius: '1rem', boxShadow: 'var(--shadow-card)', textAlign: 'center' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--color-brown-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
          <Lock size={26} style={{ color: 'var(--color-primary)' }} />
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
          Heritage Admin Portal
        </h1>
        <p style={{ fontSize: '0.86rem', color: 'var(--color-secondary)', lineHeight: 1.6, marginBottom: '1.75rem' }}>
          Enter the administrative password to manage the 7 heritage categories, museum exhibits, shop products, events, and research articles.
        </p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="password"
            placeholder="Enter admin password (e.g. heritage2026)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="form-input"
            style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.95rem' }}
            required
          />
          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            <Unlock size={16} /> Access Admin Portal
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      {/* ── Status Banner ── */}
      {statusMsg && (
        <div style={{
          padding: '0.85rem 1.25rem',
          borderRadius: '0.5rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: statusMsg.type === 'success' ? '#dcfce7' : '#fee2e2',
          color: statusMsg.type === 'success' ? '#15803d' : '#b91c1c',
          border: `1px solid ${statusMsg.type === 'success' ? '#bbf7d0' : '#fecaca'}`,
          fontWeight: 500,
          fontSize: '0.9rem',
        }}>
          {statusMsg.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          {statusMsg.text}
        </div>
      )}

      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Content Management System
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)' }}>
            Heritage Administration
          </h1>
        </div>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="btn-secondary"
          style={{ fontSize: '0.85rem' }}
        >
          <Lock size={14} /> Lock Session
        </button>
      </div>

      {/* ── Navigation Tabs ── */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', borderBottom: '2px solid var(--color-brown-100)', paddingBottom: '0.5rem', marginBottom: '2rem' }}>
        {[
          { key: 'categories', label: `Categories (${categories.length})`, icon: Layers },
          { key: 'museum',     label: `Museum Exhibits (${museumItems.length})`, icon: ImageIcon },
          { key: 'products',   label: `Shop Products (${products.length})`, icon: ShoppingBag },
          { key: 'events',     label: `Events (${events.length})`, icon: Calendar },
          { key: 'articles',   label: `Research Articles (${articles.length})`, icon: BookOpen },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as typeof activeTab)}
            style={{
              padding: '0.6rem 1.1rem',
              borderRadius: '0.5rem',
              fontSize: '0.9rem',
              fontWeight: 600,
              border: 'none',
              background: activeTab === key ? 'var(--color-primary)' : 'transparent',
              color: activeTab === key ? '#fff' : 'var(--color-text)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.15s',
            }}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════
          TAB 1: HERITAGE CATEGORIES
          ══════════════════════════════════════════════════════════ */}
      {activeTab === 'categories' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                Sri Lankan Heritage Categories
              </h2>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-secondary)' }}>
                Manage the eight core cultural heritage categories, imagery, and narrative descriptions.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {categories.map(cat => (
              <div key={cat.id} className="heritage-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', aspectRatio: '16/9', borderRadius: '0.5rem', overflow: 'hidden', marginBottom: '1rem' }}>
                  <Image src={cat.image} alt={cat.name} fill sizes="(max-width: 640px) 100vw, 350px" style={{ objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', background: 'rgba(0,0,0,0.65)', color: '#fff', padding: '0.2rem 0.5rem', borderRadius: '0.3rem', fontSize: '0.8rem' }}>
                    {cat.icon} {cat.name}
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.35rem' }}>
                  {cat.name}
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--color-secondary)', lineHeight: 1.6, flex: 1, marginBottom: '1rem' }}>
                  {cat.shortDescription}
                </p>
                {cat.focusAreas && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                    {cat.focusAreas.map(fa => (
                      <span key={fa} className="badge" style={{ fontSize: '0.72rem' }}>{fa}</span>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => setEditingCategory({ ...cat })}
                  className="btn-secondary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
                >
                  <Edit2 size={14} /> Edit Category Info
                </button>
              </div>
            ))}
          </div>

          {/* Edit Category Modal */}
          {editingCategory && (
            <div className="lightbox-overlay" onClick={() => setEditingCategory(null)}>
              <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: '1rem', padding: '2rem', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '1rem' }}>
                  Edit Category: {editingCategory.name}
                </h3>
                <form onSubmit={saveCategory} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Category Name</label>
                    <input
                      type="text"
                      value={editingCategory.name}
                      onChange={e => setEditingCategory({ ...editingCategory, name: e.target.value })}
                      className="form-input"
                      style={{ width: '100%', padding: '0.6rem 0.85rem' }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Cover Image Path / URL</label>
                    <input
                      type="text"
                      value={editingCategory.image}
                      onChange={e => setEditingCategory({ ...editingCategory, image: e.target.value })}
                      className="form-input"
                      style={{ width: '100%', padding: '0.6rem 0.85rem' }}
                      required
                    />
                    <label className="btn-secondary" style={{ display: 'inline-flex', marginTop: '0.5rem', cursor: 'pointer', fontSize: '0.8rem' }}>
                      <Upload size={14} /> Upload New Cover
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={e => {
                          if (e.target.files?.[0]) {
                            handleFileUpload(e.target.files[0], url => setEditingCategory(prev => prev ? ({ ...prev, image: url }) : null));
                          }
                        }}
                      />
                    </label>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Short Description (for cards)</label>
                    <textarea
                      rows={2}
                      value={editingCategory.shortDescription}
                      onChange={e => setEditingCategory({ ...editingCategory, shortDescription: e.target.value })}
                      className="form-input"
                      style={{ width: '100%', padding: '0.6rem 0.85rem' }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Full Description</label>
                    <textarea
                      rows={4}
                      value={editingCategory.description}
                      onChange={e => setEditingCategory({ ...editingCategory, description: e.target.value })}
                      className="form-input"
                      style={{ width: '100%', padding: '0.6rem 0.85rem' }}
                      required
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <button type="button" onClick={() => setEditingCategory(null)} className="btn-secondary">Cancel</button>
                    <button type="submit" className="btn-primary">Save Changes</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          TAB 2: MUSEUM EXHIBITS
          ══════════════════════════════════════════════════════════ */}
      {activeTab === 'museum' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                Museum Exhibits & Sacred Artifacts
              </h2>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-secondary)' }}>
                Assign exhibits to heritage categories, upload photos, and manage records while preserving all Traditional Medicine items.
              </p>
            </div>
            <button
              onClick={() => setEditingMuseum({
                title: '',
                description: '',
                category: 'General',
                heritageCategory: 'Traditional Medicine',
                image: '/images/traditional-art.jpg',
                photographer: '',
                year: new Date().getFullYear(),
              })}
              className="btn-primary"
              style={{ fontSize: '0.88rem' }}
            >
              <Plus size={16} /> Add New Exhibit
            </button>
          </div>

          <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '0.75rem', boxShadow: 'var(--shadow-card)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--color-brown-50)', borderBottom: '1px solid var(--color-brown-100)' }}>
                  <th style={{ padding: '0.85rem 1rem' }}>Image</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Title</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Heritage Category</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Subcategory</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Year</th>
                  <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {museumItems.map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid var(--color-brown-50)' }}>
                    <td style={{ padding: '0.65rem 1rem' }}>
                      <div style={{ position: 'relative', width: '54px', height: '40px', borderRadius: '0.3rem', overflow: 'hidden' }}>
                        <Image src={item.image} alt={item.title} fill sizes="54px" style={{ objectFit: 'cover' }} />
                      </div>
                    </td>
                    <td style={{ padding: '0.65rem 1rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                      {item.title}
                    </td>
                    <td style={{ padding: '0.65rem 1rem' }}>
                      <span className="badge">{item.heritageCategory || 'Traditional Medicine'}</span>
                    </td>
                    <td style={{ padding: '0.65rem 1rem', color: 'var(--color-secondary)' }}>
                      {item.category}
                    </td>
                    <td style={{ padding: '0.65rem 1rem', color: 'var(--color-secondary)' }}>
                      {item.year || '—'}
                    </td>
                    <td style={{ padding: '0.65rem 1rem', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => setEditingMuseum({ ...item })}
                          className="btn-secondary"
                          style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
                          title="Edit"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => deleteMuseumItem(item.id)}
                          style={{ background: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '0.3rem', padding: '0.35rem 0.65rem', cursor: 'pointer' }}
                          title="Delete"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Edit/Add Museum Modal */}
          {editingMuseum && (
            <div className="lightbox-overlay" onClick={() => setEditingMuseum(null)}>
              <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: '1rem', padding: '2rem', maxWidth: '620px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '1rem' }}>
                  {editingMuseum.id ? 'Edit Exhibit' : 'Add New Exhibit'}
                </h3>
                <form onSubmit={saveMuseumItem} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Title</label>
                    <input
                      type="text"
                      value={editingMuseum.title || ''}
                      onChange={e => setEditingMuseum({ ...editingMuseum, title: e.target.value })}
                      className="form-input"
                      style={{ width: '100%', padding: '0.6rem 0.85rem' }}
                      required
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Heritage Category</label>
                      <select
                        value={editingMuseum.heritageCategory || 'Traditional Medicine'}
                        onChange={e => setEditingMuseum({ ...editingMuseum, heritageCategory: e.target.value as HeritageCategory })}
                        className="form-input"
                        style={{ width: '100%', padding: '0.6rem 0.85rem' }}
                      >
                        {HERITAGE_CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Subcategory / Type</label>
                      <input
                        type="text"
                        value={editingMuseum.category || ''}
                        onChange={e => setEditingMuseum({ ...editingMuseum, category: e.target.value })}
                        className="form-input"
                        style={{ width: '100%', padding: '0.6rem 0.85rem' }}
                        placeholder="e.g. Medical Implements, Ceremonial Brass"
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Image Path / URL</label>
                    <input
                      type="text"
                      value={editingMuseum.image || ''}
                      onChange={e => setEditingMuseum({ ...editingMuseum, image: e.target.value })}
                      className="form-input"
                      style={{ width: '100%', padding: '0.6rem 0.85rem' }}
                      required
                    />
                    <label className="btn-secondary" style={{ display: 'inline-flex', marginTop: '0.5rem', cursor: 'pointer', fontSize: '0.8rem' }}>
                      <Upload size={14} /> Upload Photo
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={e => {
                          if (e.target.files?.[0]) {
                            handleFileUpload(e.target.files[0], url => setEditingMuseum(prev => prev ? ({ ...prev, image: url }) : null));
                          }
                        }}
                      />
                    </label>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Description</label>
                    <textarea
                      rows={3}
                      value={editingMuseum.description || ''}
                      onChange={e => setEditingMuseum({ ...editingMuseum, description: e.target.value })}
                      className="form-input"
                      style={{ width: '100%', padding: '0.6rem 0.85rem' }}
                      required
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Photographer / Archive Source</label>
                      <input
                        type="text"
                        value={editingMuseum.photographer || ''}
                        onChange={e => setEditingMuseum({ ...editingMuseum, photographer: e.target.value })}
                        className="form-input"
                        style={{ width: '100%', padding: '0.6rem 0.85rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Year</label>
                      <input
                        type="number"
                        value={editingMuseum.year || 2024}
                        onChange={e => setEditingMuseum({ ...editingMuseum, year: Number(e.target.value) })}
                        className="form-input"
                        style={{ width: '100%', padding: '0.6rem 0.85rem' }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <button type="button" onClick={() => setEditingMuseum(null)} className="btn-secondary">Cancel</button>
                    <button type="submit" className="btn-primary">Save Exhibit</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          TAB 3: SHOP PRODUCTS
          ══════════════════════════════════════════════════════════ */}
      {activeTab === 'products' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                Shop Products & Traditional Goods
              </h2>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-secondary)' }}>
                Manage crafts, artwork, brassware, masks, and traditional medicine products while retaining pricing and cart compatibility.
              </p>
            </div>
            <button
              onClick={() => setEditingProduct({
                name: '',
                description: '',
                price: 5000,
                image: '/images/batik-craft.jpg',
                category: 'Handmade Crafts',
                heritageCategory: 'Crafts',
                inStock: true,
              })}
              className="btn-primary"
              style={{ fontSize: '0.88rem' }}
            >
              <Plus size={16} /> Add New Product
            </button>
          </div>

          <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '0.75rem', boxShadow: 'var(--shadow-card)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--color-brown-50)', borderBottom: '1px solid var(--color-brown-100)' }}>
                  <th style={{ padding: '0.85rem 1rem' }}>Image</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Name</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Category</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Price (LKR)</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Stock</th>
                  <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid var(--color-brown-50)' }}>
                    <td style={{ padding: '0.65rem 1rem' }}>
                      <div style={{ position: 'relative', width: '50px', height: '36px', borderRadius: '0.3rem', overflow: 'hidden' }}>
                        <Image src={p.image} alt={p.name} fill sizes="50px" style={{ objectFit: 'cover' }} />
                      </div>
                    </td>
                    <td style={{ padding: '0.65rem 1rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                      {p.name}
                    </td>
                    <td style={{ padding: '0.65rem 1rem' }}>
                      <span className="badge">{p.heritageCategory || p.category}</span>
                    </td>
                    <td style={{ padding: '0.65rem 1rem', fontWeight: 600 }}>
                      LKR {p.price.toLocaleString()}
                    </td>
                    <td style={{ padding: '0.65rem 1rem' }}>
                      <span style={{ color: p.inStock ? '#16a34a' : '#dc2626', fontWeight: 600, fontSize: '0.8rem' }}>
                        {p.inStock ? '● In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td style={{ padding: '0.65rem 1rem', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => setEditingProduct({ ...p })}
                          className="btn-secondary"
                          style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
                          title="Edit"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          style={{ background: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '0.3rem', padding: '0.35rem 0.65rem', cursor: 'pointer' }}
                          title="Delete"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Edit/Add Product Modal */}
          {editingProduct && (
            <div className="lightbox-overlay" onClick={() => setEditingProduct(null)}>
              <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: '1rem', padding: '2rem', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '1rem' }}>
                  {editingProduct.id ? 'Edit Product' : 'Add New Product'}
                </h3>
                <form onSubmit={saveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Product Name</label>
                    <input
                      type="text"
                      value={editingProduct.name || ''}
                      onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      className="form-input"
                      style={{ width: '100%', padding: '0.6rem 0.85rem' }}
                      required
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Heritage Category</label>
                      <select
                        value={editingProduct.heritageCategory || 'Crafts'}
                        onChange={e => setEditingProduct({ ...editingProduct, heritageCategory: e.target.value as HeritageCategory })}
                        className="form-input"
                        style={{ width: '100%', padding: '0.6rem 0.85rem' }}
                      >
                        {HERITAGE_CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Price (LKR)</label>
                      <input
                        type="number"
                        value={editingProduct.price || 0}
                        onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                        className="form-input"
                        style={{ width: '100%', padding: '0.6rem 0.85rem' }}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Image Path / URL</label>
                    <input
                      type="text"
                      value={editingProduct.image || ''}
                      onChange={e => setEditingProduct({ ...editingProduct, image: e.target.value })}
                      className="form-input"
                      style={{ width: '100%', padding: '0.6rem 0.85rem' }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Description</label>
                    <textarea
                      rows={3}
                      value={editingProduct.description || ''}
                      onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                      className="form-input"
                      style={{ width: '100%', padding: '0.6rem 0.85rem' }}
                      required
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="checkbox"
                      id="inStockCheck"
                      checked={editingProduct.inStock !== false}
                      onChange={e => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                    />
                    <label htmlFor="inStockCheck" style={{ fontSize: '0.88rem', fontWeight: 600 }}>Available in Stock</label>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <button type="button" onClick={() => setEditingProduct(null)} className="btn-secondary">Cancel</button>
                    <button type="submit" className="btn-primary">Save Product</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          TAB 4: EVENTS
          ══════════════════════════════════════════════════════════ */}
      {activeTab === 'events' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                Cultural Events, Exhibitions & Programs
              </h2>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-secondary)' }}>
                Manage festivals, masterclasses, craft workshops, and symposia.
              </p>
            </div>
            <button
              onClick={() => setEditingEvent({
                title: '',
                description: '',
                date: new Date().toISOString().split('T')[0],
                venue: 'Colombo, Sri Lanka',
                category: 'Workshop',
                heritageCategory: 'Events & Festivals',
                status: 'upcoming',
                image: '/images/perahera-festival.jpg',
              })}
              className="btn-primary"
              style={{ fontSize: '0.88rem' }}
            >
              <Plus size={16} /> Add New Event
            </button>
          </div>

          <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '0.75rem', boxShadow: 'var(--shadow-card)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--color-brown-50)', borderBottom: '1px solid var(--color-brown-100)' }}>
                  <th style={{ padding: '0.85rem 1rem' }}>Title</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Category</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Date</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Venue</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                  <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map(ev => (
                  <tr key={ev.id} style={{ borderBottom: '1px solid var(--color-brown-50)' }}>
                    <td style={{ padding: '0.65rem 1rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                      {ev.title}
                    </td>
                    <td style={{ padding: '0.65rem 1rem' }}>
                      <span className="badge">{ev.heritageCategory || ev.category}</span>
                    </td>
                    <td style={{ padding: '0.65rem 1rem', color: 'var(--color-secondary)' }}>
                      {ev.date}
                    </td>
                    <td style={{ padding: '0.65rem 1rem', color: 'var(--color-secondary)' }}>
                      {ev.venue}
                    </td>
                    <td style={{ padding: '0.65rem 1rem' }}>
                      <span style={{
                        padding: '0.2rem 0.5rem',
                        borderRadius: '999px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        background: ev.status === 'upcoming' ? 'var(--color-accent)' : 'rgba(0,0,0,0.1)',
                        color: ev.status === 'upcoming' ? 'var(--color-primary)' : 'var(--color-secondary)',
                      }}>
                        {ev.status}
                      </span>
                    </td>
                    <td style={{ padding: '0.65rem 1rem', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => setEditingEvent({ ...ev })}
                          className="btn-secondary"
                          style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
                          title="Edit"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => deleteEvent(ev.id)}
                          style={{ background: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '0.3rem', padding: '0.35rem 0.65rem', cursor: 'pointer' }}
                          title="Delete"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Edit/Add Event Modal */}
          {editingEvent && (
            <div className="lightbox-overlay" onClick={() => setEditingEvent(null)}>
              <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: '1rem', padding: '2rem', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '1rem' }}>
                  {editingEvent.id ? 'Edit Event' : 'Add New Event'}
                </h3>
                <form onSubmit={saveEvent} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Title</label>
                    <input
                      type="text"
                      value={editingEvent.title || ''}
                      onChange={e => setEditingEvent({ ...editingEvent, title: e.target.value })}
                      className="form-input"
                      style={{ width: '100%', padding: '0.6rem 0.85rem' }}
                      required
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Heritage Category</label>
                      <select
                        value={editingEvent.heritageCategory || 'Events & Festivals'}
                        onChange={e => setEditingEvent({ ...editingEvent, heritageCategory: e.target.value as HeritageCategory })}
                        className="form-input"
                        style={{ width: '100%', padding: '0.6rem 0.85rem' }}
                      >
                        {HERITAGE_CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Status</label>
                      <select
                        value={editingEvent.status || 'upcoming'}
                        onChange={e => setEditingEvent({ ...editingEvent, status: e.target.value as 'upcoming' | 'past' })}
                        className="form-input"
                        style={{ width: '100%', padding: '0.6rem 0.85rem' }}
                      >
                        <option value="upcoming">Upcoming</option>
                        <option value="past">Past</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Start Date (YYYY-MM-DD)</label>
                      <input
                        type="date"
                        value={editingEvent.date || ''}
                        onChange={e => setEditingEvent({ ...editingEvent, date: e.target.value })}
                        className="form-input"
                        style={{ width: '100%', padding: '0.6rem 0.85rem' }}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Venue</label>
                      <input
                        type="text"
                        value={editingEvent.venue || ''}
                        onChange={e => setEditingEvent({ ...editingEvent, venue: e.target.value })}
                        className="form-input"
                        style={{ width: '100%', padding: '0.6rem 0.85rem' }}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Description</label>
                    <textarea
                      rows={3}
                      value={editingEvent.description || ''}
                      onChange={e => setEditingEvent({ ...editingEvent, description: e.target.value })}
                      className="form-input"
                      style={{ width: '100%', padding: '0.6rem 0.85rem' }}
                      required
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <button type="button" onClick={() => setEditingEvent(null)} className="btn-secondary">Cancel</button>
                    <button type="submit" className="btn-primary">Save Event</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          TAB 5: RESEARCH ARTICLES
          ══════════════════════════════════════════════════════════ */}
      {activeTab === 'articles' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                Research & Scholarly Publications
              </h2>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-secondary)' }}>
                Manage academic papers across all eight cultural heritage categories.
              </p>
            </div>
            <button
              onClick={() => setEditingArticle({
                title: '',
                slug: '',
                author: '',
                authorAffiliation: '',
                date: new Date().toISOString().split('T')[0],
                abstract: '',
                tags: ['Art'],
                heritageCategory: 'Art',
                journal: 'Journal of Sri Lankan Cultural Heritage',
              })}
              className="btn-primary"
              style={{ fontSize: '0.88rem' }}
            >
              <Plus size={16} /> Add New Article
            </button>
          </div>

          <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '0.75rem', boxShadow: 'var(--shadow-card)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--color-brown-50)', borderBottom: '1px solid var(--color-brown-100)' }}>
                  <th style={{ padding: '0.85rem 1rem' }}>Title</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Category</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Author</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Date</th>
                  <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map(a => (
                  <tr key={a.id} style={{ borderBottom: '1px solid var(--color-brown-50)' }}>
                    <td style={{ padding: '0.65rem 1rem', fontWeight: 600, color: 'var(--color-primary)', maxWidth: '300px' }}>
                      {a.title}
                    </td>
                    <td style={{ padding: '0.65rem 1rem' }}>
                      <span className="badge">{a.heritageCategory || 'Traditional Medicine'}</span>
                    </td>
                    <td style={{ padding: '0.65rem 1rem', color: 'var(--color-secondary)' }}>
                      {a.author}
                    </td>
                    <td style={{ padding: '0.65rem 1rem', color: 'var(--color-secondary)' }}>
                      {a.date}
                    </td>
                    <td style={{ padding: '0.65rem 1rem', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => setEditingArticle({ ...a })}
                          className="btn-secondary"
                          style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
                          title="Edit"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => deleteArticle(a.id)}
                          style={{ background: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '0.3rem', padding: '0.35rem 0.65rem', cursor: 'pointer' }}
                          title="Delete"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Edit/Add Article Modal */}
          {editingArticle && (
            <div className="lightbox-overlay" onClick={() => setEditingArticle(null)}>
              <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: '1rem', padding: '2rem', maxWidth: '640px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '1rem' }}>
                  {editingArticle.id ? 'Edit Article' : 'Add New Article'}
                </h3>
                <form onSubmit={saveArticle} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Article Title</label>
                    <input
                      type="text"
                      value={editingArticle.title || ''}
                      onChange={e => setEditingArticle({ ...editingArticle, title: e.target.value })}
                      className="form-input"
                      style={{ width: '100%', padding: '0.6rem 0.85rem' }}
                      required
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>URL Slug</label>
                      <input
                        type="text"
                        value={editingArticle.slug || ''}
                        onChange={e => setEditingArticle({ ...editingArticle, slug: e.target.value })}
                        className="form-input"
                        style={{ width: '100%', padding: '0.6rem 0.85rem' }}
                        placeholder="e.g. traditional-craft-study"
                        required
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Heritage Category</label>
                      <select
                        value={editingArticle.heritageCategory || 'Art'}
                        onChange={e => setEditingArticle({ ...editingArticle, heritageCategory: e.target.value as HeritageCategory })}
                        className="form-input"
                        style={{ width: '100%', padding: '0.6rem 0.85rem' }}
                      >
                        {HERITAGE_CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Author(s)</label>
                      <input
                        type="text"
                        value={editingArticle.author || ''}
                        onChange={e => setEditingArticle({ ...editingArticle, author: e.target.value })}
                        className="form-input"
                        style={{ width: '100%', padding: '0.6rem 0.85rem' }}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Author Affiliation</label>
                      <input
                        type="text"
                        value={editingArticle.authorAffiliation || ''}
                        onChange={e => setEditingArticle({ ...editingArticle, authorAffiliation: e.target.value })}
                        className="form-input"
                        style={{ width: '100%', padding: '0.6rem 0.85rem' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Abstract</label>
                    <textarea
                      rows={4}
                      value={editingArticle.abstract || ''}
                      onChange={e => setEditingArticle({ ...editingArticle, abstract: e.target.value })}
                      className="form-input"
                      style={{ width: '100%', padding: '0.6rem 0.85rem' }}
                      required
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <button type="button" onClick={() => setEditingArticle(null)} className="btn-secondary">Cancel</button>
                    <button type="submit" className="btn-primary">Save Article</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
