import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  try {
    const data = await req.json();
    const { name, email, subject, message } = data;

    // ✅ Validation
    if (!name || !email || !subject || !message ) {
      return Response.json(
        {
             success: false, 
             error: "All required fields missing" },
        { status: 400 }
      );
    }

    // ✅ Supabase me insert
   const { error } = await  supabase
     .from("contact_messages")
     .insert([
    
        {
          name,
          email,
          subject,
          message,
        }
      ]);

    if (error) {
      console.error('❌ Supabase Error:', error);
      return Response.json(
        { success: false,
         error: "Database error" },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: "Message saved successfully!"
    });

  } catch (err) {
    console.error('❌ API Error:', err);

    return Response.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}