import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

// Create a client configured for writing
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'wtuho4kc',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const ALLOWED_EMOJI = ['✍️', '🚀', '✨', '🔥', '🛡️'];
const NAME_MAX_LENGTH = 60;
const MESSAGE_MAX_LENGTH = 500;
const COOLDOWN_MS = 60_000;
const COOLDOWN_COOKIE = 'gb_last_post';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, message, emoji, website } = body;

    // Honeypot: a real visitor never fills this hidden field.
    // Pretend success so bots don't learn to skip it, but don't write anything.
    if (typeof website === 'string' && website.trim() !== '') {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    // Cooldown: block rapid repeat posts from the same browser.
    const lastPost = request.cookies.get(COOLDOWN_COOKIE)?.value;
    if (lastPost && Date.now() - Number(lastPost) < COOLDOWN_MS) {
      return NextResponse.json(
        { error: 'Please wait a moment before posting again.' },
        { status: 429 }
      );
    }

    const trimmedName = typeof name === 'string' ? name.trim() : '';
    const trimmedMessage = typeof message === 'string' ? message.trim() : '';

    if (!trimmedName || !trimmedMessage || !emoji) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (trimmedName.length > NAME_MAX_LENGTH) {
      return NextResponse.json(
        { error: `Name must be ${NAME_MAX_LENGTH} characters or less.` },
        { status: 400 }
      );
    }

    if (trimmedMessage.length > MESSAGE_MAX_LENGTH) {
      return NextResponse.json(
        { error: `Message must be ${MESSAGE_MAX_LENGTH} characters or less.` },
        { status: 400 }
      );
    }

    if (!ALLOWED_EMOJI.includes(emoji)) {
      return NextResponse.json({ error: 'Invalid emoji selection' }, { status: 400 });
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
      name: trimmedName,
      message: trimmedMessage,
      emoji,
      date: dateString,
    });

    const response = NextResponse.json({ success: true, entry: newEntry }, { status: 201 });
    response.cookies.set(COOLDOWN_COOKIE, Date.now().toString(), {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: COOLDOWN_MS / 1000,
      path: '/',
    });
    return response;
  } catch (error) {
    console.error('Guestbook API Error:', error);
    return NextResponse.json({ error: 'Failed to publish entry to Codex' }, { status: 500 });
  }
}
