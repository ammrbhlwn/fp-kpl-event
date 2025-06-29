import { MyTicketStatus } from "../../entities/valueObject/MyTicketStatus";

// export interface BookTicketInput {
//   eventId: number;
//   userId: string;
//   types: "Regular" | "VIP" | "VVIP";
//   quantity: number;
//   status: MyTicketStatus;
//   purchasedDate: Date;
//   totalPrice: number;
// }

export interface BookTicketInput {
  eventId: number
  ticketType: string
  quantity: number
  status: MyTicketStatus;
  userId?: string
}
