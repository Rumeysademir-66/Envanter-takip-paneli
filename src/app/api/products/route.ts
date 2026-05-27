import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '@/features/products/types';

// Gecici bellek ici veri - gercek projede veritabani olur
let products: Product[] = [
  { id: uuidv4(), name: 'A4 Kağıt', category: 'Kırtasiye', quantity: 500, unit: 'adet', status: 'stokta' },
  { id: uuidv4(), name: 'Toner', category: 'Yazıcı', quantity: 3, unit: 'adet', status: 'kritik' },
  { id: uuidv4(), name: 'Kalem', category: 'Kırtasiye', quantity: 0, unit: 'adet', status: 'tükendi' },
  { id: uuidv4(), name: 'Laptop', category: 'Elektronik', quantity: 12, unit: 'adet', status: 'stokta' },
  { id: uuidv4(), name: 'Mouse', category: 'Elektronik', quantity: 4, unit: 'adet', status: 'kritik' },
  { id: uuidv4(), name: 'Masa', category: 'Mobilya', quantity: 20, unit: 'adet', status: 'stokta' },
  { id: uuidv4(), name: 'Sandalye', category: 'Mobilya', quantity: 0, unit: 'adet', status: 'tükendi' },
  { id: uuidv4(), name: 'Monitör', category: 'Elektronik', quantity: 7, unit: 'adet', status: 'stokta' },
];

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newProduct: Product = { id: uuidv4(), ...body };
  products.push(newProduct);
  return NextResponse.json(newProduct, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  products = products.map((p) => (p.id === body.id ? body : p));
  return NextResponse.json(body);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  products = products.filter((p) => p.id !== id);
  return NextResponse.json({ success: true });
}
