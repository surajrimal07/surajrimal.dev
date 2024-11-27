import { NextRequest, NextResponse } from 'next/server';

import { MAX_SUBMISSIONS_PER_SESSION } from '@/constants/index';
import { getSessionId } from '@/lib/session';
import { Tables } from '@/types/database';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const sessionId = getSessionId(req);

  const data: Tables<'contacts'> = await req.json();

  try {
    const { data: submissionCountData, error: submissionCountError } =
      await supabase
        .from('contacts')
        .select('id')
        .eq('user_session', sessionId);

    if (submissionCountError) {
      throw new Error(submissionCountError.message);
    }

    const submissionCount = submissionCountData?.length || 0;

    if (submissionCount >= MAX_SUBMISSIONS_PER_SESSION) {
      return NextResponse.json(
        {
          message:
            'Rate limit exceeded. You cannot submit more than 3 forms per session.',
        },
        { status: 429 }
      );
    }

    const { error } = await supabase.from('contacts').insert([
      {
        name: data.name,
        email: data.email,
        purpose: data.purpose,
        stack: data.stack || null,
        custom_stack: data.custom_stack || null,
        project_description: data.project_description || null,
        cost_expectations: data.cost_expectations || null,
        message: data.message || null,
        user_session: sessionId,
      },
    ]);

    if (error) {
      throw new Error('Failed to submit the form: ' + error.message);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error('Failed to fetch contacts: ' + error.message);
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const supabase = await createClient();

  try {
    const { responded, responded_at } = await req.json();

    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id || responded === undefined) {
      return NextResponse.json(
        { message: 'id and responded  is required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('contacts')
      .update({
        responded: responded,
        responded_at: responded_at,
      })
      .eq('id', id);

    if (error) {
      throw new Error('Failed to update the contact: ' + error.message);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const supabase = await createClient();

  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { message: 'Contact ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabase.from('contacts').delete().eq('id', id);

    if (error) {
      throw new Error('Failed to delete the contact: ' + error.message);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
