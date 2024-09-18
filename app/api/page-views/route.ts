import { supabase } from '@/libs/supabaseClient';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const headerList = headers();
  console.log('api called');
  const pageSlug = headerList.get('x-current-path');

  const { data, error } = await supabase.from('page_views').select('views').eq('slug', pageSlug).single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const newViews = data?.views ? data.views + 1 : 1;

  const { error: updateError } = await supabase
    .from('page_views')
    .upsert({ slug: pageSlug, views: newViews }, { onConflict: 'slug' });

  if (updateError) {
    console.log('Error updating views:', updateError.message);

    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ slug: pageSlug, views: newViews });
}

export async function GET() {
  const headerList = headers();
  const pageSlug = headerList.get('x-current-path');

  const { data, error } = await supabase.from('pageviews').select('views').eq('slug', pageSlug).single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ views: data.views }, { status: 200 });
}
