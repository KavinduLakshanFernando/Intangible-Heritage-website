import { NextResponse } from 'next/server';
import { readDataFile, writeDataFile, checkAdminAuth } from '@/lib/dataStore';
import type { MuseumItem } from '@/lib/types';

export async function GET() {
  try {
    const items = readDataFile<MuseumItem[]>('museum.json');
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch museum items' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, item } = body;

    if (!checkAdminAuth(password)) {
      return NextResponse.json({ error: 'Unauthorized: Invalid admin password' }, { status: 401 });
    }

    if (!item || !item.title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const items = readDataFile<MuseumItem[]>('museum.json');
    const newItem: MuseumItem = {
      id: item.id || Date.now().toString(),
      title: item.title,
      description: item.description || '',
      category: item.category || 'General',
      heritageCategory: item.heritageCategory || 'Traditional Medicine',
      image: item.image || '/images/hela-wedakama.jpg',
      photographer: item.photographer || '',
      year: item.year ? Number(item.year) : new Date().getFullYear(),
    };

    items.push(newItem);
    writeDataFile('museum.json', items);

    return NextResponse.json({ success: true, item: newItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create museum item' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { password, item } = body;

    if (!checkAdminAuth(password)) {
      return NextResponse.json({ error: 'Unauthorized: Invalid admin password' }, { status: 401 });
    }

    if (!item || !item.id) {
      return NextResponse.json({ error: 'Item ID is required' }, { status: 400 });
    }

    const items = readDataFile<MuseumItem[]>('museum.json');
    const index = items.findIndex(i => i.id === item.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    items[index] = { ...items[index], ...item };
    writeDataFile('museum.json', items);

    return NextResponse.json({ success: true, item: items[index] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update museum item' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const password = request.headers.get('x-admin-password');

    if (!checkAdminAuth(password)) {
      return NextResponse.json({ error: 'Unauthorized: Invalid admin password' }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: 'Item ID is required' }, { status: 400 });
    }

    const items = readDataFile<MuseumItem[]>('museum.json');
    const filtered = items.filter(i => i.id !== id);
    writeDataFile('museum.json', filtered);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete museum item' }, { status: 500 });
  }
}
