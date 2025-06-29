interface TicketInput {
  types: "Regular" | "VIP" | "VVIP";
  price: number;
  quantity: number;
}

export interface EventCreateInput {
  name: string;
  location: string;
  date: string;
  time: string;
  types: string;
  capacity?: string;
  description?: string;
  ticket?: TicketInput[];
}