import { NextResponse } from 'next/server';

import { Certification } from '@/types/certificate';
import { supabase } from '@/utils/supabase/client';

export async function GET() {
  const { data, error } = await supabase
    .from('certifications')
    .select('*')
    .order('completion_date', { ascending: false });

  if (error) {
    console.error('Error fetching certifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch certifications' },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const certification: Omit<Certification, 'id' | 'created_at' | 'updated_at'> =
    await request.json();

  const { data, error } = await supabase
    .from('certifications')
    .insert([certification])
    .single();

  if (error) {
    console.error('Error creating certification:', error);
    return NextResponse.json(
      { error: 'Failed to create certification' },
      { status: 400 }
    );
  }

  return NextResponse.json(data, { status: 201 });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const updatedData: Partial<
    Omit<Certification, 'id' | 'created_at' | 'updated_at'>
  > = await request.json();

  const { data, error } = await supabase
    .from('certifications')
    .update(updatedData)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error updating certification:', error);
    return NextResponse.json(
      { error: 'Failed to update certification' },
      { status: 400 }
    );
  }

  return NextResponse.json(data);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);

  const { data, error } = await supabase
    .from('certifications')
    .delete()
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error deleting certification:', error);
    return NextResponse.json(
      { error: 'Failed to delete certification' },
      { status: 400 }
    );
  }

  return NextResponse.json(data);
}
