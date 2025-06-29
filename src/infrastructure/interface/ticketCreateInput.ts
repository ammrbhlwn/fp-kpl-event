export interface TicketCreateInput {
  eventId: number;
  types: "Regular" | "VIP" | "VVIP";
  price?: number | null;
  quantity?: number | null;
}