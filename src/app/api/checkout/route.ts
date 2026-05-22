import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, phone, division, totalAmount } = body;

    const order = await prisma.order.create({
      data: {
        customerName,
        phone,
        division,
        totalAmount,
      },
    });

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error('Error processing checkout:', error);
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}
