import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: Request) {
  try {
    console.log('Received contact form submission request');
    const data = await request.json();
    console.log('Form data:', data);

    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      console.error('Missing required fields');
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 1. Store data in Supabase
    console.log('Inserting data into Supabase...');
    const { error: dbError } = await supabase
      .from('contact_form_submissions')
      .insert([
        { 
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          is_read: false
        }
      ]);
      
    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to store contact form submission');
    }

    console.log('Data inserted successfully');
    
    // 2. Return success response
    return NextResponse.json({ 
      success: true,
      message: 'Contact form submitted successfully'
    });
    
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process contact form submission' },
      { status: 500 }
    );
  }
}