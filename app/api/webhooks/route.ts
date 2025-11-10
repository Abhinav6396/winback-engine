import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Basic webhook verification can be added here if needed
    // For now, we'll just log the webhook payload
    const payload = await request.json();
    console.log('Webhook received:', payload);
    
    // Process different webhook events
    // if (payload.type === 'payment.succeeded') {
    //   // Handle payment success
    //   console.log('Payment succeeded:', payload.data);
    // }
    
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return new NextResponse('Webhook error', { status: 400 });
  }
}
