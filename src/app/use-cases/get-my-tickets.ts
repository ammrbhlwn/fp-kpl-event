import { NextRequest, NextResponse } from 'next/server';
import { getMyTicketsByUserId } from '../../infrastructure/repositories/getMyTicketFromDB';
import { createClient } from '../../supabase/server';

export async function getMyTicketsHandler(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const tickets = await getMyTicketsByUserId(user.id);
    return NextResponse.json({ success: true, data: tickets });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
} 