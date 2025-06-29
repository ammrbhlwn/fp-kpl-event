import { NextRequest, NextResponse } from 'next/server';
import { getMyTicketsHandler } from '../../use-cases/get-my-tickets';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  return getMyTicketsHandler(req);
} 