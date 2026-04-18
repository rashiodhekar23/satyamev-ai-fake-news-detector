import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

// GET — Leaderboard fetch karo
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('points', { ascending: false })
      .limit(10);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ leaderboard: data });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST — Score update karo
export async function POST(req) {
  try {
    const { email, name, verdict } = await req.json();
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    // Check karo user exist karta hai
    const { data: existing } = await supabase
      .from('leaderboard')
      .select('*')
      .eq('user_email', email)
      .single();

    const isFake = verdict?.toUpperCase() === 'FAKE';
    const isReal = verdict?.toUpperCase() === 'REAL';
    const points = isFake ? 10 : isReal ? 5 : 3;

    if (existing) {
      await supabase
        .from('leaderboard')
        .update({
          total_searches: existing.total_searches + 1,
          fake_detected: existing.fake_detected + (isFake ? 1 : 0),
          real_detected: existing.real_detected + (isReal ? 1 : 0),
          points: existing.points + points,
          updated_at: new Date().toISOString()
        })
        .eq('user_email', email);
    } else {
      await supabase
        .from('leaderboard')
        .insert([{
          user_email: email,
          user_name: name || 'Anonymous',
          total_searches: 1,
          fake_detected: isFake ? 1 : 0,
          real_detected: isReal ? 1 : 0,
          points: points
        }]);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}