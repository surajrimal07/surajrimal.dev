import { createClient } from '@/utils/supabase/server';

export async function GET(req: Request) {
  const supabase = createClient();

  try {
    const { data, error, status } = await supabase
      .from('availability')
      .select('*');

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
}
