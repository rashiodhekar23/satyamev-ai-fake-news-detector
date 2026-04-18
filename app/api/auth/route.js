import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export async function POST(req) { 
  try {
    const { action, name, email, password } = await req.json();

    // --- REGISTRATION LOGIC ---
    if (action === 'register') {
      const { data: authData, error: authError } = await supabase.auth.signUp({ 
        email,
        password, 
        options: { data: { name } } 
      });
      if (authError) {
        return NextResponse.json({ error: authError.message }, { status: 400 });
      } 
      await supabase.from('users').insert([{ name, email, password }]).select();
      return NextResponse.json({
         success: true,
          user: {name, email}
      });
    }
      
  

    // --- LOGIN LOGIC ---
    if (action === 'login') {  
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single()

      if (error || !data) {
        return NextResponse.json({ error: 'Invalid Credentials!' }, { status: 401 });
      }
      return NextResponse.json({ success: true, user: data });
    }

    // --- FORGOT PASSWORD LOGIC ---
    if (action === 'forgot') {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}||'http://localhost:3000'}/reset-password`,
      }); 
      if (error) {
        return NextResponse.json({ error: 'Error sending reset email!' }, { status: 400 });
      }
      return NextResponse.json({ 
        success: true,
        message: 'Password reset email sent! Check your inbox.' 
      });
    }
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: 'Server Connection Error' }, { status: 500 });
  }
}
  
   /*   // New random password generate karo
      const newPassword = Math.random().toString(36).slice(-8);

      // Password update karo
      await supabase
        .from('users')
        .update({ password: newPassword })
        .eq('email', email)

      // Password return karo (real app mein email bhejte hain)
      return NextResponse.json({
        success: true,
        message: 'your new password is: ' + newPassword
      })
    

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })

  
  catch (err) {
    return NextResponse.json({ 
      error: 'Server Connection Error' }, { status: 500 })
  }*/
