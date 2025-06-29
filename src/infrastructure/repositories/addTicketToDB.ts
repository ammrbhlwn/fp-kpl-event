import { createClient } from "../../supabase/client";
import { TicketCreateInput } from "../../infrastructure/interface/ticketCreateInput";

export async function createTicket(input: TicketCreateInput) {
  if (!input.eventId || input.eventId <= 0) {
    throw new Error("Invalid eventId: must be a positive number");
  }

  if (!input.types || !["Regular", "VIP", "VVIP"].includes(input.types)) {
    throw new Error(`Invalid ticket type: ${input.types}. Must be one of: Regular, VIP, VVIP`);
  }

  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("ticket")
      .insert({
        eventId: input.eventId,
        types: input.types,
        price: input.price ?? null,
        quantity: input.quantity ?? null,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create ticket: ${error.message || error.details || 'Unknown database error'}`);
    }

    return data;
  } catch (error) {
    throw error;
  }
} 