import { NextResponse } from 'next/server';
import { readDataFile, writeDataFile, checkAdminAuth } from '@/lib/dataStore';
import type { Event } from '@/lib/types';

export async function GET() {
  try {
    const events = readDataFile<Event[]>('events.json');
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, event } = body;

    if (!checkAdminAuth(password)) {
      return NextResponse.json({ error: 'Unauthorized: Invalid admin password' }, { status: 401 });
    }

    if (!event || !event.title || !event.date) {
      return NextResponse.json({ error: 'Title and date are required' }, { status: 400 });
    }

    const events = readDataFile<Event[]>('events.json');
    const newEvent: Event = {
      id: event.id || Date.now().toString(),
      title: event.title,
      date: event.date,
      endDate: event.endDate || undefined,
      venue: event.venue || '',
      description: event.description || '',
      image: event.image || '/images/perahera-festival.jpg',
      status: event.status || 'upcoming',
      category: event.category || 'General',
      heritageCategory: event.heritageCategory || 'Events & Festivals',
    };

    events.push(newEvent);
    writeDataFile('events.json', events);

    return NextResponse.json({ success: true, event: newEvent }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { password, event } = body;

    if (!checkAdminAuth(password)) {
      return NextResponse.json({ error: 'Unauthorized: Invalid admin password' }, { status: 401 });
    }

    if (!event || !event.id) {
      return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
    }

    const events = readDataFile<Event[]>('events.json');
    const index = events.findIndex(e => e.id === event.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    events[index] = { ...events[index], ...event };
    writeDataFile('events.json', events);

    return NextResponse.json({ success: true, event: events[index] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
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
      return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
    }

    const events = readDataFile<Event[]>('events.json');
    const filtered = events.filter(e => e.id !== id);
    writeDataFile('events.json', filtered);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}
