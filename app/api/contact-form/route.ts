import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // 1. Store data in Supabase
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
    
    // 2. Send email notification with detailed error handling
    let emailResult = { success: false, error: null };
    
    try {
      // Log environment variables (redacted for security)
      console.log('Email Configuration:');
      console.log('- GMAIL_USER:', process.env.GMAIL_USER ? '✓ Set' : '✗ Missing');
      console.log('- GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? '✓ Set (length: ' + process.env.GMAIL_APP_PASSWORD.length + ')' : '✗ Missing');
      console.log('- CLUB_EMAIL:', process.env.CLUB_EMAIL ? '✓ Set' : '✗ Missing');
      
      // Create a transporter with detailed Gmail settings
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
        debug: true,
        logger: true
      });
      
      // Test the connection
      console.log('Verifying SMTP connection...');
      await transporter.verify();
      console.log('SMTP connection verified successfully!');
      
      // Create email HTML
      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; }
            h2 { color: #d4af37; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th { background-color: #d4af37; color: white; text-align: left; padding: 10px; }
            td { border: 1px solid #ddd; padding: 10px; }
            .message-box { background-color: #f9f9f9; padding: 15px; border: 1px solid #ddd; margin-top: 20px; }
            .footer { margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>New Contact Form Message - Club311Barcelona</h2>
            <p>Someone has sent you a message through the website contact form:</p>
            
            <table>
              <tr>
                <th colspan="2">Contact Information</th>
              </tr>
              <tr>
                <td><strong>Name</strong></td>
                <td>${data.name}</td>
              </tr>
              <tr>
                <td><strong>Email Address</strong></td>
                <td>${data.email}</td>
              </tr>
              <tr>
                <td><strong>Subject</strong></td>
                <td>${data.subject}</td>
              </tr>
              <tr>
                <td><strong>Submission Date</strong></td>
                <td>${new Date().toLocaleString('en-ES', { timeZone: 'Europe/Madrid' })}</td>
              </tr>
            </table>
            
            <h3>Message:</h3>
            <div class="message-box">
              ${data.message.replace(/\n/g, '<br>')}
            </div>
            
            <div class="footer">
              <p>To respond, simply reply directly to this email or contact them at: ${data.email}</p>
              <p>This message has been stored in your contact form database for future reference.</p>
            </div>
          </div>
        </body>
        </html>
      `;
      
      console.log('Sending email with the following details:');
      console.log(`- From: "Club311Barcelona Website" <${process.env.GMAIL_USER}>`);
      console.log(`- To: ${process.env.CLUB_EMAIL}`);
      console.log(`- Reply-To: ${data.email}`);
      console.log(`- Subject: New Contact Form Message: ${data.subject}`);
      
      // Send the email
      const info = await transporter.sendMail({
        from: `"Club311Barcelona Website" <${process.env.GMAIL_USER}>`,
        to: process.env.CLUB_EMAIL,
        replyTo: data.email,
        subject: `New Contact Form Message: ${data.subject}`,
        html: emailHtml,
      });
      
      console.log('Email sent successfully!');
      console.log('Message ID:', info.messageId);
      console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
      
      emailResult = { success: true, error: null };
      
    } catch (emailError) {
      // Log detailed email error
      console.error('Email sending failed with error:', emailError);
      
      // Try to get more specific error information
      let errorDetails = 'Unknown error';
      if (emailError instanceof Error) {
        errorDetails = emailError.message;
        if ('code' in emailError) {
          errorDetails += ` (Code: ${emailError.code})`;
        }
      }
      
      console.error('Error details:', errorDetails);
      emailResult = { success: false, error: errorDetails };
      
      // Store the email error in Supabase for reference
      try {
        await supabase
          .from('contact_form_submissions')
          .update({ 
            email_sent: false,
            email_error: errorDetails
          })
          .eq('name', data.name)
          .eq('email', data.email)
          .eq('subject', data.subject);
      } catch (updateError) {
        console.error('Failed to update record with email error:', updateError);
      }
    }
    
    // Return success even if email failed, since data was stored
    return NextResponse.json({ 
      success: true,
      emailSent: emailResult.success,
      emailError: emailResult.error
    });
    
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process contact form submission' },
      { status: 500 }
    );
  }
}