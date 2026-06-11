import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

// Create a client configured for writing
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'wtuho4kc',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, message, emoji } = body;

    // Validate
    if (!name || !message || !emoji) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!process.env.SANITY_API_TOKEN || process.env.SANITY_API_TOKEN === 'PASTE_YOUR_API_TOKEN_HERE') {
      return NextResponse.json(
        { error: 'Sanity API token is missing or not configured. Please add it to .env.local' },
        { status: 500 }
      );
    }

    const now = new Date();
    const dateString = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    // Create the document in Sanity
    const newEntry = await writeClient.create({
      _type: 'guestbook',
      name,
      message,
      emoji,
      date: dateString,
    });

    return NextResponse.json({ success: true, entry: newEntry }, { status: 201 });
  } catch (error) {
    console.error('Guestbook API Error:', error);
    return NextResponse.json({ error: 'Failed to publish entry to Codex' }, { status: 500 });
  }
}
