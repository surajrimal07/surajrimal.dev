import { NextRequest, NextResponse } from 'next/server';

import { MAX_SUBMISSIONS_PER_SESSION } from '@/constants/index';
import { getSessionId } from '@/lib/session';
import { ContactForm } from '@/types/contact';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const sessionId = getSessionId(req);

  const data: ContactForm = await req.json();

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
        custom_stack: data.customStack || null,
        project_description: data.projectDescription || null,
        cost_expectations: data.costExpectations || null,
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
