import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ===== GET — Fetch all messages =====
export async function GET(req) {
  // Password check via header
  const adminPass = req.headers.get('x-admin-password');
  if (adminPass !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return Response.json({ error: 'Error fetching messages' }, { status: 500 });
  }

  return Response.json({ data });
}

// ===== DELETE — Delete a message by id =====
export async function DELETE(req) {
  // Password check via header
  const adminPass = req.headers.get('x-admin-password');
  if (adminPass !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await req.json();

  if (!id) {
    return Response.json({ error: 'ID required' }, { status: 400 });
  }

  const { error } = await supabase
    .from('contact_messages')
    .delete()
    .eq('id', id);

  if (error) {
    return Response.json({ error: 'Delete failed' }, { status: 500 });
  }

  return Response.json({ success: true });
}
