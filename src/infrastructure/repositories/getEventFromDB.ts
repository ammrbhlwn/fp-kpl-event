import { createClient } from "../../supabase/client";

const supabase = createClient();

export interface EventRepository {
  getAllEvents(): Promise<Event[]>;
  getEventById(id: string): Promise<Event>;
}

export const eventRepository: EventRepository = {
  async getAllEvents() {
    const { data, error } = await supabase.from("event").select("*");

    if (error) {
      throw new Error("Failed to fetch events: " + error.message);
    }

    return data as Event[];
  },

  async getEventById(id: string) {
    const { data, error } = await supabase.from("event").select("*").eq("id", id).single()

    if (error) throw new Error("Failed to fetch event: " + error.message)

    return data as Event
  },
};
