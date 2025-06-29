import { createClient } from "../../supabase/client";
import { createTicket } from "./addTicketToDB";
import { EventCreateInput } from "../../infrastructure/interface/eventCreateInput";

export async function CreateEvent(body: EventCreateInput) {
  if (!body.name || !body.location || !body.date || !body.time || !body.types) {
    throw new Error("Missing required fields: name, location, date, time, types");
  }

  const supabase = createClient();

  const { ticket, ...eventData } = body;

  const { data: insertedEvents, error } = await supabase
    .from("event")
    .insert(eventData)
    .select();

  if (error) {
    throw new Error(`Failed to create event: ${error.message || error.details || 'Unknown database error'}`);
  }

  const event = insertedEvents?.[0];
  if (!event) {
    throw new Error("Insert berhasil tapi data event tidak dikembalikan");
  }

  if (ticket && Array.isArray(ticket)) {
    for (const ticketData of ticket) {
      await createTicket({
        eventId: event.id,
        types: ticketData.types,
        price: ticketData.price,
        quantity: ticketData.quantity,
      });
    }
  }

  return event;
}

