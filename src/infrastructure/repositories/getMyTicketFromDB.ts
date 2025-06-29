import { createClient } from '../../supabase/client';

export async function getMyTicketsByUserId(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('myticket')
    .select('*')
    .eq('userId', userId);
  if (error) throw new Error(error.message);
  return data;
} 