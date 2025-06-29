import { MyTicketStatus } from "../../entities/valueObject/MyTicketStatus";

export interface BookTicketInput {
  eventId: number;
  userId: string;
  types: "Regular" | "VIP" | "VVIP";
  quantity: number;
  status: MyTicketStatus;
  purchasedDate: Date;
  totalPrice: number;
}